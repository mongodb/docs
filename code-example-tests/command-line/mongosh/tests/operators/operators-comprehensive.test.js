const { execSync } = require("child_process");
const Expect = require("../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

jest.setTimeout(15000);

const dbName = "sample_mflix";
const movieTitle = "The Dark Knight";

describeWithSampleData("mongosh operators comprehensive tests", () => {

	const runCleanup = (cleanupCommands, errorContext) => {
		const mongoUri = process.env.CONNECTION_STRING;
		const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;
		try {
			execSync(command, { encoding: "utf8" });
		} catch (error) {
			console.error(`Failed to clean up ${errorContext}:`, error.message);
		}
	};

	// Pre-test cleanup to ensure a clean state
	beforeAll(() => {
		runCleanup(
			`db = db.getSiblingDB("${dbName}");
			db.movies.updateMany({ highestRated: true }, { $unset: { highestRated: "" } });
			db.movies.updateMany({ familyFriendly: true }, { $unset: { familyFriendly: "" } });
			db.movies.updateOne({ title: "${movieTitle}" }, { $unset: { label: "", status: "", "imdb.highlight": "" } });
			db.movies.updateOne({ title: "${movieTitle}" }, { $pull: { genres: { $in: ["Classic", "Modern Classic", "Award-Winning", "Acclaimed"] } } });`,
			"pre-test suite cleanup"
		);
	});

	// Post-test cleanup
	afterAll(() => {
		runCleanup(
			`db = db.getSiblingDB("${dbName}");
			db.movies.updateMany({ highestRated: true }, { $unset: { highestRated: "" } });
			db.movies.updateMany({ familyFriendly: true }, { $unset: { familyFriendly: "" } });
			db.movies.updateOne({ title: "${movieTitle}" }, { $unset: { label: "", status: "", "imdb.highlight": "" } });
			db.movies.updateOne({ title: "${movieTitle}" }, { $pull: { genres: { $in: ["Classic", "Modern Classic", "Award-Winning", "Acclaimed"] } } });`,
			"post-test suite cleanup"
		);
	});

	// --- $gt operator ---

	test("Should find movies where runtime is greater than 1000 minutes ($gt find)", async () => {
		await Expect
			.outputFromExampleFiles(["operators/gt/gt-find/gt-find.js"])
			.withDbName(dbName)
			.shouldMatch("operators/gt/gt-find/output.sh");
	});

	test("Should update movies where IMDb rating is greater than 9.5 ($gt update)", async () => {
		await Expect
			.outputFromExampleFiles(["operators/gt/gt-update/gt-update.js"])
			.withDbName(dbName)
			.shouldMatch("operators/gt/gt-update/output.sh");

		runCleanup(
			`db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ highestRated: true }, { $unset: { highestRated: "" } })`,
			"$gt highestRated field"
		);
	});

	// --- $gte operator ---

	test("Should find movies where runtime is greater than or equal to 720 minutes ($gte find)", async () => {
		await Expect
			.outputFromExampleFiles(["operators/gte/gte-find/gte-find.js"])
			.withDbName(dbName)
			.shouldMatch("operators/gte/gte-find/output.sh");
	});

	test("Should update movies where IMDb rating is greater than or equal to 9.5 ($gte update)", async () => {
		await Expect
			.outputFromExampleFiles(["operators/gte/gte-update/gte-update.js"])
			.withDbName(dbName)
			.shouldMatch("operators/gte/gte-update/output.sh");

		runCleanup(
			`db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ highestRated: true }, { $unset: { highestRated: "" } })`,
			"$gte highestRated field"
		);
	});

	// --- $in operator ---

	test("Should find movies where rated is G or TV-G ($in find)", async () => {
		await Expect
			.outputFromExampleFiles(["operators/in/in-find/in-find.js"])
			.withDbName(dbName)
			.shouldMatch("operators/in/in-find/output.sh");
	});

	test("Should update movies where rated is G or TV-G ($in update)", async () => {
		await Expect
			.outputFromExampleFiles(["operators/in/in-update/in-update.js"])
			.withDbName(dbName)
			.shouldMatch("operators/in/in-update/output.sh");

		runCleanup(
			`db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ familyFriendly: true }, { $unset: { familyFriendly: "" } })`,
			"$in familyFriendly field"
		);
	});

	test("Should find movies where plot begins with Alien or contains sci-fi ($in regex)", async () => {
		await Expect
			.outputFromExampleFiles(["operators/in/in-regex/in-regex.js"])
			.withDbName(dbName)
			.shouldMatch("operators/in/in-regex/output.sh");
	});

	// --- $set operator ---

	test("Should set top-level fields on a movie ($set top-level)", async () => {
		await Expect
			.outputFromExampleFiles(["operators/set/set-top-level-fields.js"])
			.withDbName(dbName)
			.shouldMatch("operators/set/set-top-level-fields-output.sh");

		runCleanup(
			`db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "${movieTitle}" }, { $unset: { label: "", status: "" } })`,
			"$set top-level fields"
		);
	});

	test("Should set embedded document fields using dot notation ($set embedded)", async () => {
		await Expect
			.outputFromExampleFiles(["operators/set/set-embedded-fields.js"])
			.withDbName(dbName)
			.shouldMatch("operators/set/set-embedded-fields-output.sh");

		runCleanup(
			`db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "${movieTitle}" }, { $unset: { "imdb.highlight": "" } })`,
			"$set embedded fields"
		);
	});

	test("Should set array elements by index ($set array)", async () => {
		let originalGenres = null;

		const saveOriginalGenres = () => {
			const mongoUri = process.env.CONNECTION_STRING;
			const fetchCmd = `db = db.getSiblingDB("${dbName}"); print(JSON.stringify(db.movies.findOne({ title: "${movieTitle}" }, { genres: 1 }).genres))`;
			const command = `mongosh "${mongoUri}" --quiet --eval '${fetchCmd}'`;
			try {
				const result = execSync(command, { encoding: "utf8" });
				originalGenres = JSON.parse(result.split(/\r?\n/).filter(Boolean).pop());
			} catch (error) {
				console.error("Failed to save original genres:", error.message);
			}
		};

		saveOriginalGenres();

		await Expect
			.outputFromExampleFiles(["operators/set/set-array-elements.js"])
			.withDbName(dbName)
			.shouldMatch("operators/set/set-array-elements-output.sh");

		if (originalGenres) {
			const genresJson = JSON.stringify(originalGenres);
			runCleanup(
				`db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "${movieTitle}" }, { $set: { genres: ${genresJson} } })`,
				"$set array elements"
			);
		}
	});

	// --- $unset operator ---

	test("Should unset fields from a movie ($unset)", async () => {
		await Expect
			.outputFromExampleFiles(["operators/unset/unset-fields-setup.js", "operators/unset/unset-fields.js"])
			.withDbName(dbName)
			.shouldMatch("operators/unset/unset-fields-output.sh");
	});

	// --- $push operator ---

	test("Should append a value to an array ($push single)", async () => {
		await Expect
			.outputFromExampleFiles(["operators/push/push-value.js"])
			.withDbName(dbName)
			.shouldMatch("operators/push/push-value-output.sh");

		runCleanup(
			`db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "${movieTitle}" }, { $pull: { genres: "Classic" } })`,
			"$push single value"
		);
	});

	test("Should append multiple values using $each ($push each)", async () => {
		await Expect
			.outputFromExampleFiles(["operators/push/push-each.js"])
			.withDbName(dbName)
			.shouldMatch("operators/push/push-each-output.sh");

		runCleanup(
			`db = db.getSiblingDB("${dbName}"); db.movies.updateOne({ title: "${movieTitle}" }, { $pull: { genres: { $in: ["Modern Classic", "Award-Winning"] } } })`,
			"$push each values"
		);
	});

	test("Should append a value to arrays in multiple documents ($push many)", async () => {
		await Expect
			.outputFromExampleFiles(["operators/push/push-many.js"])
			.withDbName(dbName)
			.shouldMatch("operators/push/push-many-output.sh");

		runCleanup(
			`db = db.getSiblingDB("${dbName}"); db.movies.updateMany({ "imdb.rating": { $gt: 9 } }, { $pull: { genres: "Acclaimed" } })`,
			"$push many"
		);
	});

}, dbName);
