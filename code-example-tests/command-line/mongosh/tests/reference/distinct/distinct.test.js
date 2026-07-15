const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(15000);

const dbName = "sample_mflix";

describeWithSampleData("distinct method examples", () => {

	afterEach(() => {
		const mongoUri = process.env.CONNECTION_STRING;
		const command = `mongosh "${mongoUri}" --quiet --eval '
			db = db.getSiblingDB("${dbName}");
			db.movieTitlesDemo.drop();
		'`;
		try {
			execSync(command, { encoding: "utf8" });
		} catch (error) {
			// collection may not exist — safe to ignore
		}
	});

	test("Should return distinct values for a field (distinct-type-field)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/distinct/distinct-type-field.js"])
			.withDbName(dbName)
			.withOrderedSort()
			.shouldMatch("reference/distinct/distinct-type-field-output.sh");
	});

	test("Should return distinct values for an embedded field (distinct-embedded-field)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/distinct/distinct-embedded-field.js"])
			.withDbName(dbName)
			.withOrderedSort()
			.shouldMatch("reference/distinct/distinct-embedded-field-output.sh");
	});

	test("Should return distinct values for an array field (distinct-array-field)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/distinct/distinct-array-field.js"])
			.withDbName(dbName)
			.withOrderedSort()
			.shouldMatch("reference/distinct/distinct-array-field-output.sh");
	});

	test("Should return distinct values with a query filter (distinct-with-query)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/distinct/distinct-with-query.js"])
			.withDbName(dbName)
			.withOrderedSort()
			.shouldMatch("reference/distinct/distinct-with-query-output.sh");
	});

	test("Should return distinct values with collation (distinct-collation)", async () => {
		await Expect
			.outputFromExampleFiles([
				"reference/distinct/distinct-collation-setup.js",
				"reference/distinct/distinct-collation.js"
			])
			.withDbName(dbName)
			.shouldMatch("reference/distinct/distinct-collation-output.sh");
	});

}, dbName);
