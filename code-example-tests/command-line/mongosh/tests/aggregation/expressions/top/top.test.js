const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $top", () => {

	test.skip("Should return the first cast member alphabetically using $top", async () => {
		await Expect
			.outputFromExampleFiles(["aggregation/expressions/top/pipeline.js"])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/top/pipeline-output.sh");
	});
}, dbName);
