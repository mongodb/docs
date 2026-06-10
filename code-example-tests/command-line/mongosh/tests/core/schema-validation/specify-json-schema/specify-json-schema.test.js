const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");

jest.setTimeout(10000);

const dbName = "test_json_schema";
const topic = "core/schema-validation/specify-json-schema";

describe("JSON Schema validation examples", () => {

  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;
    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop database '${dbName}':`, error.message);
    }
  });

  test("Should insert a valid document and retrieve it from a validated collection", async () => {
    await Expect
      .outputFromExampleFiles([
        `${topic}/create-validated-collection.js`,
        `${topic}/insert-valid-document.js`,
        `${topic}/find-students.js`
      ])
      .withDbName(dbName)
      .shouldMatch(`${topic}/find-students-output.sh`);
  });

});
