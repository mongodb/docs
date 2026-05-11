const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $ifNull expression operator", () => {

	test("Should return rated field or 'Not Rated' when missing", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/expressions/ifNull/single-input.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/ifNull/single-input-output.sh");
	});

	test("Should return critic rating, viewer rating, or 0 when both are missing", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/expressions/ifNull/multiple-input.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/ifNull/multiple-input-output.sh");
	});

}, dbName);
