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
import { uploadManifest } from "../../src/searchManifests/uploadToAtlas/uploadManifest";
import { closeSearchDb } from "../../src/util/databaseConnection/searchClusterConnector";
import type { AllContentData } from "../../src/contentMetadata/processContentMetadata";

const makeArgs = () => {
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

  return {
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
  } as unknown as Parameters<typeof handleSearchManifests>[0];
};

describe("handleSearchManifests", () => {
  const originalDocsProject = process.env.DOCS_PROJECT;

  afterEach(() => {
    jest.clearAllMocks();
    if (originalDocsProject === undefined) {
      delete process.env.DOCS_PROJECT;
    } else {
      process.env.DOCS_PROJECT = originalDocsProject;
    }
  });

  it("uses the sole catalog version for an unversioned project", async () => {
    process.env.DOCS_PROJECT = "atlas";

    await handleSearchManifests(makeArgs());

    expect(generateManifest).toHaveBeenCalledWith({
      url: "https://mongodb.com/docs/atlas/",
      includeInGlobalSearch: true,
    });
    expect(closeSearchDb).toHaveBeenCalledTimes(1);
  });

  it("closes the search DB only after the Atlas upload finishes", async () => {
    process.env.DOCS_PROJECT = "atlas";
    const events: string[] = [];
    let finishUpload!: () => void;
    let uploadStarted!: () => void;
    const started = new Promise<void>((resolve) => {
      uploadStarted = resolve;
    });
    const gate = new Promise<void>((resolve) => {
      finishUpload = resolve;
    });

    (uploadManifest as jest.Mock).mockImplementationOnce(async () => {
      events.push("upload:start");
      uploadStarted();
      await gate;
      events.push("upload:end");
      return { acknowledged: true };
    });
    (closeSearchDb as jest.Mock).mockImplementationOnce(async () => {
      events.push("close");
    });

    const done = handleSearchManifests(makeArgs());
    await started;
    await new Promise((resolve) => setImmediate(resolve));
    expect(events).not.toContain("close");

    finishUpload();
    await done;

    expect(events).toEqual(["upload:start", "upload:end", "close"]);
  });

  it("rejects an unset DOCS_PROJECT instead of skipping every bundle", async () => {
    delete process.env.DOCS_PROJECT;

    await expect(handleSearchManifests(makeArgs())).rejects.toThrow(
      "DOCS_PROJECT is not set",
    );
    expect(generateManifest).not.toHaveBeenCalled();
  });

  it("rejects a DOCS_PROJECT that is a path", async () => {
    process.env.DOCS_PROJECT = "manual/manual";

    await expect(handleSearchManifests(makeArgs())).rejects.toThrow(
      'not a path: "manual/manual"',
    );
    expect(generateManifest).not.toHaveBeenCalled();
  });

  it("rejects a DOCS_PROJECT that matches no content project", async () => {
    process.env.DOCS_PROJECT = "atlas-typo";

    await expect(handleSearchManifests(makeArgs())).rejects.toThrow(
      'DOCS_PROJECT "atlas-typo" matches none of the 1 content project directories',
    );
    expect(generateManifest).not.toHaveBeenCalled();
  });
});
