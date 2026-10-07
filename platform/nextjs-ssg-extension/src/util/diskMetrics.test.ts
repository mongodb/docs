import {
	computeVolumeStats,
	formatBytes,
	parseDuOutput,
} from "./diskMetrics";

describe("computeVolumeStats", () => {
	it("derives used, free, total, and percent from statfs numbers", () => {
		const stats = computeVolumeStats({
			bsize: 4096,
			blocks: 1000,
			bfree: 400,
			bavail: 300,
		});

		expect(stats.totalBytes).toBe(4096 * 1000);
		expect(stats.freeBytes).toBe(4096 * 300);
		expect(stats.usedBytes).toBe(4096 * 600);
		expect(stats.usedPercent).toBeCloseTo(60, 5);
	});

	it("reports 0% used when the volume reports zero size", () => {
		const stats = computeVolumeStats({
			bsize: 0,
			blocks: 0,
			bfree: 0,
			bavail: 0,
		});

		expect(stats.usedPercent).toBe(0);
		expect(stats.totalBytes).toBe(0);
	});
});

describe("parseDuOutput", () => {
	it("parses du -sk output and converts kilobytes to bytes", () => {
		expect(parseDuOutput("12345\t/content\n")).toBe(12345 * 1024);
	});

	it("returns null when the output is unparseable", () => {
		expect(parseDuOutput("")).toBeNull();
		expect(parseDuOutput("no numbers here")).toBeNull();
	});
});

describe("formatBytes", () => {
	it("scales the unit to the magnitude", () => {
		expect(formatBytes(512)).toBe("512 B");
		expect(formatBytes(2048)).toBe("2.0 KB");
		expect(formatBytes(3 * 1024 ** 2)).toBe("3.0 MB");
		expect(formatBytes(3.4 * 1024 ** 3)).toBe("3.4 GB");
	});
});
