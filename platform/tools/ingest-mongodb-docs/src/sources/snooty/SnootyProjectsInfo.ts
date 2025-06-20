import fetch from "node-fetch";
import { logger } from "../../logger";
import {
  SnootyProject,
  makeSnootyDataSource,
  Branch,
  LocallySpecifiedSnootyProjectConfig,
} from "./SnootyDataSource";
import { filterFulfilled } from "../../arrayFilters";
import { RenderLinks } from "./snootyAstToMd";

/** Schema for API response from https://snooty-data-api.mongodb.com/prod/projects */
export type GetSnootyProjectsResponse = {
  data: SnootyProject[];
};

export type SnootyProjectsInfo = {
  getAllBranches(args: { projectName: string }): Promise<Branch[] | undefined>;
};

/**
  Creates a SnootyProjectsInfo object from the Snooty Data API GET projects
  endpoint.
 */
export const makeSnootyProjectsInfo = async ({
  snootyDataApiBaseUrl,
}: {
  snootyDataApiBaseUrl: string;
}): Promise<SnootyProjectsInfo & { _data: typeof data }> => {
  const response = await fetch(new URL("projects", snootyDataApiBaseUrl));
  const { data } =
    (await response.json()) as unknown as GetSnootyProjectsResponse;

  // Preprocess data into a Map for faster lookups
  const projectMap = new Map(data.map((project) => [project.project, project]));

  // Fix Snooty API data
  data.forEach((project) => {
    project.branches.forEach((branch) => {
      // Fix booleans that might be string "true" instead of boolean `true`. For more
      // context, see https://jira.mongodb.org/browse/DOP-3862
      branch.active =
        (branch.active as unknown) === "true" || branch.active === true;

      // Some urls are http instead of https
      branch.fullUrl = branch.fullUrl.replace("http://", "https://");
    });
  });

  return {
    _data: data,

    async getAllBranches({ projectName }) {
      const project = projectMap.get(projectName);
      return project?.branches;
    },
  };
};

/**
  Fill the details of the defined Snooty data sources with the info in the
  Snooty Data API projects endpoint.
 */
export const prepareSnootySources = async ({
  projects,
  snootyDataApiBaseUrl,
  links,
}: {
  projects: LocallySpecifiedSnootyProjectConfig[];
  snootyDataApiBaseUrl: string;
  links?: Omit<RenderLinks, "baseUrl">;
}) => {
  const snootyProjectsInfo = await makeSnootyProjectsInfo({
    snootyDataApiBaseUrl,
  });
  return filterFulfilled(
    await Promise.allSettled(
      projects.map(async (project) => {
        const { name: projectName } = project;
        let branches = (await snootyProjectsInfo.getAllBranches({
          projectName,
        })) as Branch[];
        // modify branches if there is a currentVersionOverride
        if (project.currentVersionOverride) {
          branches = overrideCurrentVersion({
            branches,
            currentVersionOverride: project.currentVersionOverride,
          });
        }
        try {
          return makeSnootyDataSource({
            name: project.name,
            project: {
              ...project,
              branches,
            },
            snootyDataApiBaseUrl,
            links,
          });
        } catch (error) {
          logger.error(
            `Failed to prepare snooty data source '${project.name}': ${
              (error as Error).message
            }`
          );
          throw error;
        }
      })
    )
  ).map((result) => result.value);
};

export const overrideCurrentVersion = ({
  branches,
  currentVersionOverride,
}: {
  branches: Branch[];
  currentVersionOverride: string;
}) => {
  return branches.map((branch) => {
    if (branch.label !== currentVersionOverride) {
      return { ...branch, isStableBranch: false };
    }
    if (branch.label === currentVersionOverride) {
      return { ...branch, isStableBranch: true };
    }
    return branch;
  });
};
