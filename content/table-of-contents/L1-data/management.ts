import CloudManagerData from '../docset-data/cloud-manager';
import OmData from '../docset-data/ops-manager';
import AtlasData from '../L2-data/atlas';
import EnterpriseK8sData from '../L2-data/enterprise-k8s';
import MckData from '../L2-data/mck';
import OnPremData from '../L2-data/on-prem';
import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'MongoDB Atlas',
    contentSite: 'cloud-docs',
    group: true,
    items: AtlasData,
  },
  {
    label: 'Enterprise Management Tools',
    contentSite: 'docs',
    group: true,
    items: [
      {
        label: 'Ops Manager',
        contentSite: 'ops-manager',
        url: '/docs/ops-manager/:version/',
        showSubNav: true,
        items: OmData,
      },
      {
        label: 'Controllers for Kubernetes Operator',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/',
        items: MckData,
        showSubNav: true,
      },
      {
        label: 'Kubernetes Operator (Deprecated)',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/v1.33/',
        items: EnterpriseK8sData,
        showSubNav: true,
      },
      {
        label: 'Cloud Manager',
        contentSite: 'cloud-manager',
        url: '/docs/cloud-manager/',
        showSubNav: true,
        items: CloudManagerData,
      },
    ],
  },
  {
    label: 'Self-Managed Deployments',
    group: true,
    contentSite: 'docs',
    versionDropdown: true,
    items: OnPremData,
  },
  {
    label: 'Infrastructure As Code',
    contentSite: 'docs',
    group: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/infrastructure',
      },
      {
        label: 'MongoDB Atlas Terraform Provider',
        url: 'https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs',
        isExternal: true,
      },
      {
        label: 'Get Started with Terraform',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/terraform',
      },
      {
        label: 'MongoDB Atlas AWS CloudFormation Resources',
        url: 'https://github.com/mongodb/mongodbatlas-cloudformation-resources?tab=readme-ov-file#readme',
        isExternal: true,
      },
      {
        label: 'GraphQL APIs on AWS',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/graphql-api',
      },
      {
        label: 'Migrate to Flex Clusters',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/flex-migration',
      },
    ],
  },
];

export default tocData;
