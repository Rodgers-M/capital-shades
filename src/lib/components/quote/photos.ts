import { PHOTO_LIMITS } from '$lib/enquiry';

export interface SitePhoto {
	id: number;
	/** Downsized JPEG, or the original when it can't be decoded but is small enough */
	blob: Blob | null;
	/** Object URL for the thumbnail */
	preview: string | null;
	status: 'preparing' | 'ready' | 'failed';
}

/**
 * Downsizes a photo in the browser so several fit in one request. Phone
 * photos are often 3–8 MB; at 1600px they are typically a few hundred KB.
 * HEIC/HEIF photos the browser can't decode (outside Safari) are sent
 * unchanged if they are small enough.
 */
/** Some pickers (Chrome on Windows, some Android) give HEIC files no MIME type. */
const isHeic = (file: File) => /^image\/hei[cf]$/.test(file.type) || /\.hei[cf]$/i.test(file.name);

export const isPhoto = (file: File) => file.type.startsWith('image/') || isHeic(file);

export async function preparePhoto(file: File): Promise<Blob> {
	try {
		const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
		const scale = Math.min(1, PHOTO_LIMITS.maxEdge / Math.max(bitmap.width, bitmap.height));
		const canvas = document.createElement('canvas');
		canvas.width = Math.round(bitmap.width * scale);
		canvas.height = Math.round(bitmap.height * scale);
		canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
		bitmap.close();
		const blob = await new Promise<Blob | null>((resolve) =>
			canvas.toBlob(resolve, 'image/jpeg', 0.8)
		);
		// Keep a smaller original only in a format the server accepts
		const sendable = PHOTO_LIMITS.accept.split(',').includes(file.type);
		if (blob) return sendable && file.size < blob.size ? file : blob;
	} catch {
		// Fall through to sending the original
	}
	// Only formats some browsers can't read; a JPEG or PNG that fails to decode is broken
	if (isHeic(file) && file.size <= PHOTO_LIMITS.maxBytes) return file;
	throw new Error('Unsupported photo');
}

/**
 * Splits ready photos into those that fit the upload budget and the rest, so
 * the form can send what fits and say what didn't.
 */
export function withinBudget(photos: SitePhoto[]) {
	let total = 0;
	const send: SitePhoto[] = [];
	const over: SitePhoto[] = [];
	for (const photo of photos) {
		if (photo.status !== 'ready' || !photo.blob) continue;
		if (total + photo.blob.size <= PHOTO_LIMITS.uploadBudget) {
			send.push(photo);
			total += photo.blob.size;
		} else {
			over.push(photo);
		}
	}
	return { send, over };
}
