// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			/** What the page is about, for contextual WhatsApp messages (see $lib/whatsapp) */
			whatsapp?: import('$lib/whatsapp').WhatsAppContext;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
