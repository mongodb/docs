const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $substr aggregation expression", () => {

	test("Should extract a substring from the title", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/expressions/substr/substr-title.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/substr/substr-title-output.sh");
	});

}, dbName);
