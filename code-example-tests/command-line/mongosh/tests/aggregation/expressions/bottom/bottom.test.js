const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $bottom", () => {

	test.skip("Should return the last cast member alphabetically using $bottom", async () => {
		await Expect
			.outputFromExampleFiles(["aggregation/expressions/bottom/pipeline.js"])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/bottom/pipeline-output.sh");
	});
}, dbName);