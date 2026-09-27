export type SubmitResult =
	| { status: 'success' }
	| { status: 'invalid'; errors: Record<string, string> }
	| { status: 'error'; message: string };

/** POST a form to /api/enquiry as JSON-accepting fetch (no page reload). */
export async function submitEnquiry(form: HTMLFormElement): Promise<SubmitResult> {
	try {
		const response = await fetch('/api/enquiry', {
			method: 'POST',
			body: new FormData(form),
			headers: { accept: 'application/json' }
		});
		const body = await response.json().catch(() => ({}));
		if (response.ok) return { status: 'success' };
		if (response.status === 400 && body.errors) return { status: 'invalid', errors: body.errors };
		return { status: 'error', message: body.message ?? 'Something went wrong.' };
	} catch {
		return { status: 'error', message: 'Could not reach the server. Check your connection.' };
	}
}
