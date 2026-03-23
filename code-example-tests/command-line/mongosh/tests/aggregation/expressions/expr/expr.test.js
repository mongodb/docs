const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $expr", () => {

	test("Should return movies where viewer rating is greater than critic rating", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/expressions/expr/find.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/expr/find-output.js");
	});

	test("Should return movies with weighted score greater than 9", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/expressions/expr/weighted-score.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/expr/weighted-score-output.sh");
	});

}, dbName);
