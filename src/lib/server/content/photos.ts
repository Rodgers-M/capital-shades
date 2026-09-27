import type { Picture } from '@sveltejs/enhanced-img';
import type { Img } from '$lib/content/types';

// Seed photos, processed at build time into AVIF/WebP at several widths.
const modules = import.meta.glob<Picture>('/src/lib/assets/photos/*.jpg', {
	eager: true,
	import: 'default',
	query: { enhanced: true, w: '1600;1024;640', quality: '50' }
});

const pictures = new Map(
	Object.entries(modules).map(([path, picture]) => [
		path
			.split('/')
			.pop()!
			.replace(/\.jpg$/, ''),
		picture
	])
);

export function photo(key: string, alt: string): Img {
	const picture = pictures.get(key);
	if (!picture) throw new Error(`Unknown seed photo "${key}"`);
	return {
		src: picture.img.src,
		width: picture.img.w,
		height: picture.img.h,
		sources: Object.entries(picture.sources).map(([format, srcset]) => ({
			type: `image/${format}`,
			srcset
		})),
		alt
	};
}
