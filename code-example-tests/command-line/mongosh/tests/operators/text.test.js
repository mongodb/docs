const { execSync } = require("child_process");
const Expect = require("../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

jest.setTimeout(10000);

const mflixDbName = "sample_mflix";

const runCleanup = (cleanupCommands, errorContext) => {
  const mongoUri = process.env.CONNECTION_STRING;
  const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;
  try {
    execSync(command, { encoding: "utf8" });
  } catch (error) {
    console.error(`Failed to clean up ${errorContext}:`, error.message);
  }
};

describeWithSampleData("$text operator - sample_mflix queries", () => {

  test("Should find movies by single search term", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-search-single-word.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/text/text-search-single-word-output.sh");
  });

  test("Should find movies matching any of multiple search terms", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-search-multi-term.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/text/text-search-multi-term-output.sh");
  });

  test("Should find movies matching an exact phrase", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-search-exact-phrase.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/text/text-search-exact-phrase-output.sh");
  });

  test("Should find movies matching a logical OR of exact phrases", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-search-exact-phrase-or.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/text/text-search-exact-phrase-or-output.sh");
  });

  test("Should find movies excluding a negated term", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-search-negation.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/text/text-search-negation-output.sh");
  });

  test("Should return relevance score with textScore", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-search-score.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/text/text-search-score-output.sh");
  });

  test("Should return top 2 matching documents sorted by score", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-search-top-two.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/text/text-search-top-two-output.sh");
  });

  test("Should combine text query with year sort and score projection", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-search-sort-combined.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/text/text-search-sort-combined-output.sh");
  });

}, mflixDbName);

describeWithSampleData("$text operator - index creation", () => {
  beforeEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    execSync(
      `mongosh "${mongoUri}" --quiet --eval ` +
      `'db = db.getSiblingDB("${mflixDbName}"); ` +
      `db.movies.dropIndex("cast_text_fullplot_text_genres_text_title_text");'`,
      { encoding: "utf8" }
    );
  });

  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    try {
      execSync(
        `mongosh "${mongoUri}" --quiet --eval ` +
        `'db = db.getSiblingDB("${mflixDbName}"); ` +
        `try { db.movies.dropIndex("title_text_fullplot_text"); } catch(e) {} ` +
        `db.movies.createIndex({ cast: "text", fullplot: "text", genres: "text", title: "text" });'`,
        { encoding: "utf8" }
      );
    } catch (error) {
      console.error("Failed to restore text index:", error.message);
    }
  });

  test("Should create a text index on title and fullplot", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-create-index.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/text/text-create-index-output.sh");
  });

}, mflixDbName);

describe("$text operator - articles collection (custom data)", () => {
  const dbName = "text_search_test";

  afterEach(() => {
    runCleanup(
      `db = db.getSiblingDB("${dbName}"); db.dropDatabase();`,
      dbName
    );
  });

  test("Should create a text index on the articles collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-articles-create-index.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/text/text-articles-create-index-output.sh");
  });

  test("Should insert articles documents", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-articles-insert-data.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/text/text-articles-insert-data-output.sh");
  });

  test("Should find articles using a specific language", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-articles-setup.js",
        "operators/text/text-search-language.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/text/text-search-language-output.sh");
  });

  test("Should find articles with case and diacritic insensitivity", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-articles-setup.js",
        "operators/text/text-search-case-diacritic-insensitive.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/text/text-search-case-diacritic-insensitive-output.sh");
  });

  test("Should find articles with case-sensitive term search", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-articles-setup.js",
        "operators/text/text-search-case-sensitive-term.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/text/text-search-case-sensitive-term-output.sh");
  });

  test("Should find articles with case-sensitive exact string search", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-articles-setup.js",
        "operators/text/text-search-case-sensitive-exact.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/text/text-search-case-sensitive-exact-output.sh");
  });

  test("Should find articles with case-sensitive negated term", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-articles-setup.js",
        "operators/text/text-search-case-sensitive-negated.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/text/text-search-case-sensitive-negated-output.sh");
  });

  test("Should find articles with diacritic-sensitive term search", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-articles-setup.js",
        "operators/text/text-search-diacritic-sensitive-term.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/text/text-search-diacritic-sensitive-term-output.sh");
  });

  test("Should find articles with diacritic-sensitive negated term", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/text/text-articles-setup.js",
        "operators/text/text-search-diacritic-sensitive-negated.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/text/text-search-diacritic-sensitive-negated-output.sh");
  });
});
