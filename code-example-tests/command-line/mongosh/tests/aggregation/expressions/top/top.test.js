const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $top", () => {

	/*
		This test is skipped because MongoDB 8.3 is not yet available for atlas-cli
		testing.

		Once MongoDB 8.3 is available in atlas-cli, this test should be re-enabled
		to ensure that the $top operator returns the first cast member alphabetically.
	*/
	test.skip("Should return the first cast member alphabetically using $top", async () => {
		await Expect
			.outputFromExampleFiles(["aggregation/expressions/top/pipeline.js"])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/top/pipeline-output.sh");
	});
}, dbName);
