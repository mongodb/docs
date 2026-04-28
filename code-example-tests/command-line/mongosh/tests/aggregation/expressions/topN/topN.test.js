const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $topN", () => {

	/*
		This test is skipped because MongoDB 8.3 is not yet available for atlas-cli
		testing.

		Once MongoDB 8.3 is available in atlas-cli, this test should be re-enabled
		to ensure that the $topN operator returns the first N cast members alphabetically.
	*/
	test.skip("Should return the first two cast members alphabetically using $topN", async () => {
		await Expect
			.outputFromExampleFiles(["aggregation/expressions/topN/pipeline.js"])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/topN/pipeline-output.sh");
	});
}, dbName);

