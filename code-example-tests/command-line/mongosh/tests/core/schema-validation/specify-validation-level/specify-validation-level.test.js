const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");

jest.setTimeout(10000);

const dbName = "test_validation_level";
const topic = "core/schema-validation/specify-validation-level";

describe("Validation level examples", () => {

  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;
    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop database '${dbName}':`, error.message);
    }
  });

  test("Should insert a valid document with strict validation level", async () => {
    await Expect
      .outputFromExampleFiles([
        `${topic}/seed-movies.js`,
        `${topic}/add-strict-validator.js`,
        `${topic}/insert-strict.js`
      ])
      .withDbName(dbName)
      .shouldMatch(`${topic}/insert-strict-output.sh`);
  });

  test("Should insert a valid document with moderate validation level", async () => {
    await Expect
      .outputFromExampleFiles([
        `${topic}/seed-movies.js`,
        `${topic}/add-moderate-validator.js`,
        `${topic}/insert-moderate.js`
      ])
      .withDbName(dbName)
      .shouldMatch(`${topic}/insert-moderate-output.sh`);
  });

  // The constraint validation level and prepareConstraintValidationLevel
  // require MongoDB 9.0 or later. Enable this test when a 9.0 test
  // cluster is available.
  test.skip("Should insert a valid document with constraint validation level", async () => {
    await Expect
      .outputFromExampleFiles([
        `${topic}/seed-movies.js`,
        `${topic}/add-strict-validator.js`,
        `${topic}/prepare-constraint-level.js`,
        `${topic}/set-constraint-level.js`,
        `${topic}/insert-constraint.js`
      ])
      .withDbName(dbName)
      .shouldMatch(`${topic}/insert-constraint-output.sh`);
  });

});
