import { strict as assert } from "assert";
import {
  GetSnootyProjectsResponse,
  makeSnootyProjectsInfo,
  overrideCurrentVersion,
  prepareSnootySources,
} from "./SnootyProjectsInfo";
import { Page } from "../../pageStore/Page";

const snootyDataApiBaseUrl = "https://snooty-data-api.mongodb.com/prod/";

describe("SnootyProjectsInfo", () => {
  let projectsInfo:
    | Awaited<ReturnType<typeof makeSnootyProjectsInfo>>
    | undefined;
  beforeAll(async () => {
    projectsInfo = await makeSnootyProjectsInfo({
      snootyDataApiBaseUrl,
    });
  });
  afterAll(() => {
    projectsInfo = undefined;
  });

  it("corrects any string 'true' instead of boolean", async () => {
    // First let's check whether the original data had some errors
    const response = await fetch(new URL("projects", snootyDataApiBaseUrl));
    const { data }: GetSnootyProjectsResponse = await response.json();
    const findBadBoolBranches = (theData?: typeof data) =>
      theData?.find(({ branches }) => {
        return (
          branches.find(({ active }) => (active as unknown) === "true") !==
          undefined
        );
      });

    const branch = data[0].branches[0];

    // Check implementation of findBadBoolBranches
    expect(
      findBadBoolBranches([
        {
          project: "x",
          repoName: "x",
          branches: [
            {
              active: "true" as unknown as boolean,
            } as unknown as typeof branch,
          ],
        },
      ])
    ).toBeDefined();
    expect(
      findBadBoolBranches([
        {
          project: "x",
          repoName: "x",
          branches: [
            {
              active: true,
            } as unknown as typeof branch,
          ],
        },
      ])
    ).toBeUndefined();

    if (findBadBoolBranches(data) !== undefined) {
      console.log("Found bad bools in Snooty Data API response.");
    }
    expect(findBadBoolBranches(projectsInfo?._data)).toBeUndefined();
  });

  it("gets all branches for a project", async () => {
    const branches = await projectsInfo?.getAllBranches({
      projectName: "docs",
    });
    expect(branches).toBeDefined();
    assert(branches !== undefined);
    expect(branches.length).toBeGreaterThan(0);
    const branch = branches[0];
    expect(branch).toHaveProperty("active");
    expect(branch).toHaveProperty("fullUrl");
    expect(branch).toHaveProperty("label");
    expect(branch).toHaveProperty("isStableBranch");
    const stableBranch = branches.find((branch) => branch.isStableBranch);
    expect(stableBranch).toBeDefined();
  });

  describe("prepareSnootySources", () => {
    it("returns a list of Snooty data sources", async () => {
      const projects = [
        {
          type: "snooty" as const,
          name: "spark-connector",
          tags: ["docs", "spark-connector", "spark", "apache-spark"],
          productName: "MongoDB Spark Connector",
        },
      ];
      const snootySources = await prepareSnootySources({
        projects,
        snootyDataApiBaseUrl,
      });
      assert(snootySources !== undefined);
      expect(snootySources.length).toBe(1);
      const snootySource = snootySources[0];
      expect(snootySource).toHaveProperty("name");
      expect(snootySource).toHaveProperty("fetchPages");
      expect(snootySource.name).toBe("spark-connector");
      const pages = await snootySource.fetchPages();
      assert(pages !== undefined);
      expect(pages.length).toBeGreaterThan(0);
      const page = pages[0];
      expect(page.url).toBeDefined();
      expect(page.body).toBeDefined();
      expect(page.title).toBeDefined();
      expect(page.metadata?.version).toBeDefined();
    });
    it("allows current version override", async () => {
      const project = {
        type: "snooty" as const,
        name: "spark-connector",
        tags: ["docs", "spark-connector", "spark", "apache-spark"],
        productName: "MongoDB Spark Connector",
      };
      const snootySources = await prepareSnootySources({
        projects: [project],
        snootyDataApiBaseUrl,
      });
      assert(snootySources !== undefined);
      const pages = await snootySources[0].fetchPages();
      const versions = pages.map(
        (page) => page.metadata?.version as Page["version"]
      );
      const originalCurrentVersion = versions.find(
        (version) => version?.isCurrent
      );
      const currentVersionOverride = versions.find(
        (version) => !version?.isCurrent
      )?.label;

      // override the current version
      const sourcesAfterOverride = await prepareSnootySources({
        projects: [
          {
            ...project,
            currentVersionOverride,
          },
        ],
        snootyDataApiBaseUrl,
      });
      const pagesAfterOverride = await sourcesAfterOverride[0].fetchPages();
      const versionsAfterOverride = pagesAfterOverride.map(
        (page) => page.metadata?.version as Page["version"]
      );
      const currentVersionAfterOverride = versionsAfterOverride.find(
        (version) => version?.isCurrent
      );

      // Check that the current version is the one we set
      expect(currentVersionAfterOverride?.label).toBe(currentVersionOverride);
      expect(currentVersionAfterOverride?.isCurrent).toBe(true);
      // Check that the previous current version is not current anymore
      expect(originalCurrentVersion?.label).not.toBe(currentVersionOverride);
      const previousCurrentVersionAfterOverride = versionsAfterOverride.find(
        (version) => version?.label === originalCurrentVersion?.label
      );
      expect(previousCurrentVersionAfterOverride?.isCurrent).toBe(false);
    });
  });

  describe("overrideCurrentVersion", () => {
    it("overrides current version by changing isStableBranch flags on the current version and on the branch to be set to current", () => {
      const branches = [
        {
          gitBranchName: "master",
          isStableBranch: true,
          label: "master",
          fullUrl: "https://docs.mongodb.com/master/",
          active: true,
        },
        {
          gitBranchName: "dev",
          isStableBranch: false,
          label: "dev",
          fullUrl: "https://docs.mongodb.com/dev/",
          active: true,
        },
      ];
      const currentVersionOverride = "dev";
      const overriddenBranches = overrideCurrentVersion({
        branches,
        currentVersionOverride,
      });
      expect(overriddenBranches[0].isStableBranch).toBe(false);
      expect(overriddenBranches[1].isStableBranch).toBe(true);
    });
  });
});
