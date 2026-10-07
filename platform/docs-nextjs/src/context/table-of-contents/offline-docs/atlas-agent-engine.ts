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
            label: 'Sample Application Templates',
            isExternal: true,
            url: 'https://github.com/mongodb/agent-engine-examples',
          },
          {
            label: 'Atlas Agent Engine API Reference',
            isExternal: true,
            url: 'https://www.mongodb.com/docs/api/doc/agentengine',
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
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: 'Atlas Agent Engine CLI',
            contentSite: 'agentengine',
            collapsible: true,
            url: '/docs/agentengine/cli/agentengine',
            items: [
              {
                label: 'agent',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_agent',
                items: [
                  {
                    label: 'bump-version',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_agent_bump-version',
                  },
                  {
                    label: 'egress',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentengine_agent_egress',
                    items: [
                      {
                        label: 'add',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_agent_egress_add',
                      },
                      {
                        label: 'mode',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_agent_egress_mode',
                      },
                      {
                        label: 'remove',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_agent_egress_remove',
                      },
                    ],
                  },
                  {
                    label: 'validate',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_agent_validate',
                  },
                ],
              },
              {
                label: 'atlas',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_atlas',
                items: [
                  {
                    label: 'cluster',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentengine_atlas_cluster',
                    items: [
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_atlas_cluster_list',
                      },
                      {
                        label: 'save',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_atlas_cluster_save',
                      },
                    ],
                  },
                  {
                    label: 'database-user',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentengine_atlas_database-user',
                    items: [
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_atlas_database-user_list',
                      },
                      {
                        label: 'save',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_atlas_database-user_save',
                      },
                    ],
                  },
                  {
                    label: 'link',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_atlas_link',
                  },
                  {
                    label: 'profile',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentengine_atlas_profile',
                    items: [
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_atlas_profile_list',
                      },
                      {
                        label: 'save',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_atlas_profile_save',
                      },
                      {
                        label: 'verify',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_atlas_profile_verify',
                      },
                    ],
                  },
                  {
                    label: 'setup',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentengine_atlas_setup',
                    items: [
                      {
                        label: 'finalize',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_atlas_setup_finalize',
                      },
                    ],
                  },
                  {
                    label: 'setup-ip-access',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_atlas_setup-ip-access',
                  },
                  {
                    label: 'status',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_atlas_status',
                  },
                  {
                    label: 'voyage-api-key',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentengine_atlas_voyage-api-key',
                    items: [
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_atlas_voyage-api-key_list',
                      },
                      {
                        label: 'save',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_atlas_voyage-api-key_save',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'auth',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_auth',
                items: [
                  {
                    label: 'login',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_auth_login',
                  },
                  {
                    label: 'logout',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_auth_logout',
                  },
                  {
                    label: 'status',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_auth_status',
                  },
                ],
              },
              {
                label: 'build',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_build',
                items: [
                  {
                    label: 'cancel',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_build_cancel',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_build_list',
                  },
                  {
                    label: 'logs',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_build_logs',
                  },
                  {
                    label: 'promote',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentengine_build_promote',
                    items: [
                      {
                        label: 'get',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_build_promote_get',
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
                    label: 'logs',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentengine_debug_logs',
                    items: [
                      {
                        label: 'get',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_debug_logs_get',
                      },
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_debug_logs_list',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'deploy',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_deploy',
                items: [
                  {
                    label: 'cancel',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_deploy_cancel',
                  },
                  {
                    label: 'get',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_deploy_get',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_deploy_list',
                  },
                  {
                    label: 'logs',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_deploy_logs',
                  },
                ],
              },
              {
                label: 'dev',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_dev',
                items: [
                  {
                    label: 'clean',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_dev_clean',
                  },
                  {
                    label: 'login',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_dev_login',
                  },
                  {
                    label: 'logs',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_dev_logs',
                  },
                  {
                    label: 'mcp',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentengine_dev_mcp',
                    items: [
                      {
                        label: 'auth',
                        contentSite: 'agentengine',
                        collapsible: true,
                        url: '/docs/agentengine/cli/agentengine_dev_mcp_auth',
                        items: [
                          {
                            label: 'login',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/cli/agentengine_dev_mcp_auth_login',
                          },
                          {
                            label: 'status',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/cli/agentengine_dev_mcp_auth_status',
                          },
                          {
                            label: 'upload',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/cli/agentengine_dev_mcp_auth_upload',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'restart',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_dev_restart',
                  },
                  {
                    label: 'status',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_dev_status',
                  },
                  {
                    label: 'stop',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_dev_stop',
                  },
                  {
                    label: 'up',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_dev_up',
                  },
                ],
              },
              {
                label: 'docs',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_docs',
                items: [
                  {
                    label: 'generate',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_docs_generate',
                  },
                ],
              },
              {
                label: 'egress',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_egress',
                items: [
                  {
                    label: 'clear',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_egress_clear',
                  },
                  {
                    label: 'export',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_egress_export',
                  },
                  {
                    label: 'save',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_egress_save',
                  },
                ],
              },
              {
                label: 'init',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentengine_init',
              },
              {
                label: 'invoke',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentengine_invoke',
              },
              {
                label: 'logs',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_logs',
                items: [
                  {
                    label: 'export',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_logs_export',
                  },
                ],
              },
              {
                label: 'memory',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_memory',
                items: [
                  {
                    label: 'apply',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_memory_apply',
                  },
                  {
                    label: 'configure',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_memory_configure',
                  },
                  {
                    label: 'status',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_memory_status',
                  },
                ],
              },
              {
                label: 'migrate',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_migrate',
                items: [
                  {
                    label: 'sandboxes',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_migrate_sandboxes',
                  },
                ],
              },
              {
                label: 'organization',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_organization',
                items: [
                  {
                    label: 'get',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_organization_get',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_organization_list',
                  },
                ],
              },
              {
                label: 'project',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_project',
                items: [
                  {
                    label: 'get',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_project_get',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_project_list',
                  },
                ],
              },
              {
                label: 'secret',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_secret',
                items: [
                  {
                    label: 'delete',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_secret_delete',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_secret_list',
                  },
                  {
                    label: 'set',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_secret_set',
                  },
                  {
                    label: 'sync',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_secret_sync',
                  },
                ],
              },
              {
                label: 'self-update',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentengine_self-update',
              },
              {
                label: 'service-account',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_service-account',
                items: [
                  {
                    label: 'create',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_service-account_create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_service-account_delete',
                  },
                  {
                    label: 'get',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_service-account_get',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_service-account_list',
                  },
                  {
                    label: 'rotate',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_service-account_rotate',
                  },
                ],
              },
              {
                label: 'status',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentengine_status',
              },
              {
                label: 'version',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentengine_version',
              },
              {
                label: 'workspace',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentengine_workspace',
                items: [
                  {
                    label: 'create',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_workspace_create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_workspace_delete',
                  },
                  {
                    label: 'get',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_workspace_get',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_workspace_list',
                  },
                  {
                    label: 'sessions',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentengine_workspace_sessions',
                    items: [
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_workspace_sessions_list',
                      },
                      {
                        label: 'stop',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentengine_workspace_sessions_stop',
                      },
                    ],
                  },
                  {
                    label: 'update',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentengine_workspace_update',
                  },
                ],
              },
              {
                label: 'artifact-registry-validate',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/artifact-registry-validate',
              },
              {
                label: 'custom-artifact-source',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/custom-artifact-source',
              },
              {
                label: 'environment-variables',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/environment-variables',
              },
              {
                label: 'public-artifacts',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/public-artifacts',
              },
            ],
          },
        ],
      },
    ],
  },
];
