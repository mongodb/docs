import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Django MongoDB Backend",
    contentSite: "django",
    url: "/docs/languages/python/django-mongodb/:version/",
    collapsible: true,
    items: [
      {
        label: "Get Started",
        contentSite: "django",
        url: "/docs/languages/python/django-mongodb/:version/get-started",
        collapsible: true,
        items: [
          {
            label: "Download & Install",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/get-started/install",
          },
          {
            label: "Create a Deployment",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/get-started/create-deployment",
          },
          {
            label: "Create a Connection String",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/get-started/connection-string",
          },
          {
            label: "Configure a MongoDB Connection",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/get-started/connect-mongodb",
          },
          {
            label: "Create an Application",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/get-started/create-app",
          },
          {
            label: "Write Data to MongoDB",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/get-started/write-data",
          },
          {
            label: "Query MongoDB Data",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/get-started/query-data",
          },
          {
            label: "Create an Admin Site",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/get-started/create-admin",
          },
          {
            label: "Next Steps",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/get-started/next-steps",
          },
        ],
      },
      {
        label: "Connection Configuration",
        contentSite: "django",
        url: "/docs/languages/python/django-mongodb/:version/connect",
      },
      {
        label: "Model Your Data",
        contentSite: "django",
        url: "/docs/languages/python/django-mongodb/:version/model-data",
        collapsible: true,
        items: [
          {
            label: "Create Indexes",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/model-data/indexes",
          },
          {
            label: "Create Models",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/model-data/models",
          },
        ],
      },
      {
        label: "Interact with Data",
        contentSite: "django",
        url: "/docs/languages/python/django-mongodb/:version/interact-data",
        collapsible: true,
        items: [
          {
            label: "CRUD Operations",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/interact-data/crud",
          },
          {
            label: "Specify a Query",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/interact-data/specify-a-query",
          },
          {
            label: "Perform Raw Queries",
            contentSite: "django",
            url: "/docs/languages/python/django-mongodb/:version/interact-data/raw-queries",
          },
        ],
      },
      {
        label: "Feature Compatibility",
        contentSite: "django",
        url: "/docs/languages/python/django-mongodb/:version/limitations-upcoming",
      },
      {
        label: "Issues & Help",
        contentSite: "django",
        url: "/docs/languages/python/django-mongodb/:version/issues-and-help",
      },
      {
        label: "Version Compatibility",
        contentSite: "django",
        url: "/docs/languages/python/django-mongodb/:version/compatibility",
      },
      {
        label: "API Documentation",
        isExternal: true,
        url: "https://django-mongodb-backend.readthedocs.io/en/latest/",
      },
    ],
  },
];

export default tocData;
