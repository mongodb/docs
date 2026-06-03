const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

const dbName = "sample_mflix";

describeWithSampleData("listCollections command examples", () => {

	test("Should list collection names only (list-name-only)", async () => {
		await Expect
			.outputFromExampleFiles(["database-commands/listCollections/list-name-only.js"])
			.withDbName(dbName)
			.withIgnoredFields("$clusterTime", "operationTime")
			.shouldMatch("database-commands/listCollections/list-name-only-output.sh");
	});

	test("Should list full collection info (list-full)", async () => {
		await Expect
			.outputFromExampleFiles(["database-commands/listCollections/list-full.js"])
			.withDbName(dbName)
			.withIgnoredFields("$clusterTime", "operationTime")
			.shouldMatch("database-commands/listCollections/list-full-output.sh");
	});

}, dbName);
