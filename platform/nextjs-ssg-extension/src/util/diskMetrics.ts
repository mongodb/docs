/**
 * Disk usage instrumentation for SSG builds.
 *
 * Samples the build volume and the biggest build-artifact directories at each
 * major build step, so the Netlify build log tells a story about where disk
 * goes. Every sample is best-effort: a metric failure logs a warning and never
 * fails the deploy.
 */

import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { getRepoPaths } from "../../../nextjs-extension/src/paths";
import { APP_DIR } from "../constants";

const execFileAsync = promisify(execFile);

const BYTES_PER_KB = 1024;
const BYTES_PER_MB = 1024 ** 2;
const BYTES_PER_GB = 1024 ** 3;

/** Label of the first sample; the net-delta line is measured against it. */
export const BASELINE_LABEL = "onPreBuild:start";
/** Label of the last sample; prints the net delta against the baseline. */
export const FINAL_LABEL = "onSuccess:end";

export interface VolumeStats {
	totalBytes: number;
	usedBytes: number;
	freeBytes: number;
	usedPercent: number;
}

interface StatFsLike {
	bsize: number;
	blocks: number;
	bfree: number;
	bavail: number;
}

interface DirSize {
	label: string;
	bytes: number | null;
}

let baselineUsedBytes: number | null = null;

/** Turn raw `fs.statfs` numbers into byte totals. Pure, so it is unit-testable. */
export const computeVolumeStats = (stats: StatFsLike): VolumeStats => {
	const totalBytes = stats.bsize * stats.blocks;
	const freeBytes = stats.bsize * stats.bavail;
	const usedBytes = totalBytes - stats.bsize * stats.bfree;
	const usedPercent = totalBytes > 0 ? (usedBytes / totalBytes) * 100 : 0;
	return { totalBytes, usedBytes, freeBytes, usedPercent };
};

/** Parse `du -sk` stdout (`<kilobytes>\t<path>`) into bytes. Pure. */
export const parseDuOutput = (stdout: string): number | null => {
	const kb = Number.parseInt(stdout.trim().split(/\s+/)[0] ?? "", 10);
	return Number.isFinite(kb) ? kb * BYTES_PER_KB : null;
};

/** Human-readable byte size, e.g. `3.4 GB`. Pure. */
export const formatBytes = (bytes: number): string => {
	if (bytes >= BYTES_PER_GB) return `${(bytes / BYTES_PER_GB).toFixed(1)} GB`;
	if (bytes >= BYTES_PER_MB) return `${(bytes / BYTES_PER_MB).toFixed(1)} MB`;
	if (bytes >= BYTES_PER_KB) return `${(bytes / BYTES_PER_KB).toFixed(1)} KB`;
	return `${bytes} B`;
};

const getMetricsDirs = (): Array<{ label: string; dir: string }> => {
	const paths = getRepoPaths(undefined, APP_DIR);
	return [
		{ label: "content", dir: paths.contentDir },
		{ label: "content-mdx", dir: paths.mdxOutputDir },
		{ label: "docs-site/.next", dir: path.join(paths.docsNextjsDir, ".next") },
		{ label: "docs-site/out", dir: path.join(paths.docsNextjsDir, "out") },
		{
			label: "offline-bundle-output",
			dir: path.join(paths.docsNextjsDir, "offline-bundle-output"),
		},
		{ label: "snooty-parser", dir: paths.parserDir },
	];
};

/** `du -sk` one directory. Returns null if the directory is missing or du fails. */
const measureDir = async (dir: string): Promise<number | null> => {
	try {
		const { stdout } = await execFileAsync("du", ["-sk", dir], {
			maxBuffer: 1024 * 1024,
		});
		return parseDuOutput(stdout);
	} catch {
		return null;
	}
};

/**
 * Log one disk-usage sample with the given step label and human context.
 * Never throws: failures are downgraded to a warning.
 */
export const logDiskMetrics = async (
	label: string,
	context: string,
): Promise<void> => {
	try {
		const { repoRoot } = getRepoPaths(undefined, APP_DIR);
		const statfsResult = await fs.statfs(repoRoot);
		const volume = computeVolumeStats(statfsResult);
		if (baselineUsedBytes === null) baselineUsedBytes = volume.usedBytes;

		const dirSizes: DirSize[] = await Promise.all(
			getMetricsDirs().map(async ({ label: dirLabel, dir }) => ({
				label: dirLabel,
				bytes: await measureDir(dir),
			})),
		);
		const dirSummary = dirSizes
			.map((d) => `${d.label}=${d.bytes === null ? "n/a" : formatBytes(d.bytes)}`)
			.join("  ");

		console.log(`[disk-metrics] ${label} | ${context}`);
		console.log(
			`  volume: ${formatBytes(volume.usedBytes)} used / ${formatBytes(volume.totalBytes)} total — ${formatBytes(volume.freeBytes)} free (${volume.usedPercent.toFixed(1)}% used)`,
		);
		console.log(`  dirs: ${dirSummary}`);

		if (label === FINAL_LABEL && baselineUsedBytes !== null) {
			const delta = volume.usedBytes - baselineUsedBytes;
			const sign = delta >= 0 ? "+" : "-";
			console.log(
				`[disk-metrics] NET DELTA since ${BASELINE_LABEL}: ${sign}${formatBytes(Math.abs(delta))} used (${formatBytes(baselineUsedBytes)} → ${formatBytes(volume.usedBytes)})`,
			);
		}
	} catch (error) {
		console.warn(
			`[disk-metrics] ${label} sample failed:`,
			error instanceof Error ? error.message : error,
		);
	}
};
