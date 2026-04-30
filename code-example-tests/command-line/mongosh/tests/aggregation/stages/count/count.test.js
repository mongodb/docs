const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $count aggregation stage", () => {

	test("Should count movies with a perfect metacritic score", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/count/perfect-score.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/count/perfect-score-output.sh");
	});

}, dbName);
