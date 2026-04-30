const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $cond aggregation expression", () => {

	test("Should assign rental price using object syntax", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/expressions/cond/object-syntax.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/cond/object-syntax-output.sh");
	});

	test("Should assign rental price using array syntax", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/expressions/cond/array-syntax.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/cond/array-syntax-output.sh");
	});

}, dbName);
