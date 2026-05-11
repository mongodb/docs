const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $group aggregation stage", () => {

	test("Should group movies by year and calculate runtime stats", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/group/group-by-year.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/group/group-by-year-output.sh");
	});

	test("Should group movie titles by year", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/group/group-titles-by-year.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/group/group-titles-by-year-output.sh");
	});

	test("Should group full movie documents by year and compute total runtime", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/group/group-documents-by-year.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/group/group-documents-by-year-output.sh");
	});

	test("Should count all documents in the collection", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/group/count-documents.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/group/count-documents-output.sh");
	});

	test("Should retrieve distinct rated values", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/group/distinct-values.js"
			])
			.withDbName(dbName)
			.shouldResemble("aggregation/stages/group/distinct-values-output.sh")
			.withSchema({
				count: 18,
				requiredFields: ["_id"]
			});
	});

	test("Should group movies by rating and filter by total runtime", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/group/group-by-rating.js"
			])
			.withDbName(dbName)
			.shouldResemble("aggregation/stages/group/group-by-rating-output.sh")
			.withSchema({
				count: 4,
				requiredFields: ["_id", "totalRuntime"]
			});
	});

	test("Should aggregate runtime stats across all documents", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/group/group-by-null.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/group/group-by-null-output.sh");
	});

	test("Should return first title per year using sort and group", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/group/index-optimization.js"
			])
			.withDbName(dbName)
			.shouldResemble("aggregation/stages/group/index-optimization-output.sh")
			.withSchema({
				count: 20,
				requiredFields: ["_id", "title"]
			});
	});

}, dbName);
