/**
 * Writes the docset catalog to JSON for consumers that cannot import it.
 *
 * The Netlify extensions are published artifacts: their code is bundled by
 * at extension publish time, not resolved from the content branch currently being
 * built. The build emits and reads this file from the repo checkout instead.
 * 
 * The emit is `JSON.stringify(docsets)` with no reshaping, so the file and the
 * TypeScript import cannot drift.
 */
import fs from "node:fs";
import path from "node:path";
import { docsets } from "../index";

const DEFAULT_OUTPUT = path.join(
	import.meta.dirname,
	"..",
	"generated",
	"docsets.json",
);

const main = (): void => {
	const outputPath = path.resolve(process.argv[2] ?? DEFAULT_OUTPUT);

	if (docsets.length === 0) {
		throw new Error(
			"[versioning] refusing to emit an empty catalog — every docset would lose its paths, search keys, and prefixes",
		);
	}

	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, JSON.stringify(docsets), "utf8");
	console.log(
		`[versioning] wrote ${docsets.length} docsets to ${outputPath}`,
	);
};

main();
