const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $facet aggregation stage", () => {

	test("Should categorize movies across multiple dimensions using $facet", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/facet/facet.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/facet/facet-output.sh");
	});

}, dbName);
