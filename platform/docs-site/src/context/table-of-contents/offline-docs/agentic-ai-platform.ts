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
            label: 'Memory',
            contentSite: 'agentengine',
            collapsible: true,
            items: [
              {
                label: 'Add Memory to Your Agent',
                contentSite: 'agentengine',
                url: '/docs/agentengine/add-features/memory',
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
              {
                label: 'Build from Your Own CI/CD Pipeline',
                contentSite: 'agentengine',
                url: '/docs/agentengine/deploy/ci-cd',
              },
            ],
          },
          {
            label: 'Monitor Agents & Deployments',
            contentSite: 'agentengine',
            url: '/docs/agentengine/manage/monitor',
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
            label: 'Platform API Reference',
            isExternal: true,
            url: 'https://dochub.mongodb.org/core/agentic-platform-api',
          },
          {
            label: 'Agentic Engine CLI',
            contentSite: 'agentengine',
            collapsible: true,
            url: '/docs/agentengine/cli/agentic',
            items: [
              {
                label: 'api-key',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_api-key',
                items: [
                  {
                    label: 'create',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_api-key_create',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_api-key_list',
                  },
                  {
                    label: 'revoke',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_api-key_revoke',
                  },
                ],
              },
              {
                label: 'atlas',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_atlas',
                items: [
                  {
                    label: 'cluster',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentic_atlas_cluster',
                    items: [
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_atlas_cluster_list',
                      },
                      {
                        label: 'save',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_atlas_cluster_save',
                      },
                    ],
                  },
                  {
                    label: 'database-user',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentic_atlas_database-user',
                    items: [
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_atlas_database-user_list',
                      },
                      {
                        label: 'save',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_atlas_database-user_save',
                      },
                    ],
                  },
                  {
                    label: 'link',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_atlas_link',
                  },
                  {
                    label: 'profile',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentic_atlas_profile',
                    items: [
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_atlas_profile_list',
                      },
                      {
                        label: 'save',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_atlas_profile_save',
                      },
                      {
                        label: 'verify',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_atlas_profile_verify',
                      },
                    ],
                  },
                  {
                    label: 'setup',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentic_atlas_setup',
                    items: [
                      {
                        label: 'finalize',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_atlas_setup_finalize',
                      },
                    ],
                  },
                  {
                    label: 'setup-ip-access',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_atlas_setup-ip-access',
                  },
                  {
                    label: 'status',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_atlas_status',
                  },
                  {
                    label: 'voyage-api-key',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentic_atlas_voyage-api-key',
                    items: [
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_atlas_voyage-api-key_list',
                      },
                      {
                        label: 'save',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_atlas_voyage-api-key_save',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'auth',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_auth',
                items: [
                  {
                    label: 'login',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_auth_login',
                  },
                  {
                    label: 'logout',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_auth_logout',
                  },
                  {
                    label: 'status',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_auth_status',
                  },
                ],
              },
              {
                label: 'build',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_build',
                items: [
                  {
                    label: 'cancel',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_build_cancel',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_build_list',
                  },
                  {
                    label: 'logs',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_build_logs',
                  },
                  {
                    label: 'promote',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentic_build_promote',
                    items: [
                      {
                        label: 'get',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_build_promote_get',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'completion',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_completion',
                items: [
                  {
                    label: 'bash',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_completion_bash',
                  },
                  {
                    label: 'fish',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_completion_fish',
                  },
                  {
                    label: 'powershell',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_completion_powershell',
                  },
                  {
                    label: 'zsh',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_completion_zsh',
                  },
                ],
              },
              {
                label: 'create',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentic_create',
              },
              {
                label: 'deploy',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_deploy',
                items: [
                  {
                    label: 'cancel',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_deploy_cancel',
                  },
                  {
                    label: 'get',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_deploy_get',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_deploy_list',
                  },
                  {
                    label: 'logs',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_deploy_logs',
                  },
                ],
              },
              {
                label: 'dev',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_dev',
                items: [
                  {
                    label: 'clean',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_dev_clean',
                  },
                  {
                    label: 'login',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_dev_login',
                  },
                  {
                    label: 'logs',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_dev_logs',
                  },
                  {
                    label: 'mcp',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentic_dev_mcp',
                    items: [
                      {
                        label: 'auth',
                        contentSite: 'agentengine',
                        collapsible: true,
                        url: '/docs/agentengine/cli/agentic_dev_mcp_auth',
                        items: [
                          {
                            label: 'login',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/cli/agentic_dev_mcp_auth_login',
                          },
                          {
                            label: 'status',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/cli/agentic_dev_mcp_auth_status',
                          },
                          {
                            label: 'upload',
                            contentSite: 'agentengine',
                            url: '/docs/agentengine/cli/agentic_dev_mcp_auth_upload',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: 'restart',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_dev_restart',
                  },
                  {
                    label: 'status',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_dev_status',
                  },
                  {
                    label: 'stop',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_dev_stop',
                  },
                  {
                    label: 'up',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_dev_up',
                  },
                ],
              },
              {
                label: 'docs',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_docs',
                items: [
                  {
                    label: 'generate',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_docs_generate',
                  },
                ],
              },
              {
                label: 'egress',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_egress',
                items: [
                  {
                    label: 'add',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_egress_add',
                  },
                  {
                    label: 'clear',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_egress_clear',
                  },
                  {
                    label: 'get',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_egress_get',
                  },
                  {
                    label: 'remove',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_egress_remove',
                  },
                  {
                    label: 'save',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_egress_save',
                  },
                ],
              },
              {
                label: 'init',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentic_init',
              },
              {
                label: 'invoke',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentic_invoke',
              },
              {
                label: 'logs',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_logs',
                items: [
                  {
                    label: 'get',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_logs_get',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_logs_list',
                  },
                ],
              },
              {
                label: 'memory',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_memory',
                items: [
                  {
                    label: 'configure',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_memory_configure',
                  },
                  {
                    label: 'provision',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_memory_provision',
                  },
                  {
                    label: 'restart',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_memory_restart',
                  },
                  {
                    label: 'status',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_memory_status',
                  },
                ],
              },
              {
                label: 'organization',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_organization',
                items: [
                  {
                    label: 'create',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_organization_create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_organization_delete',
                  },
                  {
                    label: 'get',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_organization_get',
                  },
                  {
                    label: 'invitations',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentic_organization_invitations',
                    items: [
                      {
                        label: 'accept',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_organization_invitations_accept',
                      },
                      {
                        label: 'decline',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_organization_invitations_decline',
                      },
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_organization_invitations_list',
                      },
                    ],
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_organization_list',
                  },
                  {
                    label: 'update',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_organization_update',
                  },
                  {
                    label: 'users',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentic_organization_users',
                    items: [
                      {
                        label: 'add',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_organization_users_add',
                      },
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_organization_users_list',
                      },
                      {
                        label: 'remove',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_organization_users_remove',
                      },
                      {
                        label: 'update',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_organization_users_update',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'project',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_project',
                items: [
                  {
                    label: 'create',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_project_create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_project_delete',
                  },
                  {
                    label: 'get',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_project_get',
                  },
                  {
                    label: 'invitations',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentic_project_invitations',
                    items: [
                      {
                        label: 'accept',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_project_invitations_accept',
                      },
                      {
                        label: 'decline',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_project_invitations_decline',
                      },
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_project_invitations_list',
                      },
                    ],
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_project_list',
                  },
                  {
                    label: 'update',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_project_update',
                  },
                  {
                    label: 'users',
                    contentSite: 'agentengine',
                    collapsible: true,
                    url: '/docs/agentengine/cli/agentic_project_users',
                    items: [
                      {
                        label: 'add',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_project_users_add',
                      },
                      {
                        label: 'list',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_project_users_list',
                      },
                      {
                        label: 'remove',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_project_users_remove',
                      },
                      {
                        label: 'update',
                        contentSite: 'agentengine',
                        url: '/docs/agentengine/cli/agentic_project_users_update',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'secret',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_secret',
                items: [
                  {
                    label: 'delete',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_secret_delete',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_secret_list',
                  },
                  {
                    label: 'set',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_secret_set',
                  },
                  {
                    label: 'sync',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_secret_sync',
                  },
                ],
              },
              {
                label: 'self-update',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentic_self-update',
              },
              {
                label: 'service-account',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_service-account',
                items: [
                  {
                    label: 'create',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_service-account_create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_service-account_delete',
                  },
                  {
                    label: 'get',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_service-account_get',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_service-account_list',
                  },
                  {
                    label: 'rotate',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_service-account_rotate',
                  },
                ],
              },
              {
                label: 'source',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_source',
                items: [
                  {
                    label: 'setup',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_source_setup',
                  },
                  {
                    label: 'template',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_source_template',
                  },
                  {
                    label: 'validate',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_source_validate',
                  },
                ],
              },
              {
                label: 'status',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentic_status',
              },
              {
                label: 'validate',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentic_validate',
              },
              {
                label: 'version',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentic_version',
              },
              {
                label: 'version-bump',
                contentSite: 'agentengine',
                url: '/docs/agentengine/cli/agentic_version-bump',
              },
              {
                label: 'workspace',
                contentSite: 'agentengine',
                collapsible: true,
                url: '/docs/agentengine/cli/agentic_workspace',
                items: [
                  {
                    label: 'create',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_workspace_create',
                  },
                  {
                    label: 'delete',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_workspace_delete',
                  },
                  {
                    label: 'get',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_workspace_get',
                  },
                  {
                    label: 'list',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_workspace_list',
                  },
                  {
                    label: 'logs',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_workspace_logs',
                  },
                  {
                    label: 'update',
                    contentSite: 'agentengine',
                    url: '/docs/agentengine/cli/agentic_workspace_update',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
