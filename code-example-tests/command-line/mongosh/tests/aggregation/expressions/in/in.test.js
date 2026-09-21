const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $in aggregation expression", () => {

	test("Should determine whether the Drama genre is present", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/expressions/in/in-genre.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/expressions/in/in-genre-output.sh");
	});

}, dbName);
