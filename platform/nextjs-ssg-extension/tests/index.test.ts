type Handler = (args: unknown) => Promise<void>;

jest.mock("../src/util/extension", () => {
  class MockExtension {
    static handlers: Record<string, Handler> = {};
    addBuildEventHandler(type: string, fn: Handler) {
      MockExtension.handlers[type] = fn;
    }
  }
  return { Extension: MockExtension, envVarToBool: () => true };
});
jest.mock("../src/searchManifests/index", () => ({
  handleSearchManifests: jest.fn().mockResolvedValue(undefined),
}));
jest.mock("../src/offline-docs/index", () => ({
  handleOfflineDownloads: jest.fn().mockResolvedValue(undefined),
}));
jest.mock("../src/prepare", () => ({
  createAllContentData: () => ({
    docsetsByProject: {},
    pathsToBuild: [],
    docsPaths: {},
  }),
  prepare: jest.fn(),
}));
jest.mock("../src/llms-txt/index", () => ({
  handleLlmsTxt: jest.fn().mockResolvedValue(undefined),
  handleRootLlmsTxt: jest.fn().mockResolvedValue(undefined),
}));
jest.mock("../src/github/processFileChanges", () => ({
  getFileChanges: jest.fn().mockResolvedValue([]),
}));
jest.mock("../src/util/diskMetrics", () => ({
  logDiskMetrics: jest.fn().mockResolvedValue(undefined),
}));

import { Extension } from "../src/util/extension";
import { handleOfflineDownloads } from "../src/offline-docs/index";
import { logDiskMetrics } from "../src/util/diskMetrics";
import "../src/index";

const onSuccess = () =>
  (Extension as unknown as { handlers: Record<string, Handler> }).handlers
    .onSuccess({
      netlifyConfig: { build: { environment: { ENV: "dotcomprd" } } },
      utils: { run: { command: jest.fn() }, git: { modifiedFiles: [] } },
      dbEnvVars: {},
    });

describe("onSuccess", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("logs and finishes when the offline docs build throws", async () => {
    (handleOfflineDownloads as jest.Mock).mockRejectedValueOnce(
      new Error("S3_OFFLINE_BUCKET is not set."),
    );
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    await expect(onSuccess()).resolves.toBeUndefined();

    expect(consoleError).toHaveBeenCalledWith(
      "[offline-docs] Failed to build offline docs:",
      expect.any(Error),
    );
    expect(logDiskMetrics).toHaveBeenCalledWith(
      "onSuccess:end",
      expect.any(String),
    );
  });
});
