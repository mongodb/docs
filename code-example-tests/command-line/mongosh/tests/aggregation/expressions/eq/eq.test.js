const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $eq aggregation expression", () => {

	test("Should determine whether the year equals 1978", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/expressions/eq/eq-year.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/eq/eq-year-output.sh");
	});

}, dbName);
