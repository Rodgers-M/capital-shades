/**
 * Phase C5: move a dataset from the old content model (`product` documents,
 * one `product` per project, `image`, `completed`) to the new one, without
 * deleting or overwriting anything. Prints the plan; only --apply writes it.
 *
 *   cd studio && npm run migrate-solutions               # dry run
 *   cd studio && npm run migrate-solutions -- --apply
 *
 * Re-runnable: it only creates missing solutions and fills empty fields.
 * Legacy documents and fields stay until production has been checked; the
 * migration map is in docs/implementation.md (Phase C5).
 */
import { getCliClient } from 'sanity/cli';
import { SOLUTION_TYPES, currentSolutionSlug } from '../../src/lib/content/solutionTypes';
import { solutions as seedSolutions } from '../../src/lib/content/seed/solutions';
import { settings as seedSettings } from '../../src/lib/content/seed/settings';
import { orderRank, solutionId } from './ids';

/**
 * Retired slugs that describe an application of their target, not the target
 * itself: their projects move to the target, but their copy never becomes its page.
 */
const FOLDED = new Set(['pool-shades']);

/**
 * Old product slug → new solution: renames come from LEGACY_SOLUTION_SLUGS, so
 * the site and this script share one map. The legacy branch serves any seed
 * record kept as an unlisted page (none today). A product that maps to neither
 * is reported and left alone.
 */
function mapProduct(slug: string): { slug: string; status: 'published' | 'legacy' } | undefined {
	const target = currentSolutionSlug(slug);
	if (SOLUTION_TYPES.some((t) => t.id === target)) return { slug: target, status: 'published' };
	return seedSolutions.some((s) => s.slug === target && s.status === 'legacy')
		? { slug: target, status: 'legacy' }
		: undefined;
}

/** Settings confirmed in docs/decisions.md, filled in only where the document has none. */
const CONFIRMED_SETTINGS = {
	location: seedSettings.location,
	serviceAreas: seedSettings.serviceAreas,
	warrantyNote: seedSettings.warrantyNote,
	siteVisitNote: seedSettings.siteVisitNote,
	quoteNote: seedSettings.quoteNote
};

interface LegacyProduct {
	_id: string;
	slug: string | null;
	title: string;
	eyebrow?: string;
	summary?: string;
	body?: string[];
	features?: string[];
	applications?: string[];
	image?: unknown;
}

interface ProjectRow {
	_id: string;
	title: string;
	productSlug: string | null;
	hasSolutions: boolean;
	heroImage: unknown;
	image: unknown;
	completed: string | null;
	completionYear: number | null;
}

const PUBLISHED = '!(_id in path("drafts.**"))';
const apply = process.argv.includes('--apply');
const client = getCliClient({ apiVersion: '2025-10-01' });

