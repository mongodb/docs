import ChartsData from '../docset-data/atlas-charts';
import AtlasCliData from '../docset-data/atlas-cli';
import BIConnectorData from '../docset-data/bi-connector';
import CompassData from '../docset-data/compass';
import DatabaseToolsData from '../docset-data/database-tools';
import KafkaConnectorData from '../docset-data/kafka-connector';
import MCPData from '../docset-data/mcp-server';
import MongoCliData from '../docset-data/mongocli';
import AnalyzerData from '../docset-data/mongodb-analyzer';
import IntellijData from '../docset-data/mongodb-intellij';
import MongoDBShellData from '../docset-data/mongodb-shell';
import VSCodeData from '../docset-data/mongodb-vscode';
import SyncData from '../docset-data/mongosync';
import RelationalMigratorData from '../docset-data/relational-migrator';
import SparkConnectorData from '../docset-data/spark-connector';
import SQLInterfaceData from '../docset-data/sql-interface';
import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'CLIs and Utilities',
    contentSite: 'docs',
    group: true,
    items: [
      {
        label: 'Atlas CLI',
        contentSite: 'atlas-cli',
        url: '/docs/atlas/cli/:version/',
        showSubNav: true,
        items: AtlasCliData,
      },
      {
        label: 'Mongo CLI',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/',
        showSubNav: true,
        items: MongoCliData,
      },
      {
        label: 'MongoDB Database Tools',
        contentSite: 'database-tools',
        url: '/docs/database-tools',
        showSubNav: true,
        items: DatabaseToolsData,
      },
      {
        label: 'MongoDB Shell',
        contentSite: 'mongodb-shell',
        url: '/docs/mongodb-shell/',
        showSubNav: true,
        items: MongoDBShellData,
      },
    ],
  },
  {
    label: 'Connectors',
    contentSite: 'drivers',
    group: true,
    items: [
      {
        label: 'SQL Interface',
        contentSite: 'sql-interface',
        url: '/docs/sql-interface/',
        showSubNav: true,
        items: SQLInterfaceData,
      },
      {
        label: 'BI Connector',
        contentSite: 'bi-connector',
        url: '/docs/bi-connector/:version/',
        showSubNav: true,
        items: BIConnectorData,
      },
      {
        label: 'Kafka Connector',
        contentSite: 'kafka-connector',
        url: '/docs/kafka-connector/:version/',
        showSubNav: true,
        items: KafkaConnectorData,
      },
      {
        label: 'Spark Connector',
        contentSite: 'spark-connector',
        url: '/docs/spark-connector/:version/',
        showSubNav: true,
        items: SparkConnectorData,
      },
    ],
  },
  {
    label: 'IDE & AI Integrations',
    contentSite: 'docs',
    group: true,
    items: [
      {
        label: 'MongoDB MCP Server',
        contentSite: 'mcp-server',
        url: '/docs/mcp-server/',
        showSubNav: true,
        items: MCPData,
      },
      {
        label: 'C# Analyzer',
        contentSite: 'visual-studio-extension',
        url: '/docs/mongodb-analyzer/',
        showSubNav: true,
        items: AnalyzerData,
      },
      {
        label: 'VS Code Extension',
        contentSite: 'mongodb-vscode',
        url: '/docs/mongodb-vscode/',
        showSubNav: true,
        items: VSCodeData,
      },
      {
        label: 'IntelliJ Plugin',
        contentSite: 'intellij',
        url: '/docs/mongodb-intellij/',
        showSubNav: true,
        items: IntellijData,
      },
    ],
  },
  {
    label: 'Migrators',
    contentSite: 'docs',
    group: true,
    items: [
      {
        label: 'Mongosync',
        contentSite: 'mongosync',
        url: '/docs/mongosync/',
        showSubNav: true,
        items: SyncData,
      },
      {
        label: 'Relational Migrator',
        contentSite: 'docs-relational-migrator',
        url: '/docs/relational-migrator/',
        showSubNav: true,
        items: RelationalMigratorData,
      },
    ],
  },
  {
    label: 'Partner Integrations',
    contentSite: 'cloud-docs',
    group: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/partner-integrations',
      },
      {
        label: 'Explore Partner Ecosystem',
        isExternal: true,
        url: 'https://cloud.mongodb.com/ecosystem',
      },
      {
        label: 'Render',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/reference/partner-integrations/render',
      },
      {
        label: 'Vercel',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/reference/partner-integrations/vercel',
      },
      {
        label: 'Azure',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/reference/partner-integrations/azure',
      },
    ],
  },
  {
    label: 'Visualization',
    contentSite: 'docs',
    group: true,
    items: [
      {
        label: 'Charts',
        contentSite: 'charts',
        url: '/docs/charts/',
        showSubNav: true,
        items: ChartsData,
      },
      {
        label: 'Compass',
        contentSite: 'compass',
        url: '/docs/compass/',
        showSubNav: true,
        items: CompassData,
      },
    ],
  },
];

export default tocData;
