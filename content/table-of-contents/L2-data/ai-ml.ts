import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'AI Models',
    contentSite: 'voyageai',
    url: 'https://www.mongodb.com/docs/voyageai/',
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
    label: 'AI Agents',
    contentSite: 'cloud-docs',
    url: 'https://www.mongodb.com/docs/atlas/atlas-vector-search/ai-agents/',
  },
];

export default tocData;
