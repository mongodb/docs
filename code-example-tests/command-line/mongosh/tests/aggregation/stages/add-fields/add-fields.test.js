const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $addFields aggregation stage", () => {

	test("Should compute runtime hours and license fee using two stages", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/add-fields/two-stages.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/add-fields/two-stages-output.sh");
	});

	test("Should add a field to an embedded document", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/add-fields/embedded-doc.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/add-fields/embedded-doc-output.sh");
	});

	test("Should overwrite an existing field", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/add-fields/overwrite-field.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/add-fields/overwrite-field-output.sh");
	});

	test("Should overwrite fields using values from other fields", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/add-fields/field-substitution.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/add-fields/field-substitution-output.sh");
	});

	test("Should add an element to an array field", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/add-fields/add-to-array.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/add-fields/add-to-array-output.sh");
	});

	test("Should remove a field using $$REMOVE", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/add-fields/remove-field.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/add-fields/remove-field-output.sh");
	});

	test("Should conditionally remove a field using $ifNull and $$REMOVE", async () => {
		await Expect
			.outputFromExampleFiles([
				"aggregation/stages/add-fields/remove-field-conditional.js"
			])
			.withDbName(dbName)
			.shouldMatch("aggregation/stages/add-fields/remove-field-conditional-output.sh");
	});

}, dbName);
