const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $set aggregation stage", () => {

	test("Should compute score fields using two $set stages", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/set/two-stages.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/set/two-stages-output.sh");
	});

	test("Should add a field to an embedded document", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/set/embedded-doc.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/set/embedded-doc-output.sh");
	});

	test("Should overwrite an existing field", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/set/overwrite-field.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/set/overwrite-field-output.sh");
	});

	test("Should replace _id with another field", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/set/field-substitution.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/set/field-substitution-output.sh");
	});

	test("Should add an element to an array field", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/set/add-to-array.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/set/add-to-array-output.sh");
	});

	test("Should create a new field from existing fields", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/set/new-field.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/set/new-field-output.sh");
	});

}, dbName);
