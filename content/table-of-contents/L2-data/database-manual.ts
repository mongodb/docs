import AggregationData from '../manual-data/aggregation';
import SearchData from '../manual-data/atlas-search';
import ClustersData from '../manual-data/clusters';
import CRUDData from '../manual-data/crud';
import FederationData from '../manual-data/data-federation';
import DataModelingData from '../manual-data/data-modeling';
import DatabasesCollectionsData from '../manual-data/databases-collections';
import InUseEncryptionData from '../manual-data/in-use-encryption';
import InUseEncryptionDataVersion7 from '../manual-data/in-use-encryption-v7-only';
import IndexesData from '../manual-data/indexes';
import ReferenceData from '../manual-data/reference';
import TimeSeriesData from '../manual-data/time-series';
import VectorSearchData from '../manual-data/vector-search';
import type { TocItem } from '../types';
import manualVersions from '../version-arrays/server-docs/manual';

const versionsBeforeV8_2 = ['v7.0', 'v8.0', 'v8.1'];

const tocData: TocItem[] = [
  {
    label: 'Overview',
    contentSite: 'docs',
    url: '/docs/:version/',
  },
  {
    label: 'Documents',
    contentSite: 'docs',
    url: '/docs/:version/core/document',
  },
  {
    label: 'Databases & Collections',
    contentSite: 'docs',
    url: '/docs/:version/core/databases-and-collections',
    collapsible: true,
    items: DatabasesCollectionsData,
  },
  {
    label: 'Client Libraries',
    contentSite: 'drivers',
    url: 'https://www.mongodb.com/docs/drivers/',
  },
  {
    label: 'Connect to Clusters',
    contentSite: 'cloud-docs',
    collapsible: true,
    items: ClustersData,
  },
  {
    label: 'Database Users',
    contentSite: 'docs',
    url: '/docs/:version/reference/database-users',
    collapsible: true,
    items: [
      {
        label: 'Configure Database Users in Atlas',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/security-add-mongodb-users',
      },
      {
        label: 'Authorization',
        contentSite: 'cloud-docs',
        collapsible: true,
        items: [
          {
            label: 'Atlas Built-In Roles',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/mongodb-users-roles-and-privileges',
          },
          {
            label: 'Built-In Roles',
            contentSite: 'docs',
            url: '/docs/:version/reference/built-in-roles',
          },
          {
            label: 'Custom Database Roles',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/security-add-mongodb-roles',
          },
          {
            label: 'Privilege Actions',
            contentSite: 'docs',
            url: '/docs/:version/reference/privilege-actions',
          },
          {
            label: 'Non-Root User Permissions',
            contentSite: 'docs',
            url: '/docs/:version/reference/non-root-user-permissions',
          },
        ],
      },
    ],
  },
  {
    label: 'CRUD Operations',
    contentSite: 'docs',
    url: '/docs/:version/crud',
    collapsible: true,
    items: CRUDData,
  },
  {
    label: 'Indexes',
    contentSite: 'docs',
    url: '/docs/:version/indexes',
    collapsible: true,
    items: IndexesData,
  },
  {
    label: 'Data Modeling',
    contentSite: 'docs',
    url: '/docs/:version/data-modeling',
    collapsible: true,
    items: DataModelingData,
  },
  {
    label: 'Aggregation Operations',
    contentSite: 'docs',
    url: '/docs/:version/aggregation',
    collapsible: true,
    items: AggregationData,
  },
  {
    label: 'Search',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-search',
    collapsible: true,
    items: SearchData,
  },
  {
    label: 'Vector Search',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/atlas-vector-search/vector-search-overview',
    collapsible: true,
    items: VectorSearchData,
  },
  {
    label: 'AI Integrations',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/ai-integrations',
    collapsible: true,
    items: [
      {
        label: 'Frameworks',
        contentSite: 'cloud-docs',
        collapsible: true,
        items: [
          {
            label: 'LangChain',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/ai-integrations/langchain',
            collapsible: true,
            items: [
              {
                label: 'Get Started',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/langchain/get-started',
              },
              {
                label: 'Memory and Semantic Caching',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/langchain/memory-semantic-cache',
              },
              {
                label: 'Hybrid Search',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/langchain/hybrid-search',
              },
              {
                label: 'Parent Document Retrieval',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/langchain/parent-document-retrieval',
              },
              {
                label: 'Self-Querying Retrieval',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/langchain/self-query-retrieval',
              },
              {
                label: 'Local RAG',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/langchain/local-rag',
              },
              {
                label: 'GraphRAG',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/langchain/graph-rag',
              },
              {
                label: 'Natural Language Queries',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/langchain/natural-language-to-mql',
              },
            ],
          },
          {
            label: 'LangChain JS/TS',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/ai-integrations/langchain-js',
          },
          {
            label: 'LangChainGo',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/ai-integrations/langchaingo',
          },
          {
            label: 'LangChain4j',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/ai-integrations/langchain4j',
          },
          {
            label: 'LlamaIndex',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/ai-integrations/llamaindex',
          },
          {
            label: 'Semantic Kernel',
            contentSite: 'cloud-docs',
            collapsible: true,
            items: [
              {
                label: 'Python Integration',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/semantic-kernel-python',
              },
              {
                label: 'C# Integration',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/semantic-kernel-csharp',
              },
            ],
          },
          {
            label: 'Haystack',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/ai-integrations/haystack',
          },
          {
            label: 'Spring AI',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/ai-integrations/spring-ai',
          },
        ],
      },
      {
        label: 'Agent Frameworks',
        contentSite: 'cloud-docs',
        collapsible: true,
        items: [
          {
            label: 'LangGraph',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/ai-integrations/langgraph',
            collapsible: true,
            items: [
              {
                label: 'Build an AI Agent',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/langgraph/build-agents',
              },
            ],
          },
          {
            label: 'LangGraph.js',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/ai-integrations/langgraph-js',
            collapsible: true,
            items: [
              {
                label: 'Build an AI Agent',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/langgraph-js/build-agents',
              },
            ],
          },
          {
            label: 'CrewAI',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/ai-integrations/crewai',
            collapsible: true,
            items: [
              {
                label: 'Build an AI Agent',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/crewai/build-agents',
              },
            ],
          },
          {
            label: 'Community-Maintained',
            contentSite: 'cloud-docs',
            collapsible: true,
            items: [
              {
                label: 'Mastra',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/mastra',
              },
            ],
          },
        ],
      },
      {
        label: 'Platforms',
        contentSite: 'cloud-docs',
        collapsible: true,
        items: [
          {
            label: 'Amazon Bedrock',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/ai-integrations/amazon-bedrock',
            collapsible: true,
            items: [
              {
                label: 'Hybrid Search',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/amazon-bedrock/hybrid-search',
              },
              {
                label: 'Troubleshooting',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/amazon-bedrock/troubleshooting',
              },
            ],
          },
          {
            label: 'Google Vertex AI',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/ai-integrations/google-vertex-ai',
            collapsible: true,
            items: [
              {
                label: 'Vertex AI Extensions',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/google-vertex-ai/extensions',
              },
              {
                label: 'Vertex AI Agent Engine',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/google-vertex-ai/agent-engine',
              },
            ],
          },
        ],
      },
      {
        label: 'Tools',
        contentSite: 'cloud-docs',
        collapsible: true,
        items: [
          {
            label: 'MCP Server',
            contentSite: 'cloud-docs',
            url: 'https://www.mongodb.com/docs/mcp-server/',
          },
          {
            label: 'n8n',
            contentSite: 'cloud-docs',
            url: '/docs/atlas/ai-integrations/n8n',
            collapsible: true,
            items: [
              {
                label: 'Build an AI Agent',
                contentSite: 'cloud-docs',
                url: '/docs/atlas/ai-integrations/n8n/build-ai-agent',
              },
            ],
          },
        ],
      },
      {
        label: 'API Resources',
        contentSite: 'cloud-docs',
        collapsible: true,
        items: [
          {
            label: 'LangChain Python API Reference',
            isExternal: true,
            url: 'https://langchain-mongodb.readthedocs.io/en/latest/langchain_mongodb/api_docs.html',
          },
          {
            label: 'LangChain JS/TS API Reference',
            isExternal: true,
            url: 'https://api.js.langchain.com/modules/langchain_mongodb.html',
          },
          {
            label: 'LangGraph API Reference',
            isExternal: true,
            url: 'https://langchain-mongodb.readthedocs.io/en/latest/langgraph_checkpoint_mongodb/api_docs.html',
          },
          {
            label: 'LangGraph.js API Reference',
            isExternal: true,
            url: 'https://langchain-ai.github.io/langgraphjs/reference/classes/checkpoint_mongodb.MongoDBSaver.html',
          },
          {
            label: 'LangChainGo API Reference',
            isExternal: true,
            url: 'https://pkg.go.dev/github.com/tmc/langchaingo',
          },
          {
            label: 'LangChain4j API Reference',
            isExternal: true,
            url: 'https://docs.langchain4j.dev/apidocs/index.html',
          },
          {
            label: 'LlamaIndex API Reference',
            isExternal: true,
            url: 'https://docs.llamaindex.ai/en/stable/api_reference/storage/vector_store/mongodb/',
          },
          {
            label: 'Semantic Kernel C# API Reference',
            isExternal: true,
            url: 'https://learn.microsoft.com/en-us/dotnet/api/microsoft.semantickernel.connectors.mongodb',
          },
          {
            label: 'Haystack API Reference',
            isExternal: true,
            url: 'https://docs.haystack.deepset.ai/reference/integrations-mongodb-atlas',
          },
          {
            label: 'Spring AI API Reference',
            isExternal: true,
            url: 'https://docs.spring.io/spring-ai/docs/current/api/org/springframework/ai/vectorstore/package-summary.html',
          },
        ],
      },
    ],
  },
  {
    label: 'Time Series',
    contentSite: 'docs',
    url: '/docs/:version/core/timeseries-collections',
    collapsible: true,
    items: TimeSeriesData,
  },
  {
    label: 'Change Streams',
    contentSite: 'docs',
    url: '/docs/:version/changeStreams',
    collapsible: true,
    items: [
      {
        label: 'Production Recommendations',
        contentSite: 'docs',
        url: '/docs/:version/administration/change-streams-production-recommendations',
      },
      {
        label: 'Change Events',
        contentSite: 'docs',
        url: '/docs/:version/reference/change-events',
        collapsible: true,
        items: [
          {
            label: 'create',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/create',
          },
          {
            label: 'createIndexes',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/createIndexes',
          },
          {
            label: 'delete',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/delete',
          },
          {
            label: 'drop',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/drop',
          },
          {
            label: 'dropDatabase',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/dropDatabase',
          },
          {
            label: 'dropIndexes',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/dropIndexes',
          },
          {
            label: 'insert',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/insert',
          },
          {
            label: 'invalidate',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/invalidate',
          },
          {
            label: 'modify',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/modify',
          },
          {
            label: 'refineCollectionShardKey',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/refineCollectionShardKey',
          },
          {
            label: 'rename',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/rename',
          },
          {
            label: 'replace',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/replace',
          },
          {
            label: 'reshardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/reshardCollection',
          },
          {
            label: 'shardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/shardCollection',
          },
          {
            label: 'update',
            contentSite: 'docs',
            url: '/docs/:version/reference/change-events/update',
          },
        ],
      },
    ],
  },
  {
    label: 'Transactions',
    contentSite: 'docs',
    url: '/docs/:version/core/transactions',
    collapsible: true,
    items: [
      {
        label: 'Drivers API',
        contentSite: 'docs',
        url: '/docs/:version/core/transactions-in-applications',
      },
      {
        label: 'Operations',
        contentSite: 'docs',
        url: '/docs/:version/core/transactions-operations',
      },
      {
        label: 'Production Considerations',
        contentSite: 'docs',
        url: '/docs/:version/core/transactions-production-consideration',
      },
      {
        label: 'Sharded Clusters',
        contentSite: 'docs',
        url: '/docs/:version/core/transactions-sharded-clusters',
      },
    ],
  },
  {
    label: 'Data Federation',
    contentSite: 'cloud-docs',
    url: '/docs/atlas/data-federation',
    collapsible: true,
    items: FederationData,
  },
  {
    label: 'In-Use Encryption',
    contentSite: 'docs',
    url: '/docs/:version/core/security-in-use-encryption',
    collapsible: true,
    versions: { excludes: ['v7.0'] },
    items: InUseEncryptionData,
  },
  {
    label: 'In-Use Encryption ',
    contentSite: 'docs',
    url: '/docs/v7.0/core/security-in-use-encryption',
    collapsible: true,
    versions: { includes: ['v7.0'] },
    items: InUseEncryptionDataVersion7,
  },
  {
    label: 'Development Checklist',
    contentSite: 'docs',
    url: '/docs/:version/administration/production-checklist-development',
  },
  {
    label: 'Replication',
    contentSite: 'docs',
    url: '/docs/:version/replication',
    collapsible: true,
    items: [
      {
        label: 'Oplog',
        contentSite: 'docs',
        url: '/docs/:version/core/replica-set-oplog',
      },
      {
        label: 'Data Synchronization',
        contentSite: 'docs',
        url: '/docs/:version/core/replica-set-sync',
      },
      {
        label: 'Replica Set Members',
        contentSite: 'docs',
        url: '/docs/:version/core/replica-set-members',
        collapsible: true,
        items: [
          {
            label: 'Primary',
            contentSite: 'docs',
            url: '/docs/:version/core/replica-set-primary',
          },
          {
            label: 'Secondary',
            contentSite: 'docs',
            url: '/docs/:version/core/replica-set-secondary',
            collapsible: true,
            items: [
              {
                label: 'Priority 0 Members',
                contentSite: 'docs',
                url: '/docs/:version/core/replica-set-priority-0-member',
              },
              {
                label: 'Hidden Members',
                contentSite: 'docs',
                url: '/docs/:version/core/replica-set-hidden-member',
              },
              {
                label: 'Delayed Members',
                contentSite: 'docs',
                url: '/docs/:version/core/replica-set-delayed-member',
              },
            ],
          },
          {
            label: 'Arbiter',
            contentSite: 'docs',
            url: '/docs/:version/core/replica-set-arbiter',
          },
        ],
      },
      {
        label: 'High Availability',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'Elections',
            contentSite: 'docs',
            url: '/docs/:version/core/replica-set-elections',
          },
          {
            label: 'Failover Rollbacks',
            contentSite: 'docs',
            url: '/docs/:version/core/replica-set-rollbacks',
          },
        ],
      },
      {
        label: 'Read & Write Semantics',
        contentSite: 'docs',
        url: '/docs/:version/applications/replication',
        collapsible: true,
        items: [
          {
            label: 'Write Concern',
            contentSite: 'docs',
            url: '/docs/:version/core/replica-set-write-concern',
          },
          {
            label: 'Read Preference',
            contentSite: 'docs',
            url: '/docs/:version/core/read-preference',
            collapsible: true,
            items: [
              {
                label: 'Use Cases',
                contentSite: 'docs',
                url: '/docs/:version/core/read-preference-use-cases',
              },
              {
                label: 'Tag Sets',
                contentSite: 'docs',
                url: '/docs/:version/core/read-preference-tags',
              },
              {
                label: 'maxStalenessSeconds',
                contentSite: 'docs',
                url: '/docs/:version/core/read-preference-staleness',
              },
              {
                label: 'Hedged Reads',
                contentSite: 'docs',
                url: '/docs/:version/core/read-preference-hedge-option/',
              },
            ],
          },
          {
            label: 'Server Selection Algorithm',
            contentSite: 'docs',
            url: '/docs/:version/core/read-preference-mechanics',
          },
        ],
      },
      {
        label: 'Replication Reference',
        contentSite: 'docs',
        url: '/docs/:version/reference/replication',
        collapsible: true,
        items: [
          {
            label: 'Member States',
            contentSite: 'docs',
            url: '/docs/:version/reference/replica-states',
          },
          {
            label: 'local Database',
            contentSite: 'docs',
            url: '/docs/:version/reference/local-database',
          },
        ],
      },
    ],
  },
  {
    label: 'Sharding',
    contentSite: 'docs',
    collapsible: true,
    url: '/docs/:version/sharding',
    items: [
      {
        label: 'Sharded Cluster Components',
        contentSite: 'docs',
        url: '/docs/:version/core/sharded-cluster-components',
        collapsible: true,
        items: [
          {
            label: 'Shards',
            contentSite: 'docs',
            url: '/docs/:version/core/sharded-cluster-shards',
          },
          {
            label: 'Config Servers (metadata)',
            contentSite: 'docs',
            url: '/docs/:version/core/sharded-cluster-config-servers',
          },
          {
            label: 'Router (mongos)',
            contentSite: 'docs',
            url: '/docs/:version/core/sharded-cluster-query-router',
          },
        ],
      },
      {
        label: 'Shard Keys',
        contentSite: 'docs',
        url: '/docs/:version/core/sharding-shard-key',
        collapsible: true,
        items: [
          {
            label: 'Shard Key Indexes',
            contentSite: 'docs',
            url: '/docs/:version/core/sharding-shard-key-indexes',
            versions: { excludes: versionsBeforeV8_2 },
          },
          {
            label: 'Shard a Collection',
            contentSite: 'docs',
            url: '/docs/:version/core/sharding-shard-a-collection',
            versions: { excludes: manualVersions.after('v8.2') },
          },
          {
            label: 'Choose Shard Key',
            contentSite: 'docs',
            url: '/docs/:version/core/sharding-choose-a-shard-key',
          },
          {
            label: 'Change Shard Key',
            contentSite: 'docs',
            url: '/docs/:version/core/sharding-change-a-shard-key',
            collapsible: true,
            items: [
              {
                label: 'Refine a Shard Key',
                contentSite: 'docs',
                url: '/docs/:version/core/sharding-refine-a-shard-key',
              },
              {
                label: 'Reshard a Collection',
                contentSite: 'docs',
                url: '/docs/:version/core/sharding-reshard-a-collection',
              },
            ],
          },
          {
            label: 'Change Shard Key Value',
            contentSite: 'docs',
            url: '/docs/:version/core/sharding-change-shard-key-value',
          },
          {
            label: 'Set Missing Key Fields',
            contentSite: 'docs',
            url: '/docs/:version/core/sharding-set-missing-shard-key-fields',
          },
          {
            label: 'Display a Shard Key',
            contentSite: 'docs',
            url: '/docs/:version/core/sharding-find-shard-key',
          },
          {
            label: 'Troubleshoot',
            contentSite: 'docs',
            url: '/docs/:version/core/sharding-troubleshooting-shard-keys',
          },
        ],
      },
      {
        label: 'Hashed Sharding',
        contentSite: 'docs',
        url: '/docs/:version/core/hashed-sharding',
        items: [
          {
            label: 'Drop Hashed Shard Key Index',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/drop-a-hashed-shard-key-index',
          },
        ],
      },
      {
        label: 'Ranged Sharding',
        contentSite: 'docs',
        url: '/docs/:version/core/ranged-sharding',
      },
      {
        label: 'Data Partitioning',
        contentSite: 'docs',
        url: '/docs/:version/core/sharding-data-partitioning',
        collapsible: true,
        items: [
          {
            label: 'Create Ranges',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/create-chunks-in-sharded-cluster',
          },
          {
            label: 'Split Chunks',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/split-chunks-in-sharded-cluster',
          },
          {
            label: 'Merge Chunks',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/merge-chunks-in-sharded-cluster',
          },
          {
            label: 'Modify Range Size',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/modify-chunk-size-in-sharded-cluster',
          },
          {
            label: 'Moveable Collections',
            contentSite: 'docs',
            url: '/docs/:version/core/moveable-collections',
            collapsible: true,
            items: [
              {
                label: 'Move a Collection',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/move-a-collection',
              },
              {
                label: 'Multi-Tenant Architecture',
                contentSite: 'docs',
                url: '/docs/:version/core/moveable-collections/multi-tenant',
              },
              {
                label: 'Stop Moving a Collection',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/stop-moving-a-collection',
              },
            ],
          },
        ],
      },
      {
        label: 'Unsharded Collections',
        contentSite: 'docs',
        url: '/docs/:version/core/unsharded-collections',
        collapsible: true,
        items: [
          {
            label: 'Unshard a Collection',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/unshard-collection',
          },
          {
            label: 'Stop Unsharding a Collection',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/stop-unsharding-collection',
          },
        ],
      },
      {
        label: 'Balancer',
        contentSite: 'docs',
        url: '/docs/:version/core/sharding-balancer-administration',
        collapsible: true,
        items: [
          {
            label: 'Manage',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/manage-sharded-cluster-balancer',
          },
          {
            label: 'Migrate Ranges',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/migrate-chunks-in-sharded-cluster',
          },
          {
            label: 'The AutoMerger',
            contentSite: 'docs',
            url: '/docs/:version/core/automerger-concept',
          },
        ],
      },
      {
        label: 'Long-Running Secondary Reads',
        contentSite: 'docs',
        url: '/docs/:version/core/long-running-secondary-reads/',
        versions: { excludes: versionsBeforeV8_2 },
      },
    ],
  },
  {
    label: 'Performance',
    contentSite: 'docs',
    url: '/docs/:version/administration/analyzing-mongodb-performance',
    collapsible: true,
    items: [
      {
        label: 'Connection Pool',
        contentSite: 'docs',
        url: '/docs/:version/administration/connection-pool-overview',
        collapsible: true,
        items: [
          {
            label: 'Tuning',
            contentSite: 'docs',
            url: '/docs/:version/tutorial/connection-pool-performance-tuning',
          },
        ],
      },
      {
        label: 'Performance Tuning',
        contentSite: 'docs',
        url: '/docs/:version/administration/performance-tuning',
      },
    ],
  },
  {
    label: 'Reference',
    contentSite: 'docs',
    url: '/docs/:version/reference',
    collapsible: true,
    items: ReferenceData,
  },
  {
    label: 'Support',
    contentSite: 'docs',
    url: '/docs/:version/support',
    collapsible: true,
    items: [
      {
        label: 'Atlas Support',
        contentSite: 'cloud-docs',
        url: '/docs/atlas/support',
      },
      {
        label: 'Create a Vulnerability Report',
        contentSite: 'docs',
        url: '/docs/:version/tutorial/create-a-vulnerability-report',
      },
    ],
  },
];

export default tocData;
