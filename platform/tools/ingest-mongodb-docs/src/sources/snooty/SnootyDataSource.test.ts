import nock from "nock";
import { Readable } from "stream";
import fs from "fs";
import Path from "path";
import JSONL from "jsonl-parse-stringify";
import {
  SnootyNode,
  SnootyProjectConfig,
  handlePage,
  makeSnootyDataSource,
} from "./SnootyDataSource";
import { snootyAstToMd } from "./snootyAstToMd";

const SRC_ROOT = Path.resolve(__dirname, "../../");

jest.setTimeout(15000);

describe("SnootyDataSource", () => {
  const project: SnootyProjectConfig = {
    type: "snooty",
    name: "docs",
    tags: ["docs", "manual"],
    version: "version_name",
    branches: [
      {
        gitBranchName: "v6.0",
        label: "v6.0 (current)",
        active: true,
        fullUrl: "https://mongodb.com/docs/v6.0/",
        isStableBranch: true,
      },
    ],
  };
  const snootyDataApiBaseUrl = "https://snooty-data-api.mongodb.com/prod/";
  describe("makeSnootyDataSource()", () => {
    const sampleDataPath = Path.resolve(
      SRC_ROOT,
      "../testData/snootySampleData.jsonl"
    );
    const sampleMetadataPath = Path.resolve(
      SRC_ROOT,
      "../testData/snootySampleMetadata.json"
    );
    const sampleSnootyMetadata = JSON.parse(
      fs.readFileSync(sampleMetadataPath, "utf-8")
    );
    const baseMock = nock(snootyDataApiBaseUrl);
    beforeEach(() => {
      baseMock
        .get(`/projects/${project.name}/v6.0/documents`)
        .reply(200, () => {
          return fs.createReadStream(sampleDataPath);
        });
      baseMock.get("/projects").reply(200, sampleSnootyMetadata);
    });
    afterEach(() => {
      nock.cleanAll();
    });
    it("successfully loads pages for active branches", async () => {
      const source = await makeSnootyDataSource({
        name: `snooty-test`,
        project,
        snootyDataApiBaseUrl,
      });

      const pages = await source.fetchPages();
      expect(pages).toHaveLength(11);
      const astPages = JSONL.parse<{ type: string; data: { ast: SnootyNode } }>(
        fs.readFileSync(sampleDataPath, "utf8")
      );
      const pageAst = astPages.filter(
        (entry: { type: string }) => entry.type === "page"
      )[1]?.data.ast;
      expect(pageAst).toBeDefined();
      const firstPageText = snootyAstToMd(pageAst);
      expect(pages[1]).toMatchObject({
        format: "md",
        sourceName: "snooty-test",
        metadata: {
          tags: ["docs", "manual"],
        },
        url: "https://mongodb.com/docs/v6.0/administration/",
        body: firstPageText,
      });
    });
    it("should skip inactive branches", async () => {
      const inactiveProject: SnootyProjectConfig = {
        ...project,
        branches: [
          {
            gitBranchName: "v5.0",
            label: "v5.0",
            active: false,
            fullUrl: "https://mongodb.com/docs/v5.0/",
            isStableBranch: false,
          },
        ],
      };

      const source = makeSnootyDataSource({
        name: "test-source",
        project: inactiveProject,
        snootyDataApiBaseUrl: "https://snooty-api.example.com",
      });

      const pages = await source.fetchPages();
      expect(pages).toHaveLength(0);
    });
    it("removes 'index' from page_id", async () => {
      const source = await makeSnootyDataSource({
        name: "snooty-docs",
        project: project,
        snootyDataApiBaseUrl,
      });
      const pages = await source.fetchPages();
      expect(pages.length).toBe(11);
      expect(pages[0]).toMatchObject({
        format: "md",
        sourceName: "snooty-docs",
        metadata: {
          tags: ["docs", "manual"],
        },
        url: "https://mongodb.com/docs/v6.0/",
      });

      // This one has index at the end of a subpath, so it should not be
      // stripped because only index at the root of a project has special
      // handling in Snooty
      expect(pages[2]).toMatchObject({
        format: "md",
        sourceName: "snooty-docs",
        metadata: {
          tags: ["docs", "manual"],
          version: {
            isCurrent: true,
            label: "v6.0 (current)",
          },
        },
        url: "https://mongodb.com/docs/v6.0/administration/analyzing-mongodb-performance/index/",
      });

      // This has index in the middle of the page_id that should not be stripped
      expect(pages[3]).toMatchObject({
        format: "md",
        sourceName: "snooty-docs",
        metadata: {
          tags: ["docs", "manual"],
          version: {
            isCurrent: true,
            label: "v6.0 (current)",
          },
        },
        url: "https://mongodb.com/docs/v6.0/administration/index/backup-sharded-clusters/",
      });

      // This has index but part of a wider phrase so should not be stripped
      expect(pages[4]).toMatchObject({
        format: "md",
        sourceName: "snooty-docs",
        metadata: {
          tags: ["docs", "manual"],
          version: {
            isCurrent: true,
            label: "v6.0 (current)",
          },
        },
        url: "https://mongodb.com/docs/v6.0/administration/change-streams-production-recommendations/how-to-index/",
      });
    });

    it("adds metadata to page", async () => {
      const source = await makeSnootyDataSource({
        name: `snooty-test`,
        project,
        snootyDataApiBaseUrl,
      });
      const pages = await source.fetchPages();
      for (const page of pages) {
        expect(page.metadata?.siteTitle).toBeDefined();
        expect(page.metadata?.version).toStrictEqual({
          label: "v6.0 (current)",
          isCurrent: true,
        });
      }
    });

    it("handles pages marked 'deleted'", async () => {
      // Use normal sample data (no deletes)
      const source = await makeSnootyDataSource({
        name: `snooty-test`,
        project,
        snootyDataApiBaseUrl,
      });
      let pages = await source.fetchPages();
      expect(
        pages.find((page) =>
          page.url.includes("administration/install-enterprise")
        )
      ).toBeDefined();

      // Hot swap the mocked backend's data source. The sample data now has one marked deleted.
      nock.cleanAll();
      baseMock
        .get(`/projects/${project.name}/v6.0/documents`)
        .reply(200, () => {
          return fs.createReadStream(
            Path.resolve(
              SRC_ROOT,
              "../testData/snootySampleDataWithDeleted.jsonl"
            )
          );
        });

      pages = await source.fetchPages();
      expect(
        pages.find((page) =>
          page.url.includes("administration/install-enterprise")
        )
      ).toBeUndefined();
    });

    it("skips noindex page", async () => {
      const mockUrl = "https://example.com";
      const noIndexMock = nock(mockUrl);
      // Use normal sample data (no deletes)
      const source = await makeSnootyDataSource({
        name: `snooty-test`,
        project,
        snootyDataApiBaseUrl: mockUrl,
      });
      noIndexMock
        .get(`/projects/${project.name}/v6.0/documents`)
        .reply(200, () => {
          const noIndexAst = jsonLify(
            Path.resolve(SRC_ROOT, "../testData/noindex.json")
          );

          const astWithIndex = jsonLify(
            Path.resolve(SRC_ROOT, "../testData/samplePage.json")
          );

          const stream = new Readable();
          stream.push(noIndexAst + "\n");
          stream.push(astWithIndex + "\n");
          stream.push(null); // End the stream
          return stream;
        });

      const pages = await source.fetchPages();
      // only captures the astWithIndex page, not the noIndexAst page
      expect(pages).toHaveLength(1);
      noIndexMock.done();
    });
  });
});

