import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Atlas Agent Engine',
    contentSite: 'agentengine',
    url: '/docs/agentengine',
    items: [
      {
        label: 'GET STARTED',
        contentSite: 'agentengine',
        group: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'agentengine',
            url: '/docs/agentengine',
          },
          {
            label: 'Quick Start',
            contentSite: 'agentengine',
            url: '/docs/agentengine/get-started',
          },
          {
            label: 'Migrate an Existing Agent',
            contentSite: 'agentengine',
            url: '/docs/agentengine/migrate',
          },
        ],
      },
      {
        label: 'BUILD YOUR AGENT',
        contentSite: 'agentengine',
        group: true,
        items: [
          {
            label: 'Install & Authenticate',
            contentSite: 'agentengine',
            url: '/docs/agentengine/build/install-authenticate',
          },
          {
            label: 'Create a Project',
            contentSite: 'agentengine',
            url: '/docs/agentengine/build/create-project',
          },
          {
            label: 'Run Agents Locally',
            contentSite: 'agentengine',
            url: '/docs/agentengine/build/run-local',
          },
          {
            label: 'Build a Deep Agent',
            contentSite: 'agentengine',
            url: '/docs/agentengine/build/build-deep-agent',
          },
        ],
      },
      {
        label: 'TEST & DEPLOY',
        contentSite: 'agentengine',
        group: true,
        items: [
          {
            label: 'Test Your Agent',
            contentSite: 'agentengine',
            url: '/docs/agentengine/deploy/test',
          },
          {
            label: 'Set Up Atlas Resources',
            contentSite: 'agentengine',
            url: '/docs/agentengine/deploy/atlas-setup',
          },
          {
            label: 'Provision Cloud Secrets',
            contentSite: 'agentengine',
            url: '/docs/agentengine/deploy/provision-secrets',
          },
          {
            label: 'Build the Agent Image',
            contentSite: 'agentengine',
            url: '/docs/agentengine/deploy/agent-image',
          },
          {
            label: 'Deploy Your Build',
            contentSite: 'agentengine',
            url: '/docs/agentengine/deploy/deploy-build',
          },
          {
            label: 'Build from Your Own CI/CD Pipeline',
            contentSite: 'agentengine',
            url: '/docs/agentengine/deploy/ci-cd',
          },
          {
            label: 'Invoke Your Agent',
            contentSite: 'agentengine',
            collapsible: true,
            url: '/docs/agentengine/deploy/invoke-agent',
            items: [
              {
                label: 'Human-in-the-Loop Agent Execution',
                contentSite: 'agentengine',
                url: '/docs/agentengine/deploy/human-in-the-loop',
              },
            ],
          },
        ],
      },
      {
        label: 'ADD FEATURES',
        contentSite: 'agentengine',
        group: true,
        items: [
          {
            label: 'Agent Memory',
            contentSite: 'agentengine',
            collapsible: true,
            url: '/docs/agentengine/add-features/memory-types',
            items: [
              {
                label: 'Add Memory to Your Agent',
                contentSite: 'agentengine',
                url: '/docs/agentengine/add-features/memory',
              },
              {
                label: 'Memory Extraction',
                contentSite: 'agentengine',
                url: '/docs/agentengine/add-features/memory-extraction',
              },
              {
                label: 'Use the Standalone Memory SDK',
                contentSite: 'agentengine',
                url: '/docs/agentengine/add-features/memory-only',
              },
              {
                label: 'Connect an MCP Client to Memory',
                contentSite: 'agentengine',
                url: '/docs/agentengine/add-features/memory-mcp',
              },
            ],
          },
          {
            label: 'Agent-to-Agent Communication',
            contentSite: 'agentengine',
            url: '/docs/agentengine/add-features/agent-to-agent',
          },
          {
            label: 'Remote MCP Servers',
            contentSite: 'agentengine',
            url: '/docs/agentengine/add-features/remote-mcp',
          },
          {
            label: 'Add Custom Stream Output to Your Agent',
            contentSite: 'agentengine',
            url: '/docs/agentengine/add-features/custom-output',
          },
        ],
      },
      {
        label: 'MANAGE',
        contentSite: 'agentengine',
        group: true,
        items: [
          {
            label: 'Organizations, Projects, and Workspaces',
            contentSite: 'agentengine',
            collapsible: true,
            url: '/docs/agentengine/manage/project-org-workspace',
            items: [
              {
                label: 'Manage Organizations, Projects & Workspaces',
                contentSite: 'agentengine',
                url: '/docs/agentengine/manage/project-org-workspace/manage-project',
              },
              {
                label: 'Atlas Role Permissions',
                contentSite: 'agentengine',
                url: '/docs/agentengine/manage/atlas-agent-roles',
              },
            ],
          },
          {
            label: 'Monitor Agents & Deployments',
            contentSite: 'agentengine',
            url: '/docs/agentengine/manage/monitor',
          },
          {
            label: 'Inspect Agent Execution Traces',
            contentSite: 'agentengine',
            url: '/docs/agentengine/manage/inspect-traces',
          },
          {
            label: 'API Keys & Service Accounts',
            contentSite: 'agentengine',
            url: '/docs/agentengine/api-keys-service-accounts',
          },
          {
            label: 'Set Up a Monorepo',
            contentSite: 'agentengine',
            url: '/docs/agentengine/manage/monorepo',
          },
          {
            label: 'Governance',
            contentSite: 'agentengine',
            collapsible: true,
            items: [
              {
                label: 'Policy Engine',
                contentSite: 'agentengine',
                url: '/docs/agentengine/manage/governance/policy-engine',
              },
              {
                label: 'Guardrails',
                contentSite: 'agentengine',
                url: '/docs/agentengine/manage/governance/guardrails',
              },
            ],
          },
          {
            label: 'Grant Support Access',
            contentSite: 'agentengine',
            url: '/docs/agentengine/manage/support-access',
          },
          {
            label: 'Manage Network Egress Policies',
            contentSite: 'agentengine',
            collapsible: true,
            url: '/docs/agentengine/network-egress',
            items: [
              {
                label: 'Get Started with Network Egress',
                contentSite: 'agentengine',
                url: '/docs/agentengine/network-egress/egress-get-started',
              },
              {
                label: 'Link Your Atlas Cluster for Network Egress',
                contentSite: 'agentengine',
                url: '/docs/agentengine/network-egress/atlas-cluster-link',
              },
            ],
          },
        ],
      },
      {
        label: 'REFERENCE',
        contentSite: 'agentengine',
        group: true,
        items: [
          {
            label: 'Agent Contract Reference',
            contentSite: 'agentengine',
            url: '/docs/agentengine/reference/agent-contract',
          },
          {
            label: 'Public Preview Limitations',
            contentSite: 'agentengine',
            url: '/docs/agentengine/reference/limitations',
          },
          {
            label: 'Platform API Reference',
            isExternal: true,
            url: 'https://dochub.mongodb.org/core/agentic-platform-api',
          },
          {
            label: 'Atlas Agent Engine SDK',
            contentSite: 'agentengine',
            collapsible: true,
            url: '/docs/agentengine/sdk',
            items: [
              {
                label: 'JavaScript SDK',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/sdk/javascript',
                items: [
                  {
                    label: 'TypeScript SDK Documentation',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/sdk/javascript/docs',
                  },
                  {
                    label: 'agent-engine-runner-shared',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/sdk/javascript/packages/agent-engine-runner-shared',
                    items: [
                      {
                        label: 'API Reference',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/javascript/packages/agent-engine-runner-shared/docs/api',
                      },
                    ],
                  },
                  {
                    label: 'agent-engine-sdk',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/sdk/javascript/packages/agent-engine-sdk',
                    items: [
                      {
                        label: 'API Reference',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/javascript/packages/agent-engine-sdk/docs/api',
                      },
                    ],
                  },
                  {
                    label: 'agent-engine-sdk-langgraph',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/sdk/javascript/packages/agent-engine-sdk-langgraph',
                    items: [
                      {
                        label: 'Session Fork vs LangGraph Time-Travel',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/javascript/packages/agent-engine-sdk-langgraph/docs/session-fork',
                      },
                      {
                        label: 'API Reference',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/javascript/packages/agent-engine-sdk-langgraph/docs/api',
                      },
                    ],
                  },
                  {
                    label: 'agent-engine-memory',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/sdk/javascript/packages/agent-engine-memory',
                    items: [
                      {
                        label: 'API Reference',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/javascript/packages/agent-engine-memory/docs/api',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Python SDK',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/sdk/python',
                items: [
                  {
                    label: 'Python SDK Documentation',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/sdk/python/docs',
                  },
                  {
                    label: 'agent-engine-runner-shared',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/sdk/python/packages/agent-engine-runner-shared',
                  },
                  {
                    label: 'agent-engine-sdk',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk',
                  },
                  {
                    label: 'agent-engine-sdk-adk',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-adk',
                    items: [
                      {
                        label: 'API Reference',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-adk/docs/api',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'completion',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_completion',
                items: [
                  {
                    label: 'bash',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_completion_bash',
                  },
                  {
                    label: 'fish',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_completion_fish',
                  },
                  {
                    label: 'powershell',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_completion_powershell',
                  },
                  {
                    label: 'zsh',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_completion_zsh',
                  },
                ],
              },
              {
                label: 'context',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_context',
                items: [
                  {
                    label: 'create',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_context_create',
                  },
                  {
                    label: 'current',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_context_current',
                  },
                  {
                    label: 'delete',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_context_delete',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_context_list',
                  },
                  {
                    label: 'pin',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_context_pin',
                  },
                ],
              },
              {
                label: 'create',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentengine_create',
              },
              {
                label: 'create-tool',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentengine_create-tool',
              },
              {
                label: 'debug',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_debug',
                items: [
                  {
                    label: 'agent-engine-sdk-langgraph',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-langgraph',
                    items: [
                      {
                        label: 'Durable Activity Identity',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-langgraph/docs/durable-activity-identity',
                      },
                      {
                        label: 'Durable Deep Agent Delegation',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-langgraph/docs/durable-deep-agent',
                      },
                      {
                        label: 'Durable LangGraph Interrupt and Resume',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-langgraph/docs/durable-interrupts',
                      },
                      {
                        label: 'Durable Compiled Subgraphs',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-langgraph/docs/durable-subgraphs',
                      },
                      {
                        label: 'Session Fork vs LangGraph Time-Travel',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-langgraph/docs/session-fork',
                      },
                      {
                        label: 'API Reference',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-langgraph/docs/api',
                      },
                    ],
                  },
                  {
                    label: 'agent-engine-sdk-memory',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory',
                    items: [
                      {
                        label: 'Memory SDK Capability Matrix',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory/docs/capability-matrix',
                      },
                      {
                        label: 'API Reference',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory/docs/api',
                      },
                      {
                        label: 'Release Notes',
                        contentSite: 'agentengine',
                        collapsible: true,
                        url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory/release-notes',
                        items: [
                          {
                            label: 'v0.1.0',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory/release-notes/v0.1.0',
                          },
                          {
                            label: 'v0.2.0',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory/release-notes/v0.2.0',
                          },
                          {
                            label: 'v0.3.0',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory/release-notes/v0.3.0',
                          },
                          {
                            label: 'v0.4.0',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory/release-notes/v0.4.0',
                          },
                          {
                            label: 'v0.5.0',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory/release-notes/v0.5.0',
                          },
                          {
                            label: 'v0.6.0',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory/release-notes/v0.6.0',
                          },
                          {
                            label: 'v0.7.0',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory/release-notes/v0.7.0',
                          },
                          {
                            label: 'v0.8.0',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory/release-notes/v0.8.0',
                          },
                          {
                            label: 'v0.9.0',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory/release-notes/v0.9.0',
                          },
                          {
                            label: 'v0.10.0',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/sdk/python/packages/agent-engine-sdk-memory/release-notes/v0.10.0',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: 'Atlas Agent Engine CLI',
            contentSite: 'agentengine',
            url: '/docs/agentengine/cli/agentengine',
          },
        ],
      },
    ],
  },
];
