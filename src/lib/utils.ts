import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-KE', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	});
}

/** Build a wa.me link with an optional pre-filled message. */
export function whatsappLink(number: string, message?: string) {
	const base = `https://wa.me/${number.replace(/\D/g, '')}`;
	return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
