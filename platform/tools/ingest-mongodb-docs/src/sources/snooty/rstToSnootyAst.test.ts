import fs from "fs";
import * as Path from "path";
import { rstToSnootyAst } from "./rstToSnootyAst";
import { snootyAstToMd } from "./snootyAstToMd";

const SRC_ROOT = Path.resolve(__dirname, "../../");

describe("rstToSnootyAst", () => {
  it("matches real Snooty AST", () => {
    const sampleRealSnootyAst = JSON.parse(
      fs.readFileSync(
        Path.resolve(SRC_ROOT, "../testData/samplePageWithCodeExamples.json"),
        "utf-8"
      )
    ).data.ast;

    const sampleRst = fs.readFileSync(
      Path.resolve(SRC_ROOT, "../testData/samplePageWithCodeExamples.rst"),
      "utf-8"
    );

    const testAst = rstToSnootyAst(sampleRst);

    const mdFromHack = snootyAstToMd(testAst);
    const mdFromReal = snootyAstToMd(sampleRealSnootyAst);

    // Subtle differences in the parsing make for some superficial differences
    // in spaces between the 'real' Snooty API. Strictly for the purposes of
    // comparing two strings
    const stripSlightlyDifferentWhitespace = (s: string) => {
      return s
        .split("\n")
        .map((s) => {
          return s.replaceAll(/ *$/g, ""); // From end of line
        })
        .filter((s) => s !== "")
        .join("\n");
    };

    expect(stripSlightlyDifferentWhitespace(mdFromHack)).toStrictEqual(
      stripSlightlyDifferentWhitespace(mdFromReal)
    );
  });
});
