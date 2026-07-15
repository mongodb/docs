const Expect = require("../../../utils/comparison/Expect");
const { execSync } = require("child_process");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

const dbName = "sample_mflix";

describeWithSampleData("database-references examples", () => {

	afterEach(() => {
		const command = `mongosh "${process.env.CONNECTION_STRING}" --quiet --eval '
			db = db.getSiblingDB("${dbName}");
			db.comments.deleteMany({ name: "Reference Demo Viewer" });
			db.movies.deleteOne({ title: "Reference Demo Film 2099" });
		'`;
		execSync(command, { encoding: "utf8" });
	});

	test("Should create a manual reference between two documents (create-manual-reference)", async () => {
		await Expect
			.outputFromExampleFiles([
				"reference/database-references/create-manual-reference.js",
				"reference/database-references/create-manual-reference-verify.js"
			])
			.withDbName(dbName)
			.shouldMatch("reference/database-references/create-manual-reference-output.sh");
	});

}, dbName);
