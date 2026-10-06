// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			/** Solution title a page is about; makes WhatsApp messages contextual (see $lib/whatsapp) */
			whatsappTopic?: string;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
