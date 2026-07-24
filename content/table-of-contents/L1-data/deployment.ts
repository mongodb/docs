import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'Choose Your Deployment Environment',
    contentSite: 'landing',
    url: '/docs/deployment',
  },
  {
    label: 'MongoDB Atlas',
    group: true,
    items: [
      {
        label: 'Local Deployments',
        collapsible: true,
        items: [
          {
            label: 'Deploy using Atlas CLI',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-deploy-local',
          },
          {
            label: 'Deploy Atlas Local using Docker',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-deploy-docker',
          },
        ],
      },
      {
        label: 'Cloud Deployments',
        collapsible: true,
        items: [
          {
            label: 'Deploy using Atlas CLI',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-quickstart',
          },
          {
            label: 'Deploy using Atlas UI',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/atlas/create-connect-deployments/',
          },
          {
            label: 'Deploy using Atlas Admin API',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/atlas/configure-api-access/?interface=atlas-api&programmatic-access=service-account',
          },
        ],
      },
      {
        label: 'Infrastructure as Code',
        collapsible: true,
        items: [
          {
            label: 'Deploy with Terraform',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/atlas/terraform/',
          },
          {
            label: 'Deploy with CloudFormation',
            isExternal: true,
            url: 'https://github.com/mongodb/mongodbatlas-cloudformation-resources?tab=readme-ov-file#readme',
          },
        ],
      },
      {
        label: 'Deploy with Atlas Kubernetes Operator',
        isExternal: true,
        url: 'https://www.mongodb.com/docs/atlas/operator/current/ak8so-quick-start',
      },
    ],
  },
  {
    label: 'MongoDB Enterprise Advanced',
    group: true,
    items: [
      {
        label: 'Plan Your Enterprise Advanced Deployment',
        contentSite: 'landing',
        url: '/docs/enterprise-advanced-deployment',
      },
      {
        label: 'Enterprise Platform Support',
        contentSite: 'landing',
        url: '/docs/enterprise-platform-support',
      },
      {
        label: 'Deploy using MongoDB Controllers for Kubernetes',
        isExternal: true,
        url: 'https://www.mongodb.com/docs/kubernetes/current/mdb-resources',
      },
      {
        label: 'Deploy using Ops Manager',
        isExternal: true,
        url: 'https://www.mongodb.com/docs/ops-manager/current/tutorial/getting-started-with-deployments',
      },
      {
        label: 'Install Enterprise',
        isExternal: true,
        url: 'https://www.mongodb.com/docs/manual/administration/install-enterprise',
      },
      {
        label: 'Install Search and Vector Search in a Kubernetes Cluster',
        isExternal: true,
        url: 'https://www.mongodb.com/docs/kubernetes/current/fts-vs/deployment/single-cluster-installation/?cluster-topology=repl&deployment-type=k8s-managed&mdb-edition=enterprise&mongot-instances=single',
      },
    ],
  },
  {
    label: 'MongoDB Community',
    group: true,
    items: [
      {
        label: 'Community Platform Support',
        contentSite: 'landing',
        url: '/docs/community-platform-support',
      },
      {
        label: 'Install Community',
        isExternal: true,
        url: 'https://www.mongodb.com/docs/manual/administration/install-community',
      },
      {
        label: 'Install Search and Vector Search',
        collapsible: true,
        items: [
          {
            label: 'In a Kubernetes Cluster',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/kubernetes/current/fts-vs/deployment/single-cluster-installation/?cluster-topology=repl&deployment-type=k8s-managed&mdb-edition=community&mongot-instances=single',
          },
          {
            label: 'On Linux',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/search/self-managed/current/installation/linux',
          },
          {
            label: 'In Docker',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/search/self-managed/current/installation/docker',
          },
        ],
      },
    ],
  },
];

export default tocData;
