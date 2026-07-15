const Expect = require("../../../utils/comparison/Expect");
const { execSync } = require("child_process");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

const dbName = "sample_mflix";

describeWithSampleData("Date method examples", () => {

	afterEach(() => {
		const command = `mongosh "${process.env.CONNECTION_STRING}" --quiet --eval '
			db = db.getSiblingDB("${dbName}");
			db.movies.deleteOne({ title: "Upsert Demo Film 2099" });
			db.movies.deleteMany({ title: /^ISODate Demo:/ });
		'`;
		execSync(command, { encoding: "utf8" });
	});

	test("Should upsert with $setOnInsert and current date (date-set-on-insert)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/date/date-set-on-insert.js"])
			.withDbName(dbName)
			.shouldMatch("reference/date/date-set-on-insert-output.sh");
	});

	test("Should insert documents with ISODate and find by date (isodate-insert-and-find)", async () => {
		await Expect
			.outputFromExampleFiles([
				"reference/date/isodate-insert.js",
				"reference/date/isodate-find.js"
			])
			.withDbName(dbName)
			.shouldMatch("reference/date/isodate-find-output.sh");
	});

}, dbName);
