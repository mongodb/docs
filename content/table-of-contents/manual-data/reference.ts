import type { TocItem } from '../types';

const versionsBeforeV8_2 = ['v7.0', 'v8.0', 'v8.1'];
const versionsBeforeV8_3 = ['v7.0', 'v8.0', 'v8.1', 'v8.2'];

const tocData: TocItem[] = [
  {
    label: 'Collation',
    contentSite: 'docs',
    url: '/docs/:version/reference/collation',
    collapsible: true,
    items: [
      {
        label: 'Locales & Default Parameters',
        contentSite: 'docs',
        url: '/docs/:version/reference/collation-locales-defaults',
      },
    ],
  },
  {
    label: 'Connection Strings',
    contentSite: 'docs',
    url: '/docs/:version/reference/connection-string',
    collapsible: true,
    items: [
      {
        label: 'Options',
        contentSite: 'docs',
        url: '/docs/:version/reference/connection-string-options',
      },
      {
        label: 'Examples',
        contentSite: 'docs',
        url: '/docs/:version/reference/connection-string-examples',
      },
    ],
  },
  {
    label: 'Database Commands',
    contentSite: 'docs',
    url: '/docs/:version/reference/command',
    collapsible: true,
    items: [
      {
        label: 'Query Plan Cache',
        contentSite: 'docs',
        url: '/docs/:version/reference/command/nav-plan-cache',
        collapsible: true,
        items: [
          {
            label: 'planCacheClear',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/planCacheClear',
          },
          {
            label: 'planCacheClearFilters',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/planCacheClearFilters',
          },
          {
            label: 'planCacheListFilters',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/planCacheListFilters',
          },
          {
            label: 'planCacheSetFilter',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/planCacheSetFilter',
          },
        ],
      },
      {
        label: 'Authentication',
        contentSite: 'docs',
        url: '/docs/:version/reference/command/nav-authentication',
        collapsible: true,
        items: [
          {
            label: 'authenticate',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/authenticate',
          },
          {
            label: 'logout',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/logout',
          },
        ],
      },
      {
        label: 'User Management',
        contentSite: 'docs',
        url: '/docs/:version/reference/command/nav-user-management',
        collapsible: true,
        items: [
          {
            label: 'createUser',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/createUser',
          },
          {
            label: 'dropAllUsersFromDatabase',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/dropAllUsersFromDatabase',
          },
          {
            label: 'dropUser',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/dropUser',
          },
          {
            label: 'grantRolesToUser',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/grantRolesToUser',
          },
          {
            label: 'revokeRolesFromUser',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/revokeRolesFromUser',
          },
          {
            label: 'updateUser',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/updateUser',
          },
          {
            label: 'usersInfo',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/usersInfo',
          },
        ],
      },
      {
        label: 'Role Management',
        contentSite: 'docs',
        url: '/docs/:version/reference/command/nav-role-management',
        collapsible: true,
        items: [
          {
            label: 'createRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/createRole',
          },
          {
            label: 'dropRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/dropRole',
          },
          {
            label: 'dropAllRolesFromDatabase',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/dropAllRolesFromDatabase',
          },
          {
            label: 'grantPrivilegesToRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/grantPrivilegesToRole',
          },
          {
            label: 'grantRolesToRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/grantRolesToRole',
          },
          {
            label: 'invalidateUserCache',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/invalidateUserCache',
          },
          {
            label: 'revokePrivilegesFromRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/revokePrivilegesFromRole',
          },
          {
            label: 'revokeRolesFromRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/revokeRolesFromRole',
          },
          {
            label: 'rolesInfo',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/rolesInfo',
          },
          {
            label: 'updateRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/updateRole',
          },
        ],
      },
      {
        label: 'Replication',
        contentSite: 'docs',
        url: '/docs/:version/reference/command/nav-replication',
        collapsible: true,
        items: [
          {
            label: 'appendOplogNote',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/appendOplogNote',
          },
          {
            label: 'applyOps',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/applyOps',
          },
          {
            label: 'hello',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/hello',
          },
          {
            label: 'replSetAbortPrimaryCatchUp',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/replSetAbortPrimaryCatchUp',
          },
          {
            label: 'replSetFreeze',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/replSetFreeze',
          },
          {
            label: 'replSetGetConfig',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/replSetGetConfig',
          },
          {
            label: 'replSetGetStatus',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/replSetGetStatus',
          },
          {
            label: 'replSetInitiate',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/replSetInitiate',
          },
          {
            label: 'replSetMaintenance',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/replSetMaintenance',
          },
          {
            label: 'replSetReconfig',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/replSetReconfig',
          },
          {
            label: 'replSetResizeOplog',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/replSetResizeOplog',
          },
          {
            label: 'replSetStepDown',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/replSetStepDown',
          },
          {
            label: 'replSetSyncFrom',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/replSetSyncFrom',
          },
        ],
      },
      {
        label: 'Sharding',
        contentSite: 'docs',
        url: '/docs/:version/reference/command/nav-sharding',
        collapsible: true,
        items: [
          {
            label: 'abortMoveCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/abortMoveCollection',
          },
          {
            label: 'abortReshardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/abortReshardCollection',
          },
          {
            label: 'abortRewriteCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/abortRewriteCollection',
            versions: { excludes: versionsBeforeV8_3 },
          },
          {
            label: 'abortUnshardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/abortUnshardCollection',
          },
          {
            label: 'addShard',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/addShard',
          },
          {
            label: 'addShardToZone',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/addShardToZone',
          },
          {
            label: 'analyzeShardKey',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/analyzeShardKey',
          },
          {
            label: 'balancerCollectionStatus',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/balancerCollectionStatus',
          },
          {
            label: 'balancerStart',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/balancerStart',
          },
          {
            label: 'balancerStatus',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/balancerStatus',
          },
          {
            label: 'balancerStop',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/balancerStop',
          },
          {
            label: 'checkMetadataConsistency',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/checkMetadataConsistency',
          },
          {
            label: 'clearJumboFlag',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/clearJumboFlag',
          },
          {
            label: 'cleanupOrphaned',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/cleanupOrphaned',
          },
          {
            label: 'cleanupReshardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/cleanupReshardCollection',
          },
          {
            label: 'commitReshardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/commitReshardCollection',
          },
          {
            label: 'commitShardRemoval',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/commitShardRemoval',
            versions: { excludes: versionsBeforeV8_3 },
          },
          {
            label: 'configureCollectionBalancing',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/configureCollectionBalancing',
          },
          {
            label: 'configureQueryAnalyzer',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/configureQueryAnalyzer',
          },
          {
            label: 'enableSharding',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/enableSharding',
          },
          {
            label: 'flushRouterConfig',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/flushRouterConfig',
          },
          {
            label: 'getShard Map',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/getShardMap',
          },
          {
            label: 'isdbgrid',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/isdbgrid',
          },
          {
            label: 'listShards',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/listShards',
          },
          {
            label: 'mergeAllChunksOnShard',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/mergeAllChunksOnShard',
          },
          {
            label: 'moveChunk',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/moveChunk',
          },
          {
            label: 'moveCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/moveCollection',
          },
          {
            label: 'movePrimary',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/movePrimary',
          },
          {
            label: 'moveRange',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/moveRange',
          },
          {
            label: 'mergeChunks',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/mergeChunks',
          },
          {
            label: 'refineCollectionShardKey',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/refineCollectionShardKey',
          },
          {
            label: 'removeShard',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/removeShard',
          },
          {
            label: 'removeShardFromZone',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/removeShardFromZone',
          },
          {
            label: 'reshardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/reshardCollection',
          },
          {
            label: 'rewriteCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/rewriteCollection',
            versions: { excludes: versionsBeforeV8_3 },
          },
          {
            label: 'setAllowMigrations',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/setAllowMigrations',
          },
          {
            label: 'shardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/shardCollection',
          },
          {
            label: 'shardDrainingStatus',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/shardDrainingStatus',
            versions: { excludes: versionsBeforeV8_3 },
          },
          {
            label: 'shardingState',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/shardingState',
          },
          {
            label: 'split',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/split',
          },
          {
            label: 'startShardDraining',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/startShardDraining',
            versions: { excludes: versionsBeforeV8_3 },
          },
          {
            label: 'transitionFromDedicatedConfigServer',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/transitionFromDedicatedConfigServer',
          },
          {
            label: 'transitionToDedicatedConfigServer',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/transitionToDedicatedConfigServer',
          },
          {
            label: 'unsetSharding',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/unsetSharding',
          },
          {
            label: 'unshardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/unshardCollection',
          },
          {
            label: 'updateZoneKeyRange',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/updateZoneKeyRange',
          },
        ],
      },
      {
        label: 'Sessions',
        contentSite: 'docs',
        url: '/docs/:version/reference/command/nav-sessions',
        collapsible: true,
        items: [
          {
            label: 'abortTransaction',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/abortTransaction',
          },
          {
            label: 'commitTransaction',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/commitTransaction',
          },
          {
            label: 'endSessions',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/endSessions',
          },
          {
            label: 'killAllSessions',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/killAllSessions',
          },
          {
            label: 'killAllSessionsByPattern',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/killAllSessionsByPattern',
          },
          {
            label: 'killSessions',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/killSessions',
          },
          {
            label: 'refreshSessions',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/refreshSessions',
          },
          {
            label: 'startSession',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/startSession',
          },
        ],
      },
      {
        label: 'Administration',
        contentSite: 'docs',
        url: '/docs/:version/reference/command/nav-administration',
        collapsible: true,
        items: [
          {
            label: 'autoCompact',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/autoCompact',
          },
          {
            label: 'bulkWrite',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/bulkWrite',
          },
          {
            label: 'cloneCollectionAsCapped',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/cloneCollectionAsCapped',
          },
          {
            label: 'collMod',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/collMod',
          },
          {
            label: 'compact',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/compact',
          },
          {
            label: 'compactStructuredEncryptionData',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/compactStructuredEncryptionData',
          },
          {
            label: 'convertToCapped',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/convertToCapped',
          },
          {
            label: 'create',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/create',
          },
          {
            label: 'createIndexes',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/createIndexes',
          },
          {
            label: 'currentOp',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/currentOp',
          },
          {
            label: 'drop',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/drop',
          },
          {
            label: 'dropDatabase',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/dropDatabase',
          },
          {
            label: 'dropConnections',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/dropConnections',
          },
          {
            label: 'dropIndexes',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/dropIndexes',
          },
          {
            label: 'filemd5',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/filemd5',
          },
          {
            label: 'fsync',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/fsync',
          },
          {
            label: 'fsyncUnlock',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/fsyncUnlock',
          },
          {
            label: 'getAuditConfig',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/getAuditConfig',
          },
          {
            label: 'getClusterParameter',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/getClusterParameter',
          },
          {
            label: 'getDefaultRWConcern',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/getDefaultRWConcern',
          },
          {
            label: 'getParameter',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/getParameter',
          },
          {
            label: 'killCursors',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/killCursors',
          },
          {
            label: 'killOp',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/killOp',
          },
          {
            label: 'listCollections',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/listCollections',
          },
          {
            label: 'listDatabases',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/listDatabases',
          },
          {
            label: 'listIndexes',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/listIndexes',
          },
          {
            label: 'logRotate',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/logRotate',
          },
          {
            label: 'reIndex',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/reIndex',
          },
          {
            label: 'removeQuerySettings',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/removeQuerySettings',
          },
          {
            label: 'renameCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/renameCollection',
          },
          {
            label: 'rotateCertificates',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/rotateCertificates',
          },
          {
            label: 'setAuditConfig',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/setAuditConfig',
          },
          {
            label: 'setClusterParameter',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/setClusterParameter',
          },
          {
            label: 'setFeatureCompatibilityVersion',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/setFeatureCompatibilityVersion',
          },
          {
            label: 'setIndexCommitQuorum',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/setIndexCommitQuorum',
          },
          {
            label: 'setParameter',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/setParameter',
          },
          {
            label: 'setDefaultRWConcern',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/setDefaultRWConcern',
          },
          {
            label: 'setQuerySettings',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/setQuerySettings',
          },
          {
            label: 'setUserWriteBlockMode',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/setUserWriteBlockMode',
          },
          {
            label: 'shutdown',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/shutdown',
          },
        ],
      },
      {
        label: 'Diagnostics',
        contentSite: 'docs',
        url: '/docs/:version/reference/command/nav-diagnostic',
        collapsible: true,
        items: [
          {
            label: 'buildInfo',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/buildInfo',
          },
          {
            label: 'collStats',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/collStats',
          },
          {
            label: 'connPoolStats',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/connPoolStats',
          },
          {
            label: 'connectionStatus',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/connectionStatus',
          },
          {
            label: 'dataSize',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/dataSize',
          },
          {
            label: 'dbHash',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/dbHash',
          },
          {
            label: 'dbStats',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/dbStats',
          },
          {
            label: 'explain',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/explain',
          },
          {
            label: 'getCmdLineOpts',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/getCmdLineOpts',
          },
          {
            label: 'getLog',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/getLog',
          },
          {
            label: 'hostInfo',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/hostInfo',
          },
          {
            label: 'listCommands',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/listCommands',
          },
          {
            label: 'lockInfo',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/lockInfo',
          },
          {
            label: 'ping',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/ping',
          },
          {
            label: 'profile',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/profile',
          },
          {
            label: 'serverStatus',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/serverStatus',
          },
          {
            label: 'shardConnPoolStats',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/shardConnPoolStats',
          },
          {
            label: 'top',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/top',
          },
          {
            label: 'validate',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/validate',
          },
          {
            label: 'validateDBMetadata',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/validateDBMetadata',
          },
          {
            label: 'whatsmyuri',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/whatsmyuri',
          },
        ],
      },
      {
        label: 'Auditing',
        contentSite: 'docs',
        url: '/docs/:version/reference/command/nav-auditing',
        collapsible: true,
        items: [
          {
            label: 'logApplicationMessage',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/logApplicationMessage',
          },
        ],
      },
      {
        label: 'Atlas Search',
        contentSite: 'docs',
        url: '/docs/:version/reference/command/nav-atlas-search',
        collapsible: true,
        items: [
          {
            label: 'createSearchIndexes',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/createSearchIndexes',
          },
          {
            label: 'dropSearchIndex',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/dropSearchIndex',
          },
          {
            label: 'updateSearchIndex',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/updateSearchIndex',
          },
        ],
      },
    ],
  },
  {
    label: 'DDL Operations',
    contentSite: 'docs',
    url: '/docs/:version/reference/ddl-operations',
  },
  {
    label: 'Default Port',
    contentSite: 'docs',
    url: '/docs/:version/reference/default-mongodb-port',
  },
  {
    label: 'Read & Write Concerns',
    contentSite: 'docs',
    url: '/docs/:version/reference/mongodb-defaults',
  },
  {
    label: 'Error Codes',
    contentSite: 'docs',
    url: '/docs/:version/reference/error-codes',
  },
  {
    label: 'Glossary',
    contentSite: 'docs',
    url: '/docs/:version/reference/glossary',
  },
  {
    label: 'Log Messages',
    contentSite: 'docs',
    url: '/docs/:version/reference/log-messages',
  },
  {
    label: 'Limits & Thresholds',
    contentSite: 'docs',
    url: '/docs/:version/reference/limits',
  },
  {
    label: 'MongoDB Database Tools',
    contentSite: 'database-tools',
    url: 'https://www.mongodb.com/docs/database-tools/',
  },
  {
    label: 'Wire Protocol',
    contentSite: 'docs',
    url: '/docs/:version/reference/mongodb-wire-protocol',
    collapsible: true,
    items: [
      {
        label: 'Legacy Opcodes',
        contentSite: 'docs',
        url: '/docs/:version/legacy-opcodes',
      },
    ],
  },
  {
    label: 'mongosh Methods',
    contentSite: 'docs',
    url: '/docs/:version/reference/method',
    collapsible: true,
    items: [
      {
        label: 'Atlas Search Index',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'db.collection.createSearchIndex',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.createSearchIndex',
          },
          {
            label: 'db.collection.dropSearchIndex',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.dropSearchIndex',
          },
          {
            label: 'db.collection.getSearchIndexes',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.getSearchIndexes',
          },
          {
            label: 'db.collection.updateSearchIndex',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.updateSearchIndex',
          },
        ],
      },
      {
        label: 'Atlas Stream Processing',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'sp.createStreamProcessor',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sp.createStreamProcessor',
          },
          {
            label: 'sp.listConnections',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sp.listConnections',
          },
          {
            label: 'sp.listStreamProcessors',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sp.listStreamProcessors',
          },
          {
            label: 'sp.process',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sp.process',
          },
          {
            label: 'sp.processor.drop',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sp.processor.drop',
          },
          {
            label: 'sp.processor.sample',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sp.processor.sample',
          },
          {
            label: 'sp.processor.start',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sp.processor.start',
          },
          {
            label: 'sp.processor.stats',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sp.processor.stats',
          },
          {
            label: 'sp.processor.stop',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sp.processor.stop',
          },
        ],
      },
      {
        label: 'Collections',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'db.collection.aggregate',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.aggregate',
          },
          {
            label: 'db.collection.analyzeShardKey',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.analyzeShardKey',
          },
          {
            label: 'db.collection.bulkWrite',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.bulkWrite',
          },
          {
            label: 'db.collection.compactStructuredEncryptionData',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.compactStructuredEncryptionData',
          },
          {
            label: 'db.collection.configureQueryAnalyzer',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.configureQueryAnalyzer',
          },
          {
            label: 'db.collection.count',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.count',
          },
          {
            label: 'db.collection.countDocuments',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.countDocuments',
          },
          {
            label: 'db.collection.createIndex',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.createIndex',
          },
          {
            label: 'db.collection.createIndexes',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.createIndexes',
          },
          {
            label: 'db.collection.dataSize',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.dataSize',
          },
          {
            label: 'db.collection.deleteMany',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.deleteMany',
          },
          {
            label: 'db.collection.deleteOne',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.deleteOne',
          },
          {
            label: 'db.collection.distinct',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.distinct',
          },
          {
            label: 'db.collection.drop',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.drop',
          },
          {
            label: 'db.collection.dropIndex',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.dropIndex',
          },
          {
            label: 'db.collection.dropIndexes',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.dropIndexes',
          },
          {
            label: 'db.collection.estimatedDocumentCount',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.estimatedDocumentCount',
          },
          {
            label: 'db.collection.explain',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.explain',
          },
          {
            label: 'db.collection.find',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.find',
          },
          {
            label: 'db.collection.findAndModify',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.findAndModify',
          },
          {
            label: 'db.collection.findOne',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.findOne',
          },
          {
            label: 'db.collection.findOneAndDelete',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.findOneAndDelete',
          },
          {
            label: 'db.collection.findOneAndReplace',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.findOneAndReplace',
          },
          {
            label: 'db.collection.findOneAndUpdate',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.findOneAndUpdate',
          },
          {
            label: 'db.collection.getIndexes',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.getIndexes',
          },
          {
            label: 'db.collection.getShardDistribution',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.getShardDistribution',
          },
          {
            label: 'db.collection.getShardVersion',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.getShardVersion',
          },
          {
            label: 'db.collection.hideIndex',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.hideIndex',
          },
          {
            label: 'db.collection.insert',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.insert',
          },
          {
            label: 'db.collection.insertMany',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.insertMany',
          },
          {
            label: 'db.collection.insertOne',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.insertOne',
          },
          {
            label: 'db.collection.isCapped',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.isCapped',
          },
          {
            label: 'db.collection.latencyStats',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.latencyStats',
          },
          {
            label: 'db.collection.mapReduce',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.mapReduce',
          },
          {
            label: 'db.collection.reIndex',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.reIndex',
          },
          {
            label: 'db.collection.remove',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.remove',
          },
          {
            label: 'db.collection.renameCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.renameCollection',
          },
          {
            label: 'db.collection.replaceOne',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.replaceOne',
          },
          {
            label: 'db.collection.stats',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.stats',
          },
          {
            label: 'db.collection.storageSize',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.storageSize',
          },
          {
            label: 'db.collection.totalIndexSize',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.totalIndexSize',
          },
          {
            label: 'db.collection.totalSize',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.totalSize',
          },
          {
            label: 'db.collection.unhideIndex',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.unhideIndex',
          },
          {
            label: 'db.collection.update',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.update',
          },
          {
            label: 'db.collection.updateMany',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.updateMany',
          },
          {
            label: 'db.collection.updateOne',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.updateOne',
          },
          {
            label: 'db.collection.validate',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.validate',
          },
          {
            label: 'db.collection.watch',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.watch',
          },
        ],
      },
      {
        label: 'Cursors',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'cursor.addOption',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.addOption',
          },
          {
            label: 'cursor.allowDiskUse',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.allowDiskUse',
          },
          {
            label: 'cursor.batchSize',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.batchSize',
          },
          {
            label: 'cursor.close',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.close',
          },
          {
            label: 'cursor.isClosed',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.isClosed',
          },
          {
            label: 'cursor.collation',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.collation',
          },
          {
            label: 'cursor.comment',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.comment',
          },
          {
            label: 'cursor.count',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.count',
          },
          {
            label: 'cursor.explain',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.explain',
          },
          {
            label: 'cursor.forEach',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.forEach',
          },
          {
            label: 'cursor.hasNext',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.hasNext',
          },
          {
            label: 'cursor.hint',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.hint',
          },
          {
            label: 'cursor.isExhausted',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.isExhausted',
          },
          {
            label: 'cursor.itcount',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.itcount',
          },
          {
            label: 'cursor.limit',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.limit',
          },
          {
            label: 'cursor.map',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.map',
          },
          {
            label: 'cursor.max',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.max',
          },
          {
            label: 'cursor.maxAwaitTimeMS',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.maxAwaitTimeMS',
          },
          {
            label: 'cursor.maxTimeMS',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.maxTimeMS',
          },
          {
            label: 'cursor.min',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.min',
          },
          {
            label: 'cursor.next',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.next',
          },
          {
            label: 'cursor.noCursorTimeout',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.noCursorTimeout',
          },
          {
            label: 'cursor.objsLeftInBatch',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.objsLeftInBatch',
          },
          {
            label: 'cursor.pretty',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.pretty',
          },
          {
            label: 'cursor.readConcern',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.readConcern',
          },
          {
            label: 'cursor.readPref',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.readPref',
          },
          {
            label: 'cursor.returnKey',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.returnKey',
          },
          {
            label: 'cursor.showRecordId',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.showRecordId',
          },
          {
            label: 'cursor.size',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.size',
          },
          {
            label: 'cursor.skip',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.skip',
          },
          {
            label: 'cursor.sort',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.sort',
          },
          {
            label: 'cursor.tailable',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.tailable',
          },
          {
            label: 'cursor.toArray',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.toArray',
          },
          {
            label: 'cursor.tryNext',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/cursor.tryNext',
          },
        ],
      },
      {
        label: 'Databases',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'db.adminCommand',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.adminCommand',
          },
          {
            label: 'db.aggregate',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.aggregate',
          },
          {
            label: 'db.commandHelp',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.commandHelp',
          },
          {
            label: 'db.createCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.createCollection',
          },
          {
            label: 'db.createView',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.createView',
          },
          {
            label: 'db.currentOp',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.currentOp',
          },
          {
            label: 'db.dropDatabase',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.dropDatabase',
          },
          {
            label: 'db.fsyncLock',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.fsyncLock',
          },
          {
            label: 'db.fsyncUnlock',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.fsyncUnlock',
          },
          {
            label: 'db.getCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.getCollection',
          },
          {
            label: 'db.getCollectionInfos',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.getCollectionInfos',
          },
          {
            label: 'db.getCollectionNames',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.getCollectionNames',
          },
          {
            label: 'db.getLogComponents',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.getLogComponents',
          },
          {
            label: 'db.getMongo',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.getMongo',
          },
          {
            label: 'db.getName',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.getName',
          },
          {
            label: 'db.getProfilingStatus',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.getProfilingStatus',
          },
          {
            label: 'db.getReplicationInfo',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.getReplicationInfo',
          },
          {
            label: 'db.getSiblingDB',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.getSiblingDB',
          },
          {
            label: 'db.hello',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.hello',
          },
          {
            label: 'db.help',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.help',
          },
          {
            label: 'db.hostInfo',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.hostInfo',
          },
          {
            label: 'db.killOp',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.killOp',
          },
          {
            label: 'db.listCommands',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.listCommands',
          },
          {
            label: 'db.logout',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.logout',
          },
          {
            label: 'db.printCollectionStats',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.printCollectionStats',
          },
          {
            label: 'db.printReplicationInfo',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.printReplicationInfo',
          },
          {
            label: 'db.printSecondaryReplicationInfo',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.printSecondaryReplicationInfo',
          },
          {
            label: 'db.printShardingStatus',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.printShardingStatus',
          },
          {
            label: 'db.rotateCertificates',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.rotateCertificates',
          },
          {
            label: 'db.runCommand',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.runCommand',
          },
          {
            label: 'db.serverBuildInfo',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.serverBuildInfo',
          },
          {
            label: 'db.serverCmdLineOpts',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.serverCmdLineOpts',
          },
          {
            label: 'db.serverStatus',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.serverStatus',
          },
          {
            label: 'db.setLogLevel',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.setLogLevel',
          },
          {
            label: 'db.setProfilingLevel',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.setProfilingLevel',
          },
          {
            label: 'db.shutdownServer',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.shutdownServer',
          },
          {
            label: 'db.stats',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.stats',
          },
          {
            label: 'db.version',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.version',
          },
          {
            label: 'db.watch',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.watch',
          },
        ],
      },
      {
        label: 'Query Plan Caches',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'db.collection.getPlanCache',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.getPlanCache',
          },
          {
            label: 'PlanCache.clear',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/PlanCache.clear',
          },
          {
            label: 'PlanCache.clearPlansByQuery',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/PlanCache.clearPlansByQuery',
          },
          {
            label: 'PlanCache.help',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/PlanCache.help',
          },
          {
            label: 'PlanCache.list',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/PlanCache.list',
          },
        ],
      },
      {
        label: 'Bulk Operations',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'db.collection.initializeOrderedBulkOp',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.initializeOrderedBulkOp',
          },
          {
            label: 'db.collection.initializeUnorderedBulkOp',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.initializeUnorderedBulkOp',
          },
          {
            label: 'Mongo.bulkWrite',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo.bulkWrite',
          },
          {
            label: 'Bulk',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk',
          },
          {
            label: 'Bulk.execute',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.execute',
          },
          {
            label: 'Bulk.find',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.find',
          },
          {
            label: 'Bulk.find.arrayFilters',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.find.arrayFilters',
          },
          {
            label: 'Bulk.find.collation',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.find.collation',
          },
          {
            label: 'Bulk.find.delete',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.find.delete',
          },
          {
            label: 'Bulk.find.deleteOne',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.find.deleteOne',
          },
          {
            label: 'Bulk.find.hint',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.find.hint',
          },
          {
            label: 'Bulk.find.remove',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.find.remove',
          },
          {
            label: 'Bulk.find.removeOne',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.find.removeOne',
          },
          {
            label: 'Bulk.find.replaceOne',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.find.replaceOne',
          },
          {
            label: 'Bulk.find.updateOne',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.find.updateOne',
          },
          {
            label: 'Bulk.find.update',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.find.update',
          },
          {
            label: 'Bulk.find.upsert',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.find.upsert',
          },
          {
            label: 'Bulk.getOperations',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.getOperations',
          },
          {
            label: 'Bulk.insert',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.insert',
          },
          {
            label: 'Bulk.tojson',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.tojson',
          },
          {
            label: 'Bulk.toString',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Bulk.toString',
          },
        ],
      },
      {
        label: 'User Management',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'db.auth',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.auth',
          },
          {
            label: 'db.changeUserPassword',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.changeUserPassword',
          },
          {
            label: 'db.createUser',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.createUser',
          },
          {
            label: 'db.dropUser',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.dropUser',
          },
          {
            label: 'db.dropAllUsers',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.dropAllUsers',
          },
          {
            label: 'db.getUser',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.getUser',
          },
          {
            label: 'db.getUsers',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.getUsers',
          },
          {
            label: 'db.grantRolesToUser',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.grantRolesToUser',
          },
          {
            label: 'db.removeUser',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.removeUser',
          },
          {
            label: 'db.revokeRolesFromUser',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.revokeRolesFromUser',
          },
          {
            label: 'db.updateUser',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.updateUser',
          },
          {
            label: 'passwordPrompt',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/passwordPrompt',
          },
        ],
      },
      {
        label: 'Role Management',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'db.createRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.createRole',
          },
          {
            label: 'db.dropRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.dropRole',
          },
          {
            label: 'db.dropAllRoles',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.dropAllRoles',
          },
          {
            label: 'db.getRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.getRole',
          },
          {
            label: 'db.getRoles',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.getRoles',
          },
          {
            label: 'db.grantPrivilegesToRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.grantPrivilegesToRole',
          },
          {
            label: 'db.revokePrivilegesFromRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.revokePrivilegesFromRole',
          },
          {
            label: 'db.grantRolesToRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.grantRolesToRole',
          },
          {
            label: 'db.revokeRolesFromRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.revokeRolesFromRole',
          },
          {
            label: 'db.updateRole',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.updateRole',
          },
        ],
      },
      {
        label: 'Replication',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'rs.add',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.add',
          },
          {
            label: 'rs.addArb',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.addArb',
          },
          {
            label: 'rs.conf',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.conf',
          },
          {
            label: 'rs.freeze',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.freeze',
          },
          {
            label: 'rs.help',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.help',
          },
          {
            label: 'rs.initiate',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.initiate',
          },
          {
            label: 'rs.printReplicationInfo',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.printReplicationInfo',
          },
          {
            label: 'rs.printSecondaryReplicationInfo',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.printSecondaryReplicationInfo',
          },
          {
            label: 'rs.reconfig',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.reconfig',
          },
          {
            label: 'rs.reconfigForPSASet',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.reconfigForPSASet',
          },
          {
            label: 'rs.remove',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.remove',
          },
          {
            label: 'rs.status',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.status',
          },
          {
            label: 'rs.stepDown',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.stepDown',
          },
          {
            label: 'rs.syncFrom',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/rs.syncFrom',
          },
        ],
      },
      {
        label: 'Sharding',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'convertShardKeyToHashed',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/convertShardKeyToHashed',
          },
          {
            label: 'db.checkMetadataConsistency',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.checkMetadataConsistency',
          },
          {
            label: 'db.collection.checkMetadataConsistency',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.checkMetadataConsistency',
          },
          {
            label: 'db.collection.getShardLocation',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/db.collection.getShardLocation',
            versions: { excludes: ['7.0', '8.0'] },
          },
          {
            label: 'sh.abortMoveCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.abortMoveCollection',
          },
          {
            label: 'sh.abortReshardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.abortReshardCollection',
          },
          {
            label: 'sh.abortUnshardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.abortUnshardCollection',
          },
          {
            label: 'sh.addShard',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.addShard',
          },
          {
            label: 'sh.addShardTag',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.addShardTag',
          },
          {
            label: 'sh.addShardToZone',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.addShardToZone',
          },
          {
            label: 'sh.addTagRange',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.addTagRange',
          },
          {
            label: 'sh.balancerCollectionStatus',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.balancerCollectionStatus',
          },
          {
            label: 'sh.checkMetadataConsistency',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.checkMetadataConsistency',
          },
          {
            label: 'sh.commitReshardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.commitReshardCollection',
          },
          {
            label: 'sh.disableAutoMerger',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.disableAutoMerger',
          },
          {
            label: 'sh.disableAutoSplit',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.disableAutoSplit',
          },
          {
            label: 'sh.disableBalancing',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.disableBalancing',
          },
          {
            label: 'sh.disableMigrations',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.disableMigrations',
          },
          {
            label: 'sh.enableAutoMerger',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.enableAutoMerger',
          },
          {
            label: 'sh.enableBalancing',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.enableBalancing',
          },
          {
            label: 'sh.enableAutoSplit',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.enableAutoSplit',
          },
          {
            label: 'sh.enableMigrations',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.enableMigrations',
          },
          {
            label: 'sh.enableSharding',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.enableSharding',
          },
          {
            label: 'sh.getBalancerState',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.getBalancerState',
          },
          {
            label: 'sh.getShardedDataDistribution',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.getShardedDataDistribution',
          },
          {
            label: 'sh.help',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.help',
          },
          {
            label: 'sh.isBalancerRunning',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.isBalancerRunning',
          },
          {
            label: 'sh.isConfigShardEnabled',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.isConfigShardEnabled',
          },
          {
            label: 'sh.listShards',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.listShards',
          },
          {
            label: 'sh.moveChunk',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.moveChunk',
          },
          {
            label: 'sh.moveCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.moveCollection',
          },
          {
            label: 'sh.moveRange',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.moveRange',
          },
          {
            label: 'sh.removeRangeFromZone',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.removeRangeFromZone',
          },
          {
            label: 'sh.removeShardTag',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.removeShardTag',
          },
          {
            label: 'sh.removeShardFromZone',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.removeShardFromZone',
          },
          {
            label: 'sh.removeTagRange',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.removeTagRange',
          },
          {
            label: 'sh.reshardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.reshardCollection',
          },
          {
            label: 'sh.setBalancerState',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.setBalancerState',
          },
          {
            label: 'sh.shardAndDistributeCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.shardAndDistributeCollection',
          },
          {
            label: 'sh.shardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.shardCollection',
          },
          {
            label: 'sh.splitAt',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.splitAt',
          },
          {
            label: 'sh.splitFind',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.splitFind',
          },
          {
            label: 'sh.startAutoMerger',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.startAutoMerger',
          },
          {
            label: 'sh.startBalancer',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.startBalancer',
          },
          {
            label: 'sh.status',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.status',
          },
          {
            label: 'sh.stopAutoMerger',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.stopAutoMerger',
          },
          {
            label: 'sh.stopBalancer',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.stopBalancer',
          },
          {
            label: 'sh.unshardCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.unshardCollection',
          },
          {
            label: 'sh.updateZoneKeyRange',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.updateZoneKeyRange',
          },
          {
            label: 'sh.waitForBalancer',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.waitForBalancer',
          },
          {
            label: 'sh.waitForBalancerOff',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.waitForBalancerOff',
          },
          {
            label: 'sh.waitForPingChange',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/sh.waitForPingChange',
          },
        ],
      },
      {
        label: 'Object Constructors',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'Binary.createFromBase64',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Binary.createFromBase64',
          },
          {
            label: 'Binary.createFromHexString',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Binary.createFromHexString',
          },
          {
            label: 'BinData',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/BinData',
          },
          {
            label: 'BSONRegExp',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/BSONRegExp',
          },
          {
            label: 'BulkWriteResult',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/BulkWriteResult',
          },
          {
            label: 'Date',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Date',
          },
          {
            label: 'HexData',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/HexData',
          },
          {
            label: 'ObjectId',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/ObjectId',
          },
          {
            label: 'ObjectId.createFromBase64',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/ObjectId.createFromBase64',
          },
          {
            label: 'ObjectId.createFromHexString',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/ObjectId.createFromHexString',
          },
          {
            label: 'ObjectId.getTimestamp',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/ObjectId.getTimestamp',
          },
          {
            label: 'ObjectId.toString',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/ObjectId.toString',
          },
          {
            label: 'UUID',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/UUID',
          },
          {
            label: 'WriteResult',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/WriteResult',
          },
        ],
      },
      {
        label: 'Connections',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'connect',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/connect',
          },
          {
            label: 'Mongo',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo',
          },
          {
            label: 'Mongo.getDB',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo.getDB',
          },
          {
            label: 'Mongo.getDBNames',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo.getDBNames',
          },
          {
            label: 'Mongo.getDBs',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo.getDBs',
          },
          {
            label: 'Mongo.getReadPrefMode',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo.getReadPrefMode',
          },
          {
            label: 'Mongo.getReadPrefTagSet',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo.getReadPrefTagSet',
          },
          {
            label: 'Mongo.getURI',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo.getURI',
          },
          {
            label: 'Mongo.getWriteConcern',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo.getWriteConcern',
          },
          {
            label: 'Mongo.setCausalConsistency',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo.setCausalConsistency',
          },
          {
            label: 'Mongo.setReadPref',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo.setReadPref',
          },
          {
            label: 'Mongo.startSession',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo.startSession',
          },
          {
            label: 'Mongo.setWriteConcern',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo.setWriteConcern',
          },
          {
            label: 'Mongo.watch',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Mongo.watch',
          },
          {
            label: 'Session',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/Session',
            collapsible: true,
            items: [
              {
                label: 'Session.abortTransaction()',
                contentSite: 'docs',
                url: '/docs/:version/reference/method/Session.abortTransaction',
              },
              {
                label: 'Session.commitTransaction()',
                contentSite: 'docs',
                url: '/docs/:version/reference/method/Session.commitTransaction',
              },
              {
                label: 'Session.startTransaction()',
                contentSite: 'docs',
                url: '/docs/:version/reference/method/Session.startTransaction',
              },
              {
                label: 'Session.withTransaction()',
                contentSite: 'docs',
                url: '/docs/:version/reference/method/Session.withTransaction',
              },
            ],
          },
          {
            label: 'SessionOptions',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/SessionOptions',
          },
        ],
      },
      {
        label: 'In-Use Encryption',
        contentSite: 'docs',
        collapsible: true,
        items: [
          {
            label: 'ClientEncryption.createEncryptedCollection',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/ClientEncryption.createEncryptedCollection',
          },
          {
            label: 'ClientEncryption.encrypt',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/ClientEncryption.encrypt',
          },
          {
            label: 'ClientEncryption.encryptExpression',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/ClientEncryption.encryptExpression',
          },
          {
            label: 'ClientEncryption.decrypt',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/ClientEncryption.decrypt',
          },
          {
            label: 'getClientEncryption',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/getClientEncryption',
          },
          {
            label: 'getKeyVault',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/getKeyVault',
          },
          {
            label: 'KeyVault.addKeyName',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/KeyVault.addKeyName',
          },
          {
            label: 'KeyVault.addKeyAlternateName',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/KeyVault.addKeyAlternateName',
          },
          {
            label: 'KeyVault.createDataKey',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/KeyVault.createDataKey',
          },
          {
            label: 'KeyVault.createKey',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/KeyVault.createKey',
          },
          {
            label: 'KeyVault.deleteKey',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/KeyVault.deleteKey',
          },
          {
            label: 'KeyVault.getKey',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/KeyVault.getKey',
          },
          {
            label: 'KeyVault.getKeys',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/KeyVault.getKeys',
          },
          {
            label: 'KeyVault.getKeyByAltName',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/KeyVault.getKeyByAltName',
          },
          {
            label: 'KeyVault.removeKeyAlternateName',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/KeyVault.removeKeyAlternateName',
          },
          {
            label: 'KeyVault.removeKeyAltName',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/KeyVault.removeKeyAltName',
          },
          {
            label: 'KeyVault.rewrapManyDataKey',
            contentSite: 'docs',
            url: '/docs/:version/reference/method/KeyVault.rewrapManyDataKey',
          },
        ],
      },
    ],
  },
  {
    label: 'Query Language',
    contentSite: 'docs',
    url: '/docs/:version/reference/mql',
    collapsible: true,
    items: [
      {
        label: 'CRUD Commands',
        contentSite: 'docs',
        url: '/docs/:version/reference/mql/crud-commands',
        collapsible: true,
        items: [
          {
            label: 'aggregate',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/aggregate',
          },
          {
            label: 'bulkWrite',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/bulkWrite',
          },
          {
            label: 'count',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/count',
          },
          {
            label: 'delete',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/delete',
          },
          {
            label: 'distinct',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/distinct',
          },
          {
            label: 'find',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/find',
          },
          {
            label: 'findAndModify',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/findAndModify',
          },
          {
            label: 'getMore',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/getMore',
          },
          {
            label: 'insert',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/insert',
          },
          {
            label: 'mapReduce',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/mapReduce',
          },
          {
            label: 'update',
            contentSite: 'docs',
            url: '/docs/:version/reference/command/update',
          },
        ],
      },
      {
        label: 'Aggregation Stages',
        contentSite: 'docs',
        url: '/docs/:version/reference/mql/aggregation-stages',
        collapsible: true,
        items: [
          {
            label: '$addFields',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/addFields',
          },
          {
            label: '$bucket',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/bucket',
          },
          {
            label: '$bucketAuto',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/bucketAuto',
          },
          {
            label: '$changeStream',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/changeStream',
          },
          {
            label: '$changeStreamSplitLargeEvent',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/changeStreamSplitLargeEvent',
          },
          {
            label: '$collStats',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/collStats',
          },
          {
            label: '$count',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/count',
          },
          {
            label: '$currentOp',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/currentOp',
          },
          {
            label: '$densify',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/densify',
          },
          {
            label: '$documents',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/documents',
          },
          {
            label: '$facet',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/facet',
          },
          {
            label: '$fill',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/fill',
          },
          {
            label: '$geoNear',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/geoNear',
          },
          {
            label: '$graphLookup',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/graphLookup',
          },
          {
            label: '$group',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/group',
          },
          {
            label: '$indexStats',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/indexStats',
          },
          {
            label: '$limit',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/limit',
          },
          {
            label: '$listClusterCatalog',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/listClusterCatalog',
          },
          {
            label: '$listLocalSessions',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/listLocalSessions',
          },
          {
            label: '$listSampledQueries',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/listSampledQueries',
          },
          {
            label: '$listSearchIndexes',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/listSearchIndexes',
          },
          {
            label: '$listSessions',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/listSessions',
          },
          {
            label: '$lookup',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/lookup',
          },
          {
            label: '$match',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/match',
          },
          {
            label: '$merge',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/merge',
          },
          {
            label: '$out',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/out',
          },
          {
            label: '$planCacheStats',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/planCacheStats',
          },
          {
            label: '$project',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/project',
          },
          {
            label: '$querySettings',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/querySettings',
          },
          {
            label: '$queryStats',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/queryStats',
            collapsible: true,
            items: [
              {
                label: 'Toggle Log Output',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/aggregation/queryStats/toggle-logging',
              },
            ],
          },
          {
            label: '$rankFusion',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/rankFusion',
          },
          {
            label: '$redact',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/redact',
            collapsible: true,
            items: [
              {
                label: 'Use Field Level Redaction',
                contentSite: 'docs',
                url: '/docs/:version/tutorial/implement-field-level-redaction',
              },
            ],
          },
          {
            label: '$replaceRoot',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/replaceRoot',
          },
          {
            label: '$replaceWith',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/replaceWith',
          },
          {
            label: '$sample',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/sample',
          },
          {
            label: '$score',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/score',
          },
          {
            label: '$scoreFusion',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/scoreFusion',
          },
          {
            label: '$search',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/search',
          },
          {
            label: '$searchMeta',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/searchMeta',
          },
          {
            label: '$set',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/set',
          },
          {
            label: '$setWindowFields',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/setWindowFields',
          },
          {
            label: '$shardedDataDistribution',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/shardedDataDistribution',
          },
          {
            label: '$skip',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/skip',
          },
          {
            label: '$sort',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/sort',
          },
          {
            label: '$sortByCount',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/sortByCount',
          },
          {
            label: '$unionWith',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/unionWith',
          },
          {
            label: '$unset',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/unset',
          },
          {
            label: '$unwind',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/unwind',
          },
          {
            label: '$vectorSearch',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/vectorSearch',
          },
        ],
      },
      {
        label: 'Query Predicates',
        contentSite: 'docs',
        url: '/docs/:version/reference/mql/query-predicates',
        collapsible: true,
        items: [
          {
            label: 'Arrays',
            contentSite: 'docs',
            url: '/docs/:version/reference/mql/query-predicates/arrays',
            collapsible: true,
            items: [
              {
                label: '$all',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/all',
              },
              {
                label: '$elemMatch',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/elemMatch',
              },
              {
                label: '$size',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/size',
              },
            ],
          },
          {
            label: 'Bitwise',
            contentSite: 'docs',
            url: '/docs/:version/reference/mql/query-predicates/bitwise',
            collapsible: true,
            items: [
              {
                label: '$bitsAllClear',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/bitsAllClear',
              },
              {
                label: '$bitsAllSet',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/bitsAllSet',
              },
              {
                label: '$bitsAnyClear',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/bitsAnyClear',
              },
              {
                label: '$bitsAnySet',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/bitsAnySet',
              },
            ],
          },
          {
            label: 'Comparison',
            contentSite: 'docs',
            url: '/docs/:version/reference/mql/query-predicates/comparison',
            collapsible: true,
            items: [
              {
                label: '$eq',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/eq',
              },
              {
                label: '$gt',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/gt',
              },
              {
                label: '$gte',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/gte',
              },
              {
                label: '$in',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/in',
              },
              {
                label: '$lt',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/lt',
              },
              {
                label: '$lte',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/lte',
              },
              {
                label: '$ne',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/ne',
              },
              {
                label: '$nin',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/nin',
              },
            ],
          },
          {
            label: 'Data Type',
            contentSite: 'docs',
            url: '/docs/:version/reference/mql/query-predicates/data-type',
            collapsible: true,
            items: [
              {
                label: '$exists',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/exists',
              },
              {
                label: '$type',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/type',
              },
            ],
          },
          {
            label: 'Geospatial',
            contentSite: 'docs',
            url: '/docs/:version/reference/mql/query-predicates/geospatial',
            collapsible: true,
            items: [
              {
                label: '$box',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/box',
              },
              {
                label: '$center',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/center',
              },
              {
                label: '$centerSphere',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/centerSphere',
              },
              {
                label: '$geoIntersects',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/geoIntersects',
              },
              {
                label: '$geometry',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/geometry',
              },
              {
                label: '$geoWithin',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/geoWithin',
              },
              {
                label: '$maxDistance',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/maxDistance',
              },
              {
                label: '$minDistance',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/minDistance',
              },
              {
                label: '$near',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/near',
              },
              {
                label: '$nearSphere',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/nearSphere',
              },
              {
                label: '$polygon',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/polygon',
              },
            ],
          },
          {
            label: 'Logical',
            contentSite: 'docs',
            url: '/docs/:version/reference/mql/query-predicates/logical',
            collapsible: true,
            items: [
              {
                label: '$and',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/and',
              },
              {
                label: '$nor',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/nor',
              },
              {
                label: '$not',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/not',
              },
              {
                label: '$or',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/or',
              },
            ],
          },
          {
            label: 'Miscellaneous',
            contentSite: 'docs',
            url: '/docs/:version/reference/mql/query-predicates/misc',
            collapsible: true,
            items: [
              {
                label: '$expr',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/expr',
              },
              {
                label: '$jsonSchema',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/jsonSchema',
              },
              {
                label: '$mod',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/mod',
              },
              {
                label: '$regex',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/regex',
              },
              {
                label: '$where',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/query/where',
              },
            ],
          },
        ],
      },
      {
        label: 'Expressions',
        contentSite: 'docs',
        url: '/docs/:version/reference/mql/expressions',
        collapsible: true,
        items: [
          {
            label: '$abs',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/abs',
          },
          {
            label: '$acos',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/acos',
          },
          {
            label: '$acosh',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/acosh',
          },
          {
            label: '$add',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/add',
          },
          {
            label: '$allElementsTrue',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/allElementsTrue',
          },
          {
            label: '$and',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/and',
          },
          {
            label: '$anyElementTrue',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/anyElementTrue',
          },
          {
            label: '$arrayElemAt',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/arrayElemAt',
          },
          {
            label: '$arrayToObject',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/arrayToObject',
          },
          {
            label: '$asin',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/asin',
          },
          {
            label: '$asinh',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/asinh',
          },
          {
            label: '$atan',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/atan',
          },
          {
            label: '$atan2',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/atan2',
          },
          {
            label: '$atanh',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/atanh',
          },
          {
            label: '$binarySize',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/binarySize',
          },
          {
            label: '$bitAnd',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/bitAnd',
          },
          {
            label: '$bitNot',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/bitNot',
          },
          {
            label: '$bitOr',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/bitOr',
          },
          {
            label: '$bitXor',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/bitXor',
          },
          {
            label: '$bsonSize',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/bsonSize',
          },
          {
            label: '$ceil',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/ceil',
          },
          {
            label: '$cmp',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/cmp',
          },
          {
            label: '$concat',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/concat',
          },
          {
            label: '$concatArrays',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/concatArrays',
          },
          {
            label: '$cond',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/cond',
          },
          {
            label: '$convert',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/convert',
          },
          {
            label: '$cos',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/cos',
          },
          {
            label: '$cosh',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/cosh',
          },
          {
            label: '$covariancePop',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/covariancePop',
          },
          {
            label: '$covarianceSamp',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/covarianceSamp',
          },
          {
            label: '$dateAdd',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/dateAdd',
          },
          {
            label: '$dateDiff',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/dateDiff',
          },
          {
            label: '$dateFromParts',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/dateFromParts',
          },
          {
            label: '$dateFromString',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/dateFromString',
          },
          {
            label: '$dateSubtract',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/dateSubtract',
          },
          {
            label: '$dateToParts',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/dateToParts',
          },
          {
            label: '$dateToString',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/dateToString',
          },
          {
            label: '$dateTrunc',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/dateTrunc',
          },
          {
            label: '$dayOfMonth',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/dayOfMonth',
          },
          {
            label: '$dayOfWeek',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/dayOfWeek',
          },
          {
            label: '$dayOfYear',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/dayOfYear',
          },
          {
            label: '$degreesToRadians',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/degreesToRadians',
          },
          {
            label: '$denseRank',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/denseRank',
          },
          {
            label: '$derivative',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/derivative',
          },
          {
            label: '$divide',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/divide',
          },
          {
            label: '$documentNumber',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/documentNumber',
          },
          {
            label: '$encStrContains',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/encStrContains',
            versions: { excludes: versionsBeforeV8_2 },
          },
          {
            label: '$encStrEndsWith',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/encStrEndsWith',
            versions: { excludes: versionsBeforeV8_2 },
          },
          {
            label: '$encStrNormalizedEq',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/encStrNormalizedEq',
            versions: { excludes: versionsBeforeV8_2 },
          },
          {
            label: '$encStrStartsWith',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/encStrStartsWith',
            versions: { excludes: versionsBeforeV8_2 },
          },
          {
            label: '$eq',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/eq',
          },
          {
            label: '$exp',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/exp',
          },
          {
            label: '$expMovingAvg',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/expMovingAvg',
          },
          {
            label: '$filter',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/filter',
          },
          {
            label: '$floor',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/floor',
          },
          {
            label: '$function',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/function',
          },
          {
            label: '$getField',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/getField',
          },
          {
            label: '$gt',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/gt',
          },
          {
            label: '$gte',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/gte',
          },
          {
            label: '$hour',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/hour',
          },
          {
            label: '$ifNull',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/ifNull',
          },
          {
            label: '$in',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/in',
          },
          {
            label: '$indexOfArray',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/indexOfArray',
          },
          {
            label: '$indexOfBytes',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/indexOfBytes',
          },
          {
            label: '$indexOfCP',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/indexOfCP',
          },
          {
            label: '$integral',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/integral',
          },
          {
            label: '$isArray',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/isArray',
          },
          {
            label: '$isNumber',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/isNumber',
          },
          {
            label: '$isoDayOfWeek',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/isoDayOfWeek',
          },
          {
            label: '$isoWeek',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/isoWeek',
          },
          {
            label: '$isoWeekYear',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/isoWeekYear',
          },
          {
            label: '$let',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/let',
          },
          {
            label: '$linearFill',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/linearFill',
          },
          {
            label: '$literal',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/literal',
          },
          {
            label: '$ln',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/ln',
          },
          {
            label: '$locf',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/locf',
          },
          {
            label: '$log',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/log',
          },
          {
            label: '$log10',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/log10',
          },
          {
            label: '$lt',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/lt',
          },
          {
            label: '$lte',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/lte',
          },
          {
            label: '$ltrim',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/ltrim',
          },
          {
            label: '$map',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/map',
          },
          {
            label: '$maxN-array-element',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/maxN-array-element',
          },
          {
            label: '$meta',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/meta',
          },
          {
            label: '$minN-array-element',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/minN-array-element',
          },
          {
            label: '$minMaxScaler',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/minMaxScaler',
          },
          {
            label: '$millisecond',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/millisecond',
          },
          {
            label: '$minute',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/minute',
          },
          {
            label: '$mod',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/mod',
          },
          {
            label: '$month',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/month',
          },
          {
            label: '$multiply',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/multiply',
          },
          {
            label: '$ne',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/ne',
          },
          {
            label: '$not',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/not',
          },
          {
            label: '$objectToArray',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/objectToArray',
          },
          {
            label: '$or',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/or',
          },
          {
            label: '$pow',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/pow',
          },
          {
            label: '$radiansToDegrees',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/radiansToDegrees',
          },
          {
            label: '$rand',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/rand',
          },
          {
            label: '$range',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/range',
          },
          {
            label: '$rank',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/rank',
          },
          {
            label: '$reduce',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/reduce',
          },
          {
            label: '$regexFind',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/regexFind',
          },
          {
            label: '$regexFindAll',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/regexFindAll',
          },
          {
            label: '$regexMatch',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/regexMatch',
          },
          {
            label: '$replaceOne',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/replaceOne',
          },
          {
            label: '$replaceAll',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/replaceAll',
          },
          {
            label: '$reverseArray',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/reverseArray',
          },
          {
            label: '$round',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/round',
          },
          {
            label: '$rtrim',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/rtrim',
          },
          {
            label: '$sampleRate',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/sampleRate',
          },
          {
            label: '$second',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/second',
          },
          {
            label: '$setDifference',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/setDifference',
          },
          {
            label: '$setEquals',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/setEquals',
          },
          {
            label: '$setField',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/setField',
          },
          {
            label: '$setIntersection',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/setIntersection',
          },
          {
            label: '$setIsSubset',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/setIsSubset',
          },
          {
            label: '$setUnion',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/setUnion',
          },
          {
            label: '$shift',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/shift',
          },
          {
            label: '$sigmoid',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/sigmoid',
          },
          {
            label: '$size',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/size',
          },
          {
            label: '$sin',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/sin',
          },
          {
            label: '$sinh',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/sinh',
          },
          {
            label: '$slice',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/slice',
          },
          {
            label: '$sortArray',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/sortArray',
          },
          {
            label: '$split',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/split',
          },
          {
            label: '$sqrt',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/sqrt',
          },
          {
            label: '$strcasecmp',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/strcasecmp',
          },
          {
            label: '$strLenBytes',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/strLenBytes',
          },
          {
            label: '$strLenCP',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/strLenCP',
          },
          {
            label: '$substr',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/substr',
          },
          {
            label: '$substrBytes',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/substrBytes',
          },
          {
            label: '$substrCP',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/substrCP',
          },
          {
            label: '$subtract',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/subtract',
          },
          {
            label: '$switch',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/switch',
          },
          {
            label: '$tan',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/tan',
          },
          {
            label: '$tanh',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/tanh',
          },
          {
            label: '$toBool',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/toBool',
          },
          {
            label: '$toDate',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/toDate',
          },
          {
            label: '$toDecimal',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/toDecimal',
          },
          {
            label: '$toDouble',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/toDouble',
          },
          {
            label: '$toHashedIndexKey',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/toHashedIndexKey',
          },
          {
            label: '$toInt',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/toInt',
          },
          {
            label: '$toLong',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/toLong',
          },
          {
            label: '$toObjectId',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/toObjectId',
          },
          {
            label: '$toString',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/toString',
          },
          {
            label: '$toLower',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/toLower',
          },
          {
            label: '$toUpper',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/toUpper',
          },
          {
            label: '$toUUID',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/toUUID',
          },
          {
            label: '$tsIncrement',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/tsIncrement',
          },
          {
            label: '$tsSecond',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/tsSecond',
          },
          {
            label: '$trim',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/trim',
          },
          {
            label: '$trunc',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/trunc',
          },
          {
            label: '$type',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/type',
          },
          {
            label: '$unsetField',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/unsetField',
          },
          {
            label: '$week',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/week',
          },
          {
            label: '$year',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/year',
          },
          {
            label: '$zip',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/zip',
          },
        ],
      },
      {
        label: 'Projection',
        contentSite: 'docs',
        url: '/docs/:version/reference/mql/projection',
        collapsible: true,
        items: [
          {
            label: '$',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/projection/positional',
          },
          {
            label: '$elemMatch',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/projection/elemMatch',
          },
          {
            label: '$slice',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/projection/slice',
          },
        ],
      },
      {
        label: 'Accumulators',
        contentSite: 'docs',
        url: '/docs/:version/reference/mql/accumulators',
        collapsible: true,
        items: [
          {
            label: '$accumulator',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/accumulator',
          },
          {
            label: '$addToSet',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/addToSet',
          },
          {
            label: '$avg',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/avg',
          },
          {
            label: '$bottom',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/bottom',
          },
          {
            label: '$bottomN',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/bottomN',
          },
          {
            label: '$count',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/count-accumulator',
          },
          {
            label: '$first',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/first',
          },
          {
            label: '$firstN',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/firstN',
          },
          {
            label: '$last',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/last',
          },
          {
            label: '$lastN',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/lastN',
          },
          {
            label: '$max',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/max',
          },
          {
            label: '$maxN',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/maxN',
          },
          {
            label: '$median',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/median',
          },
          {
            label: '$mergeObjects',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/mergeObjects',
          },
          {
            label: '$min',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/min',
          },
          {
            label: '$minN',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/minN',
          },
          {
            label: '$percentile',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/percentile',
          },
          {
            label: '$push',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/push',
          },
          {
            label: '$stdDevPop',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/stdDevPop',
          },
          {
            label: '$stdDevSamp',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/stdDevSamp',
          },
          {
            label: '$sum',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/sum',
          },
          {
            label: '$top',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/top',
          },
          {
            label: '$topN',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/aggregation/topN',
          },
        ],
      },
      {
        label: 'Update',
        contentSite: 'docs',
        url: '/docs/:version/reference/mql/update',
        collapsible: true,
        items: [
          {
            label: 'Arrays',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/update-array',
            collapsible: true,
            items: [
              {
                label: '$ (update)',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/positional',
              },
              {
                label: '$[]',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/positional-all',
              },
              {
                label: '$[<identifier>]',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/positional-filtered',
              },
              {
                label: '$addToSet',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/addToSet',
              },
              {
                label: '$pop',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/pop',
              },
              {
                label: '$pull',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/pull',
              },
              {
                label: '$push',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/push',
              },
              {
                label: '$pullAll',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/pullAll',
              },
              {
                label: '$each',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/each',
              },
              {
                label: '$position',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/position',
              },
              {
                label: '$slice',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/slice',
              },
              {
                label: '$sort',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/sort',
              },
            ],
          },
          {
            label: 'Bitwise',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/update-bitwise',
            collapsible: true,
            items: [
              {
                label: '$bit',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/bit',
              },
            ],
          },
          {
            label: 'Fields',
            contentSite: 'docs',
            url: '/docs/:version/reference/operator/update-field',
            collapsible: true,
            items: [
              {
                label: '$currentDate',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/currentDate',
              },
              {
                label: '$inc',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/inc',
              },
              {
                label: '$min',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/min',
              },
              {
                label: '$max',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/max',
              },
              {
                label: '$mul',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/mul',
              },
              {
                label: '$rename',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/rename',
              },
              {
                label: '$set',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/set',
              },
              {
                label: '$setOnInsert',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/setOnInsert',
              },
              {
                label: '$unset',
                contentSite: 'docs',
                url: '/docs/:version/reference/operator/update/unset',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Server Sessions',
    contentSite: 'docs',
    url: '/docs/:version/reference/server-sessions',
  },
  {
    label: 'Slot-Based Query Execution Engine',
    contentSite: 'docs',
    url: '/docs/:version/reference/sbe',
  },
  {
    label: 'Stable API',
    contentSite: 'docs',
    url: '/docs/:version/reference/stable-api',
    collapsible: true,
    items: [
      {
        label: 'Migrate to Later Version',
        contentSite: 'docs',
        url: '/docs/:version/reference/stable-api-reference',
      },
      {
        label: 'Changelog',
        contentSite: 'docs',
        url: '/docs/:version/reference/stable-api-changelog',
      },
    ],
  },
  {
    label: 'System Collections',
    contentSite: 'docs',
    url: '/docs/:version/reference/system-collections',
  },
  {
    label: 'Legacy mongo Shell',
    contentSite: 'docs',
    url: '/docs/:version/reference/mongo',
  },
  {
    label: 'BSON Types',
    contentSite: 'docs',
    url: '/docs/:version/reference/bson-types',
    collapsible: true,
    items: [
      {
        label: 'Comparison and Sort Order',
        contentSite: 'docs',
        url: '/docs/:version/reference/bson-type-comparison-order',
      },
      {
        label: 'Migrate Undefined Data and Queries',
        contentSite: 'docs',
        url: '/docs/:version/reference/bson-types/migrate-undefined',
      },
      {
        label: 'Extended JSON (v2)',
        contentSite: 'docs',
        url: '/docs/:version/reference/mongodb-extended-json',
      },
      {
        label: 'Extended JSON (v1)',
        contentSite: 'docs',
        url: '/docs/:version/reference/mongodb-extended-json-v1',
      },
    ],
  },
];

export default tocData;
