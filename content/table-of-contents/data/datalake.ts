import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "MongoDB Atlas Data Lake",
    contentSite: "datalake",
    url: "/docs/datalake/",
    collapsible: true,
    items: [
      {
        label: "Get Started",
        contentSite: "datalake",
        url: "/docs/datalake/get-started",
        collapsible: true,
        items: [
          {
            label: "Step 1: Create a Data Lake Pipeline",
            contentSite: "datalake",
            url: "/docs/datalake/tutorial/add-dataset-pipeline",
          },
          {
            label: "Step 2: Set Up a Federated Database Instance",
            contentSite: "datalake",
            url: "/docs/datalake/tutorial/set-up-federated-database",
          },
          {
            label: "Step 3: Connect to Your Federated Database Instance",
            contentSite: "datalake",
            url: "/docs/datalake/tutorial/adl-connect-federated-db-instance",
          },
          {
            label: "Step 4: Run Sample Queries",
            contentSite: "datalake",
            url: "/docs/datalake/tutorial/adl-run-sample-queries",
          },
        ],
      },
      {
        label: "Manage Data Lake Pipeline",
        contentSite: "datalake",
        url: "/docs/datalake/manage-adl-dataset-pipeline",
        collapsible: true,
        items: [
          {
            label: "View Data Lake Pipelines",
            contentSite: "datalake",
            url: "/docs/datalake/administration/view-datalake-pipelines",
          },
          {
            label: "Edit a Data Lake Pipeline",
            contentSite: "datalake",
            url: "/docs/datalake/administration/edit-data-pipeline",
          },
          {
            label: "Ingest Data On Demand",
            contentSite: "datalake",
            url: "/docs/datalake/administration/ingest-data-on-demand",
          },
          {
            label: "Pause and Resume Data Ingestion",
            contentSite: "datalake",
            url: "/docs/datalake/administration/pause-resume-data-extraction",
          },
          {
            label: "Delete Data Lake Pipeline",
            contentSite: "datalake",
            url: "/docs/datalake/administration/delete-datalake-pipeline",
          },
          {
            label: "Configure Dataset Retention",
            contentSite: "datalake",
            url: "/docs/datalake/administration/config-dataset-retention",
          },
        ],
      },
      {
        label: "Limitations",
        contentSite: "datalake",
        url: "/docs/datalake/limitations",
      },
      {
        label: "Release Notes",
        contentSite: "datalake",
        url: "/docs/datalake/release-notes/data-lake",
      },
    ],
  },
];

export default tocData;
