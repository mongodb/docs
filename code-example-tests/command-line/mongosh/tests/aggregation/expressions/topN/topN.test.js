const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $topN", () => {

	test.skip("Should return the first two cast members alphabetically using $topN", async () => {
		await Expect
			.outputFromExampleFiles(["aggregation/expressions/topN/pipeline.js"])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/topN/pipeline-output.sh");
	});
}, dbName);

