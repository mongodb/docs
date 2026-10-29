const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $unionWith aggregation stage", () => {

	test("Should include duplicates in the combined result set", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/unionWith/duplicates.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/unionWith/duplicates-output.sh");
	});

	test("Should remove duplicates with $group", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/unionWith/remove-duplicates.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/unionWith/remove-duplicates-output.sh");
	});

	test("Should combine movies by category with $set and $sort", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/unionWith/report-by-category.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/unionWith/report-by-category-output.sh");
	});

	test("Should aggregate total runtime by genre", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/unionWith/runtime-by-genre.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/unionWith/runtime-by-genre-output.sh");
	});

	test("Should union with documents specified in the pipeline", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/unionWith/specified-documents.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/unionWith/specified-documents-output.sh");
	});

}, dbName);
