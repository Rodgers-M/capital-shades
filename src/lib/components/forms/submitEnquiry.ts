/** `too-large`: the host refused the request body (413); `network`: it never reached the server; `server`: the server answered with an error */
export type SubmitErrorCause = 'too-large' | 'network' | 'server';

export type SubmitResult =
	| { status: 'success' }
	| { status: 'invalid'; errors: Record<string, string> }
	| { status: 'error'; message: string; cause: SubmitErrorCause };

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
			return {
				status: 'error',
				message: 'Your photos were too large to send.',
				cause: 'too-large'
			};
		return { status: 'error', message: json.message ?? 'Something went wrong.', cause: 'server' };
	} catch {
		return {
			status: 'error',
			message: 'Could not reach the server. Check your connection.',
			cause: 'network'
		};
	}
}
