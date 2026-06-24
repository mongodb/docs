const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(15000);

const mflixDb = "sample_mflix";
const restaurantsDb = "sample_restaurants";

describeWithSampleData("cursor.sort examples (sort consistency)", () => {

	test("Should sort restaurants by borough without tiebreaker (sort-inconsistent)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/sort/sort-inconsistent.js"])
			.withDbName(restaurantsDb)
			.shouldResemble("reference/sort/sort-inconsistent-output.sh")
			.withSchema({
				count: 5,
				requiredFields: ["name", "borough"]
			});
	});

	test("Should sort restaurants by borough with _id tiebreaker (sort-consistent)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/sort/sort-consistent.js"])
			.withDbName(restaurantsDb)
			.shouldMatch("reference/sort/sort-consistent-output.sh");
	});

}, restaurantsDb);

describeWithSampleData("cursor.sort examples (sample_mflix)", () => {

	test("Should sort movies by year descending then title ascending (sort-ascending-descending)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/sort/sort-ascending-descending.js"])
			.withDbName(mflixDb)
			.withOrderedSort()
			.shouldMatch("reference/sort/sort-ascending-descending-output.sh");
	});

	test("Should sort movies by genres array ascending (sort-array-ascending)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/sort/sort-array-ascending.js"])
			.withDbName(mflixDb)
			.shouldResemble("reference/sort/sort-array-ascending-output.sh")
			.withSchema({
				count: 3,
				requiredFields: ["title", "genres"]
			});
	});

	test("Should sort movies by genres array descending (sort-array-descending)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/sort/sort-array-descending.js"])
			.withDbName(mflixDb)
			.shouldResemble("reference/sort/sort-array-descending-output.sh")
			.withSchema({
				count: 3,
				requiredFields: ["title", "genres"]
			});
	});

	test("Should filter and sort movies by genres array (sort-array-filter)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/sort/sort-array-filter.js"])
			.withDbName(mflixDb)
			.shouldResemble("reference/sort/sort-array-filter-output.sh")
			.withSchema({
				count: 3,
				requiredFields: ["title", "genres"]
			});
	});

	test("Should return movies without sort order (sort-no-order)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/sort/sort-no-order.js"])
			.withDbName(mflixDb)
			.shouldResemble("reference/sort/sort-no-order-output.sh")
			.withSchema({
				count: 3,
				requiredFields: ["title"]
			});
	});

	test("Should sort movies by runtime descending (sort-runtime-desc)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/sort/sort-runtime-desc.js"])
			.withDbName(mflixDb)
			.withOrderedSort()
			.shouldMatch("reference/sort/sort-runtime-desc-output.sh");
	});

	test("Should sort movies by imdb.rating ascending and title (sort-imdb-rating)", async () => {
		await Expect
			.outputFromExampleFiles(["reference/sort/sort-imdb-rating.js"])
			.withDbName(mflixDb)
			.withOrderedSort()
			.shouldMatch("reference/sort/sort-imdb-rating-output.sh");
	});

}, mflixDb);
