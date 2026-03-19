const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $bottomN", () => {

	test.skip("Should return the first two cast members alphabetically using $bottomN", async () => {
		await Expect
			.outputFromExampleFiles(["aggregation/expressions/bottomN/pipeline.js"])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/bottomN/pipeline-output.sh");
	});
}, dbName);