async function main() {
	const { projectId, dataset } = client.config();
	console.log(`${apply ? 'Migrating' : 'Dry run for'} ${projectId}/${dataset}\n`);

	const data = await client.fetch<{
		products: LegacyProduct[];
		solutions: { _id: string; slug: string | null }[];
		projects: ProjectRow[];
		drafts: number;
		settings: Record<string, unknown> | null;
	}>(`{
		"products": *[_type == "product" && ${PUBLISHED}]{
			_id, "slug": slug.current, title, eyebrow, summary, body, features, applications, image
		},
		"solutions": *[_type == "solution" && ${PUBLISHED}]{ _id, "slug": slug.current },
		"projects": *[_type == "project" && ${PUBLISHED}]{
			_id, title, "productSlug": product->slug.current, "hasSolutions": count(solutions) > 0,
			heroImage, image, completed, completionYear
		},
		"drafts": count(*[_type in ["product", "project"] && _id in path("drafts.**")]),
		"settings": *[_id == "siteSettings"][0]
	}`);

	const tx = client.transaction();
	const report: string[] = [];
	/** Solution slug → document ID, existing or created below */
	const ids = new Map(data.solutions.flatMap((s) => (s.slug ? [[s.slug, s._id] as const] : [])));
	const rank = (slug: string) =>
		orderRank(
			Math.max(
				0,
				seedSolutions.findIndex((s) => s.slug === slug)
			)
		);
	const seedFor = (slug: string) => seedSolutions.find((s) => s.slug === slug);

	report.push('Solutions');
	for (const product of data.products) {
		const target = product.slug ? mapProduct(product.slug) : undefined;
		if (!target) {
			report.push(`  ? "${product.title}" (${product.slug}): no mapping, left as is`);
			continue;
		}
		if (product.slug && FOLDED.has(product.slug)) {
			report.push(`  → ${product.slug} → ${target.slug}: folded in, its copy isn't used`);
			continue;
		}
		if (ids.has(target.slug)) {
			report.push(`  = ${product.slug} → ${target.slug}: solution already exists`);
			continue;
		}
		const seed = seedFor(target.slug);
		const { _id: _legacyId, slug: _legacySlug, title, ...copy } = product;
		const _id = solutionId(target.slug);
		tx.create({
			_id,
			_type: 'solution',
			orderRank: rank(target.slug),
			// Taxonomy solutions take the new name; a legacy one keeps its own
			title: SOLUTION_TYPES.find((t) => t.id === target.slug)?.label ?? title,
			slug: { _type: 'slug', current: target.slug },
			status: target.status,
			...copy,
			// Confirmed in docs/decisions.md and docs/content-to-confirm.md, not taken from the product
			quoteMaterials: seed?.quoteMaterials,
			aliases: seed?.aliases,
			sectors: seed && seed.status !== 'planned' ? seed.sectors : undefined
		});
		ids.set(target.slug, _id);
		report.push(`  + ${product.slug} → ${target.slug} (${target.status}), copied from "${title}"`);
	}
	for (const type of SOLUTION_TYPES) {
		if (ids.has(type.id)) continue;
		const _id = solutionId(type.id);
		tx.create({
			_id,
			_type: 'solution',
			orderRank: rank(type.id),
			title: type.label,
			slug: { _type: 'slug', current: type.id },
			status: 'planned',
			aliases: seedFor(type.id)?.aliases
		});
		ids.set(type.id, _id);
		report.push(`  + ${type.id} (planned): no page until its copy and photo are added`);
	}

	report.push('\nProjects');
	for (const project of data.projects) {
		const changes: Record<string, unknown> = {};
		if (!project.hasSolutions && project.productSlug) {
			const slug = mapProduct(project.productSlug)?.slug;
			const ref = slug && ids.get(slug);
			if (ref) changes.solutions = [{ _key: slug, _type: 'reference', _ref: ref }];
			else report.push(`  ? "${project.title}": product ${project.productSlug} has no mapping`);
		}
		if (!project.heroImage && project.image) changes.heroImage = project.image;
		// Only an unambiguous year already in the old text; never guessed
		const years = project.completed?.match(/\b(19|20)\d{2}\b/g) ?? [];
		if (project.completionYear === null && years.length === 1)
			changes.completionYear = Number(years[0]);
		else if (project.completionYear === null && project.completed)
			report.push(`  ? "${project.title}": no single year in "${project.completed}"`);

		if (Object.keys(changes).length) {
			tx.patch(project._id, (patch) => patch.setIfMissing(changes));
			report.push(`  ~ "${project.title}": ${Object.keys(changes).join(', ')}`);
		}
	}

	report.push('\nSite settings');
	if (data.settings) {
		// Before C5 the first listed phone was the main one, so it wins over the seed
		const [first] = (data.settings.phones as { _key?: string; _type?: string }[] | undefined) ?? [];
		// The array item's _key and _type don't belong on the inline primaryPhone object
		const { _key: _arrayKey, _type: _arrayType, ...firstPhone } = first ?? {};
		const missing = Object.fromEntries(
			Object.entries({
				primaryPhone: first ? firstPhone : seedSettings.primaryPhone,
				...CONFIRMED_SETTINGS
			}).filter(([key]) => (data.settings?.[key] ?? null) === null)
		);
		if (Object.keys(missing).length) {
			tx.patch('siteSettings', (patch) => patch.setIfMissing(missing));
			for (const [key, value] of Object.entries(missing))
				report.push(`  ~ ${key}: ${JSON.stringify(value)}`);
		} else report.push('  = nothing missing');
	} else report.push('  ? no siteSettings document: run `npm run import-seed` on a new dataset');

	if (data.drafts)
		report.push(
			`\n! ${data.drafts} unpublished draft(s) skipped: publish them and run this again.`
		);
	console.log(report.join('\n'));

	const mutations = tx.serialize().length;
	if (!mutations) return console.log('\nNothing to do.');
	if (!apply)
		return console.log(`\n${mutations} change(s) planned. Run with --apply to write them.`);
	await tx.commit();
	console.log(`\nDone: ${mutations} change(s). Nothing was deleted.`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
