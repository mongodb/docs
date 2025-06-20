import { readFileSync } from "fs";
import Path from "path";
import yaml from "yaml";
import {
  getTitleFromSnootyOpenApiSpecAst,
  snootyAstToOpenApiSpec,
} from "./snootyAstToOpenApiSpec";

const SRC_ROOT = Path.resolve(__dirname, "../../");

jest.setTimeout(30000);
import { SnootyPageEntry } from "./SnootyDataSource";
const textSpecPage: SnootyPageEntry = JSON.parse(
  readFileSync(
    Path.resolve(SRC_ROOT, "../testData/localOpenApiSpecPage.json"),
    {
      encoding: "utf-8",
    }
  )
);
const remoteSpecPage: SnootyPageEntry = JSON.parse(
  readFileSync(
    Path.resolve(SRC_ROOT, "../testData/remoteOpenApiSpecPage.json"),
    {
      encoding: "utf-8",
    }
  )
);

describe("snootyAstToOpenApiSpec()", () => {
  it("should return empty string for non-openapi node", async () => {
    const node = {
      type: "directive",
      name: "foo",
      children: [],
    };
    expect(await snootyAstToOpenApiSpec(node)).toBe("");
  });
  it("should return YAML string for openapi text node", async () => {
    const yamlString = yaml.parse(
      await snootyAstToOpenApiSpec(textSpecPage.data.ast)
    );
    const expected = yaml.parse(`openapi: 3.1.0
info:
  version: v1
  title: MongoDB Atlas Data API`);
    expect(yamlString).toMatchObject(expected);
  });
  it("should return YAML string for openapi remote node", async () => {
    const yamlString = await snootyAstToOpenApiSpec(remoteSpecPage.data.ast);
    const parsed = yaml.parse(yamlString);
    const expectedSample = {
      openapi: "3.0.1",
      servers: [{ url: "https://cloud.mongodb.com" }],
    };
    expect(parsed).toMatchObject(expectedSample);
  });
});

describe("getTitleFromSnootyOpenApiSpecAst()", () => {
  const title = getTitleFromSnootyOpenApiSpecAst(textSpecPage.data.ast);
  expect(title).toBe("Atlas App Services Data API");
});
