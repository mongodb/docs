const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $unwind aggregation stage", () => {

	test("Should unwind the genres array into individual documents", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/unwind/unwind-array.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/unwind/unwind-array-output.sh");
	});

	test("Should drop documents with missing genres field", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/unwind/missing-values.js"
			])
			.withDbName(dbName)
			.shouldResemble("aggregation/stages/unwind/missing-values-output.sh")
			.withSchema({
   	    		count: 6,
   	    		requiredFields: ['genres', 'title'],
   			});
	});

	test("Should preserve documents with missing genres using preserveNullAndEmptyArrays", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/unwind/preserve-null.js"
			])
			.withDbName(dbName)
			.shouldResemble("aggregation/stages/unwind/preserve-null-output.sh")
			.withSchema({
   	    		count: 8,
   	    		requiredFields: ['title'],
   			});
	});

	test("Should include array index with includeArrayIndex option", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/unwind/include-array-index.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/unwind/include-array-index-output.sh");
	});

	test("Should group movies by genre and count after unwinding", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/unwind/group-by-unwound.js"
			])
			.withDbName(dbName)
			.shouldResemble("aggregation/stages/unwind/group-by-unwound-output.sh")
			.withSchema({
				count: 8,
				requiredFields: ["_id", "movieCount"]
			});
	});

	test("Should count cast appearances per genre after unwinding multiple arrays", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/unwind/unwind-multiple-arrays.js"
			])
			.withDbName(dbName)
			.shouldResemble("aggregation/stages/unwind/unwind-multiple-arrays-output.sh")
			.withSchema({
				count: 6,
				requiredFields: ["_id", "castAppearances"]
			});
	});

}, dbName);
