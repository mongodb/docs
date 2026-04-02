const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

const dbName = "sample_mflix";

describeWithSampleData("find command examples", () => {

	test("Should override read concern (override-read-concern)", async () => {
		await Expect
			.outputFromExampleFiles(["database-commands/find/override-read-concern.js"])
			.withDbName(dbName)
			.withIgnoredFields("$clusterTime", "operationTime")
			.shouldMatch("database-commands/find/override-read-concern.sh");
	});

	test("Should find with read concern (read-concern-find)", async () => {
		await Expect
			.outputFromExampleFiles(["database-commands/find/read-concern-find.js"])
			.withDbName(dbName)
			.shouldMatch("database-commands/find/read-concern-find-output.sh");
	});

	test("Should find with collation (specify-collation)", async () => {
		await Expect
			.outputFromExampleFiles(["database-commands/find/specify-collation.js"])
			.withDbName(dbName)
			.shouldMatch("database-commands/find/specify-collation-output.sh");
	});

	test("Should find with sort and limit (specify-sort-and-limit)", async () => {
		await Expect
			.outputFromExampleFiles(["database-commands/find/specify-sort-and-limit.js"])
			.withDbName(dbName)
			.shouldMatch("database-commands/find/specify-sort-and-limit-output.sh");
	});

	test("Should find with let variables (use-let)", async () => {
		await Expect
			.outputFromExampleFiles(["database-commands/find/use-let.js"])
			.withDbName(dbName)
			.shouldMatch("database-commands/find/use-let-output.sh");
	});
}, dbName);
