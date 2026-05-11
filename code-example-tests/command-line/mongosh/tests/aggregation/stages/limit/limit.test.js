const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $limit aggregation stage", () => {

	test("Should limit results to 5 documents", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/limit/limit-movies.js"
			])
			.withDbName(dbName)
			.shouldResemble("aggregation/stages/limit/limit-movies-output.sh")
			.withSchema({
				count: 5,
				requiredFields: ["_id", "title"],
			});
	});

}, dbName);