function jsonLify(path: string) {
  return JSON.stringify(JSON.parse(fs.readFileSync(path, "utf-8")));
}
describe("handlePage()", () => {
  it("should correctly parse openapi spec page", async () => {
    const apiSpecPage = JSON.parse(
      fs.readFileSync(
        Path.resolve(SRC_ROOT, "../testData/localOpenApiSpecPage.json"),
        "utf-8"
      )
    );
    const result = await handlePage(apiSpecPage.data, {
      sourceName: "sample-source",
      baseUrl: "https://example.com",
      tags: ["a"],
      version: { label: "1.0", isCurrent: true },
    });
    expect(result).toMatchObject({
      format: "openapi-yaml",
      title: "Atlas App Services Data API",
      metadata: {
        tags: ["a", "openapi"],
        version: { label: "1.0", isCurrent: true },
      },
    });
  });
  it("should correctly parse standard page", async () => {
    const nonApiSpecPage = JSON.parse(
      fs.readFileSync(
        Path.resolve(SRC_ROOT, "../testData/samplePage.json"),
        "utf-8"
      )
    );
    const result = await handlePage(nonApiSpecPage.data, {
      sourceName: "sample-source",
      baseUrl: "https://example.com",
      tags: ["a"],
      version: { label: "1.0", isCurrent: true },
    });
    expect(result).toMatchObject({
      format: "md",
      title: "$merge (aggregation)",
      metadata: {
        tags: ["a"],
        version: { label: "1.0", isCurrent: true },
      },
    });
    expect(result?.body).toContain("# $merge (aggregation)");
  });
});
