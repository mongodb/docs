const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $bottom", () => {

	/*
		This test is skipped because MongoDB 8.3 is not yet available for atlas-cli
		testing.

		Once MongoDB 8.3 is available in atlas-cli, this test should be re-enabled
		to ensure that the $bottom operator returns the last cast member alphabetically.
	*/
	test.skip("Should return the last cast member alphabetically using $bottom", async () => {
		await Expect
			.outputFromExampleFiles(["aggregation/expressions/bottom/pipeline.js"])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/bottom/pipeline-output.sh");
	});
}, dbName);