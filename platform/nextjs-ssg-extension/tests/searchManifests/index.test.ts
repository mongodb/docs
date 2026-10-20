jest.mock(
  "../../src/searchManifests/uploadToAtlas/getSearchProperties",
  () => ({
    getSearchProperties: jest.fn().mockResolvedValue({
      active: true,
      url: "https://mongodb.com/docs/atlas/",
      searchProperty: "atlas-main",
      includeInGlobalSearch: true,
    }),
  })
);
jest.mock("../../src/searchManifests/generateManifest/index", () => ({
  generateManifest: jest.fn().mockResolvedValue({
    export: jest.fn().mockReturnValue("{}"),
  }),
}));
jest.mock("../../src/searchManifests/uploadToAtlas/uploadManifest", () => ({
  uploadManifest: jest.fn().mockResolvedValue({ acknowledged: true }),
}));
jest.mock("../../src/searchManifests/uploadToAtlas/deleteStale", () => ({
  deleteStaleProperties: jest.fn(),
}));
jest.mock("../../src/util/databaseConnection/searchClusterConnector", () => ({
  closeSearchDb: jest.fn().mockResolvedValue(undefined),
}));
jest.mock("../../src/s3Connection/s3connector", () => ({
  upload: jest.fn().mockResolvedValue({
    $metadata: { httpStatusCode: 200 },
  }),
}));
jest.mock("../../src/paths", () => ({
  getRepoPaths: () => ({ contentDir: "/content" }),
}));

import { handleSearchManifests } from "../../src/searchManifests/index";
import { generateManifest } from "../../src/searchManifests/generateManifest/index";
import { closeSearchDb } from "../../src/util/databaseConnection/searchClusterConnector";
import type { AllContentData } from "../../src/contentMetadata/processContentMetadata";

describe("handleSearchManifests", () => {
  const originalDocsProject = process.env.DOCS_PROJECT;

  afterEach(() => {
    jest.clearAllMocks();
    process.env.DOCS_PROJECT = originalDocsProject;
  });

  it("uses the sole catalog version for an unversioned project", async () => {
    process.env.DOCS_PROJECT = "atlas";
    const allContentData = {
      docsetsByProject: {
        "cloud-docs": {
          project: "cloud-docs",
          displayName: "MongoDB Atlas",
          prefix: "docs/atlas",
          internalOnly: false,
          search: { categoryTitle: "Atlas", categoryName: "atlas" },
          versions: [
            {
              versionName: "main",
              active: true,
              versionSelectorLabel: "main",
              stable: true,
              noIndexing: false,
            },
          ],
        },
      },
      pathsToBuild: ["atlas"],
      docsPaths: {
        atlas: {
          projectName: "cloud-docs",
          projectDirName: "atlas",
          versionName: "",
          active: true,
          changed: true,
          shouldRebuild: true,
          fullPath: "/content/atlas",
        },
      },
    } satisfies AllContentData;

    await handleSearchManifests({
      allContentData,
      run: {
        command: jest.fn().mockResolvedValue(undefined),
      },
      dbEnvVars: {
        ATLAS_SEARCH_URI: "mongodb://localhost",
        DOCUMENTS_COLLECTION: "documents",
        S3_SEARCH_BUCKET: "search-bucket",
      },
      configEnvironment: {
        ENV: "dotcomprd",
        SEARCH_DB_NAME: "search",
      },
    } as unknown as Parameters<typeof handleSearchManifests>[0]);

    expect(generateManifest).toHaveBeenCalledWith({
      url: "https://mongodb.com/docs/atlas/",
      includeInGlobalSearch: true,
    });
    expect(closeSearchDb).toHaveBeenCalledTimes(1);
  });
});
