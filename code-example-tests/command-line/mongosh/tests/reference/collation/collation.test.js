const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

const dbName = "sample_mflix";

describeWithSampleData("collation reference examples", () => {

	test("Should find movies with collation strength 1 (find-with-collation)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/collation/find-with-collation.js"])
			.withDbName(dbName)
			.shouldMatch("reference/collation/find-with-collation-output.sh");
	});

}, dbName);
