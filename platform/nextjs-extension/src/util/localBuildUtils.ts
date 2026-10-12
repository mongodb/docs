import fs from "node:fs/promises";
import path from "node:path";
import { execaCommand } from "execa";
import type {
	BuildCache,
	BuildRunner,
	BuildStatus,
	BuildUtils,
} from "./buildUtils";

const MANIFEST_NAME = "manifest.json";

// Mirrors @netlify/run-utils: prefer local binaries, and when the caller sets
// no stream options, capture output and also forward it to the terminal.
export const createRunner = (): BuildRunner => ({
	command: (command, options = {}) => {
		const child = execaCommand(command, { preferLocal: true, ...options });
		if (
			options.stdout === undefined &&
			options.stderr === undefined
		) {
			child.stdout?.pipe(process.stdout);
			child.stderr?.pipe(process.stderr);
		}
		return child;
	},
});

/** Stores each saved path under `cacheDir`, keyed by its absolute path. On
 *  Vercel, point `cacheDir` inside `.next/cache` so it survives between builds. */
export const createFsCache = (cacheDir: string): BuildCache => {
	const manifestPath = path.join(cacheDir, MANIFEST_NAME);
	const entryPath = (absolutePath: string) =>
		path.join(cacheDir, "entries", absolutePath);
	const resolve = (p: string, cwd?: string) =>
		path.resolve(cwd ?? process.cwd(), p);

	const readManifest = async (): Promise<string[]> => {
		try {
			return JSON.parse(await fs.readFile(manifestPath, "utf-8"));
		} catch {
			return [];
		}
	};
	const writeManifest = async (entries: string[]) => {
		await fs.mkdir(cacheDir, { recursive: true });
		await fs.writeFile(manifestPath, JSON.stringify([...new Set(entries)]));
	};
	const exists = (p: string) =>
		fs.access(p).then(
			() => true,
			() => false,
		);

	return {
		async save(p, options) {
			const source = resolve(p, options?.cwd);
			if (!(await exists(source))) return false;
			const dest = entryPath(source);
			await fs.rm(dest, { recursive: true, force: true });
			await fs.mkdir(path.dirname(dest), { recursive: true });
			await fs.cp(source, dest, { recursive: true });
			await writeManifest([...(await readManifest()), source]);
			return true;
		},
		async restore(p, options) {
			const target = resolve(p, options?.cwd);
			const source = entryPath(target);
			if (!(await exists(source))) return false;
			await fs.mkdir(path.dirname(target), { recursive: true });
			await fs.cp(source, target, { recursive: true, force: true });
			return true;
		},
		async remove(p, options) {
			const target = resolve(p, options?.cwd);
			const manifest = await readManifest();
			if (!manifest.includes(target)) return false;
			await fs.rm(entryPath(target), { recursive: true, force: true });
			await writeManifest(manifest.filter((entry) => entry !== target));
			return true;
		},
		async has(p, options) {
			return exists(entryPath(resolve(p, options?.cwd)));
		},
		async list() {
			return readManifest();
		},
	};
};

export const createConsoleStatus = (): BuildStatus => ({
	show({ title, summary, text }) {
		console.log(
			[title && `==== ${title} ====`, summary, text]
				.filter(Boolean)
				.join("\n"),
		);
	},
});

export const createLocalBuildUtils = ({
	cacheDir,
}: {
	cacheDir: string;
}): BuildUtils => ({
	run: createRunner(),
	cache: createFsCache(cacheDir),
	status: createConsoleStatus(),
});
