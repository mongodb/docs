const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

const dbName = "sample_mflix";

describeWithSampleData("compact command examples", () => {

	test("Should compact a collection (compact-collection)", async () => {
		await Expect
			.outputFromExampleFiles(["database-commands/compact/compact-collection.js"])
			.withDbName(dbName)
			.shouldResemble("database-commands/compact/compact-collection-output.sh")
			.withSchema({
				count: 1,
				requiredFields: ["bytesFreed", "ok"]
			});
	});

	test("Should estimate compaction with dryRun (compact-dryrun)", async () => {
		await Expect
			.outputFromExampleFiles(["database-commands/compact/compact-dryrun.js"])
			.withDbName(dbName)
			.shouldResemble("database-commands/compact/compact-dryrun-output.sh")
			.withSchema({
				count: 1,
				requiredFields: ["estimatedBytesFreed", "ok"]
			});
	});

}, dbName);
