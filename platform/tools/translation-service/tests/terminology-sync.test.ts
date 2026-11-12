import { describe, expect, it } from "@jest/globals";
import {
  syncTerminology,
  terminologyDescription,
  type TerminologyClient,
  type TerminologyView,
} from "../src/terminology-sync.js";

function fakeClient(state: {
  existing?: TerminologyView;
  importResult?: TerminologyView;
}): { client: TerminologyClient; imports: Array<{ Name: string; Description: string }> } {
  const imports: Array<{ Name: string; Description: string }> = [];
  const client: TerminologyClient = {
    async getTerminology() {
      if (state.existing === undefined) {
        throw Object.assign(new Error("not found"), {
          name: "ResourceNotFoundException",
        });
      }
      return state.existing;
    },
    async importTerminology(input) {
      imports.push({ Name: input.Name, Description: input.Description });
      return state.importResult ?? {};
    },
  };
  return { client, imports };
}

const base = {
  name: "aws-translate-glossary",
  csv: "en,es\nshard,partición\n",
  identity: "abc123def456",
  expectedTermCount: 1,
};

describe("syncTerminology", () => {
  it("imports when the terminology does not exist yet", async () => {
    const { client, imports } = fakeClient({
      importResult: { termCount: 1, skippedTermCount: 0 },
    });
    const report = await syncTerminology({ ...base, client });
    expect(imports).toEqual([
      { Name: "aws-translate-glossary", Description: terminologyDescription("abc123def456", 1) },
    ]);
    expect(report.outcome).toEqual({
      action: "created",
      name: "aws-translate-glossary",
      termCount: 1,
    });
    expect(report.skippedTermCount).toBe(0);
  });

  it("skips the import when the stored description matches", async () => {
    const { client, imports } = fakeClient({
      existing: {
        description: terminologyDescription("abc123def456", 1),
        termCount: 1,
      },
    });
    const report = await syncTerminology({ ...base, client });
    expect(imports).toEqual([]);
    expect(report.outcome).toEqual({ action: "up-to-date", name: "aws-translate-glossary" });
  });

  it("overwrites with a propagation warning when the identity differs", async () => {
    const { client, imports } = fakeClient({
      existing: { description: terminologyDescription("olddifferent1", 1), termCount: 1 },
      importResult: { termCount: 1, skippedTermCount: 0 },
    });
    const report = await syncTerminology({ ...base, client });
    expect(imports.length).toBe(1);
    expect(report.outcome.action).toBe("overwritten");
    expect((report.outcome as { propagationWarning: string }).propagationWarning).toMatch(
      /10 minutes/,
    );
  });

  it("reports AWS-skipped terms without throwing, surfacing the warnings file", async () => {
    const { client } = fakeClient({
      importResult: {
        termCount: 0,
        skippedTermCount: 1,
        auxiliaryDataLocation: "https://s3.example/warnings.csv?sig=1",
      },
    });
    const report = await syncTerminology({ ...base, client });
    expect(report.skippedTermCount).toBe(1);
    expect(report.auxiliaryDataLocation).toBe("https://s3.example/warnings.csv?sig=1");
  });

  it("throws when the count mismatches with nothing skipped to explain it", async () => {
    const { client } = fakeClient({
      importResult: { termCount: 0, skippedTermCount: 0 },
    });
    await expect(syncTerminology({ ...base, client })).rejects.toThrow(
      /stored 0 terms but the glossary built 1/,
    );
  });

  it("rethrows non-ResourceNotFoundException errors from getTerminology", async () => {
    const client: TerminologyClient = {
      async getTerminology() {
        throw Object.assign(new Error("boom"), { name: "TooManyRequestsException" });
      },
      async importTerminology() {
        return {};
      },
    };
    await expect(syncTerminology({ ...base, client })).rejects.toThrow("boom");
  });
});

describe("terminologyDescription", () => {
  it("stays within the AWS 256-character Description limit", () => {
    expect(terminologyDescription("abc123def456", 714).length).toBeLessThanOrEqual(256);
  });
});
