const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $concat aggregation expression", () => {

	test("Should concatenate the title and rated values", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/expressions/concat/concat-title-rated.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/concat/concat-title-rated-output.sh");
	});

}, dbName);
