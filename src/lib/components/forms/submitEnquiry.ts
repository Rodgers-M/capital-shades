export type SubmitResult =
	| { status: 'success' }
	| { status: 'invalid'; errors: Record<string, string> }
	| { status: 'error'; message: string };

/**
 * POST a form (or prepared form data, e.g. with downsized photos) to
 * /api/enquiry as a JSON-accepting fetch (no page reload).
 */
export async function submitEnquiry(body: HTMLFormElement | FormData): Promise<SubmitResult> {
	try {
		const response = await fetch('/api/enquiry', {
			method: 'POST',
			body: body instanceof FormData ? body : new FormData(body),
			headers: { accept: 'application/json' }
		});
		const json = await response.json().catch(() => ({}));
		if (response.ok) return { status: 'success' };
		if (response.status === 400 && json.errors) return { status: 'invalid', errors: json.errors };
		if (response.status === 413)
			return { status: 'error', message: 'Your photos were too large to send.' };
		return { status: 'error', message: json.message ?? 'Something went wrong.' };
	} catch {
		return { status: 'error', message: 'Could not reach the server. Check your connection.' };
	}
}
