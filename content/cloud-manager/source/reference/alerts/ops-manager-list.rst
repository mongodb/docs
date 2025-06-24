
.. _alerts-list-agent:

Agent
-----

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: AUTOMATION_AGENT_DOWN 
     - {+aagent+} is down
     - Project, Global

   * - .. alert:: AUTOMATION_AGENT_UP 
     - {+aagent+} is up
     - Project, Global

   * - .. alert:: BACKUP_AGENT_CONF_CALL_FAILURE 
     - {+bagent+} has too many conf call failures
     - Project, Global

   * - .. alert:: BACKUP_AGENT_DOWN 
     - {+bagent+} is down
     - Project, Global

   * - .. alert:: BACKUP_AGENT_UP 
     - {+bagent+} is up
     - Project, Global

   * - .. alert:: BACKUP_AGENT_VERSION_BEHIND 
     - {+bagent+} does not have the latest version
     - Project, Global

   * - .. alert:: BACKUP_AGENT_VERSION_CURRENT 
     - {+bagent+} has the latest version
     - Project, Global

   * - .. alert:: MONITORING_AGENT_DOWN 
     - {+magent+} is down
     - Project, Global

   * - .. alert:: MONITORING_AGENT_UP 
     - {+magent+} is up
     - Project, Global

   * - .. alert:: MONITORING_AGENT_VERSION_BEHIND 
     - {+magent+} does not have the latest version
     - Project, Global

   * - .. alert:: MONITORING_AGENT_VERSION_CURRENT 
     - {+magent+} has the latest version
     - Project, Global

   * - .. alert:: NEW_AGENT 
     - New agent
     - Project, Global

.. _alerts-list-auto-config:

Automation Configuration
------------------------

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: AUTOMATION_CONFIG_PUBLISHED_AUDIT 
     - Deployment configuration published
     - Project, Global

.. _alerts-list-backup:

Backup
------

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: BAD_CLUSTERSHOTS 
     - Backup has possibly inconsistent cluster snapshots
     - Project, Global

   * - .. alert:: CLUSTER_DENYLIST_UPDATED_AUDIT 
     - Excluded namespaces were modified for cluster
     - Project, Global

   * - .. alert:: CLUSTER_CHECKKPOINT_UPDATED_AUDIT 
     - Checkpoint interval updated for cluster
     - Project, Global

   * - .. alert:: CLUSTER_CREDENTIAL_UPDATED_AUDIT 
     - Backup authentication credentials updated for cluster
     - Project, Global

   * - .. alert:: CLUSTER_SNAPSHOT_SCHEDULE_UPDATED_AUDIT 
     - Snapshot schedule updated for cluster
     - Project, Global

   * - .. alert:: CLUSTER_STATE_CHANGED_AUDIT 
     - Cluster backup state is now 
     - Project, Global

   * - .. alert:: CLUSTER_STORAGE_ENGINE_UPDATED_AUDIT 
     - Cluster storage engine has been updated
     - Project, Global

   * - .. alert:: CLUSTERSHOT_DELETED_AUDIT 
     - Cluster snapshot has been deleted
     - Project, Global

   * - .. alert:: CLUSTERSHOT_EXPIRY_UPDATED_AUDIT 
     - Clustershot expiry has been updated.
     - Project, Global

   * - .. alert:: CONSISTENT_BACKUP_CONFIGURATION 
     - Backup configuration is consistent
     - Project, Global

   * - .. alert:: GOOD_CLUSTERSHOT 
     - Backup has a good clustershot
     - Project, Global

   * - .. alert:: INCONSISTENT_BACKUP_CONFIGURATION 
     - Inconsistent backup configuration has been detected
     - Project, Global

   * - .. alert:: INITIAL_SYNC_FINISHED_AUDIT 
     - Backup initial sync finished
     - Project, Global

   * - .. alert:: INITIAL_SYNC_STARTED_AUDIT 
     - Backup initial sync started
     - Project, Global

   * - .. alert:: OPLOG_BEHIND 
     - Backup oplog is behind
     - Project, Global

   * - .. alert:: OPLOG_CURRENT 
     - Backup oplog is current
     - Project, Global

   * - .. alert:: RESTORE_REQUESTED_AUDIT 
     - A restore has been requested
     - Project, Global

   * - .. alert:: RESYNC_PERFORMED 
     - Backup has been resynced
     - Project, Global

   * - .. alert:: RESYNC_REQUIRED 
     - Backup requires a resync
     - Project, Global

   * - .. alert:: RS_DENYLIST_UPDATED_AUDIT 
     - Excluded namespaces were modified for replica set
     - Project, Global

   * - .. alert:: RS_CREDENTIAL_UPDATED_AUDIT 
     - Backup authentication credentials updated for replica set
     - Project, Global

   * - .. alert:: RS_ROTATE_MASTER_KEY_AUDIT 
     - A master key rotation has been requested for a replica set.
     - Project, Global

   * - .. alert:: RS_SNAPSHOT_SCHEDULE_UPDATED_AUDIT 
     - Snapshot schedule updated for replica set
     - Project, Global

   * - .. alert:: RS_STATE_CHANGED_AUDIT 
     - Replica set backup state is now 
     - Project, Global

   * - .. alert:: RS_STORAGE_ENGINE_UPDATED_AUDIT 
     - Replica set storage engine has been updated
     - Project, Global

   * - .. alert:: SNAPSHOT_DELETED_AUDIT 
     - Snapshot has been deleted
     - Project, Global

   * - .. alert:: SNAPSHOT_EXPIRY_UPDATED_AUDIT 
     - Snapshot expiry has been updated.
     - Project, Global

   * - .. alert:: SYNC_PENDING_AUDIT 
     - Backup sync is pending
     - Project, Global

   * - .. alert:: SYNC_REQUIRED_AUDIT 
     - Backup sync has been initiated
     - Project, Global

.. _alerts-list-bic:

BI Connector
------------

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: BI_CONNECTOR_DOWN 
     - BI Connector is down
     - Project, Global

   * - .. alert:: BI_CONNECTOR_UP 
     - BI Connector is up
     - Project, Global

.. _alerts-list-cluster:

Cluster
-------

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - .. alert:: Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: CLUSTER_MONGOS_IS_MISSING 
     - Cluster is missing an active mongos
     - Project, Global

   * - .. alert:: CLUSTER_MONGOS_IS_PRESENT 
     - Cluster has an active mongos
     - Project, Global

   * - .. alert:: SHARD_ADDED 
     - Shard added
     - Project, Global

   * - .. alert:: SHARD_REMOVED 
     - Shard removed
     - Project, Global

.. _alerts-list-data-explorer:

Data Explorer Accessed
----------------------

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: DATA_EXPLORER 
     - User performed a Data Explorer read-only operation
     - Project, Global

   * - .. alert:: DATA_EXPLORER_CRUD 
     - User performed a Data Explorer CRUD operation, which modifies
       data
     - Project, Global

.. _alerts-list-host:

Host
----

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: ADD_HOST_AUDIT 
     - Host added
     - Project, Global

   * - .. alert:: ADD_HOST_TO_REPLICA_SET_AUDIT 
     - Host added to replica set
     - Project, Global

   * - .. alert:: ATTEMPT_KILLOP_AUDIT 
     - Attempted to kill operation
     - Project, Global

   * - .. alert:: ATTEMPT_KILLSESSION_AUDIT 
     - Attempted to kill session
     - Project, Global

   * - .. alert:: DB_PROFILER_DISABLE_AUDIT 
     - Database profiling disabled
     - Project, Global

   * - .. alert:: DB_PROFILER_ENABLE_AUDIT 
     - Database profiling enabled
     - Project, Global

   * - .. alert:: DELETE_HOST_AUDIT 
     - Host removed
     - Project, Global

   * - .. alert:: DISABLE_HOST_AUDIT 
     - Host disabled
     - Project, Global

   * - .. alert:: HIDE_AND_DISABLE_HOST_AUDIT 
     - Host disabled and hidden
     - Project, Global

   * - .. alert:: HIDE_HOST_AUDIT 
     - Host hidden
     - Project, Global

   * - .. alert:: HOST_DOWN 
     - Host is down
     - Project, Global

   * - .. alert:: HOST_DOWNGRADED 
     - Host has been downgraded
     - Project, Global

   * - .. alert:: HOST_IP_CHANGED_AUDIT 
     - Host IP address changed
     - Project, Global

   * - .. alert:: HOST_NOW_PRIMARY 
     - Host is now primary
     - Project, Global

   * - .. alert:: HOST_NOW_SECONDARY 
     - Host is now secondary
     - Project, Global

   * - .. alert:: HOST_NOW_STANDALONE 
     - Host is now a standalone
     - Project, Global

   * - .. alert:: HOST_RECOVERED 
     - Host has recovered
     - Project, Global

   * - .. alert:: HOST_RECOVERING 
     - Host is recovering
     - Project, Global

   * - .. alert:: HOST_RESTARTED 
     - Host has restarted
     - Project, Global

   * - .. alert:: HOST_ROLLBACK 
     - Host experienced a rollback
     - Project, Global

   * - .. alert:: HOST_SECURITY_CHECKUP_NOT_MET` 
     -  Authentication or |tls| is disabled.
     -  Project, Global

   * - .. alert:: HOST_SSL_CERTIFICATE_CURRENT 
     - Host's SSL certificate is current
     - Project, Global

   * - .. alert:: HOST_SSL_CERTIFICATE_STALE 
     - Host's SSL certificate will expire within 30 days
     - Project, Global

   * - .. alert:: HOST_UP 
     - Host is up
     - Project, Global

   * - .. alert:: HOST_UPGRADED 
     - Host has been upgraded
     - Project, Global

   * - .. alert:: INSIDE_METRIC_THRESHOLD 
     - Inside metric threshold
     - Project, Global

   * - .. alert:: NEW_HOST 
     - Host is new
     - Project, Global

   * - .. alert:: OUTSIDE_METRIC_THRESHOLD 
     - Outside metric threshold
     - Project, Global

   * - .. alert:: PAUSE_HOST_AUDIT 
     - Host paused
     - Project, Global

   * - .. alert:: REMOVE_HOST_FROM_REPLICA_SET_AUDIT 
     - Host removed from replica set
     - Project, Global

   * - .. alert:: RESUME_HOST_AUDIT 
     - Host resumed
     - Project, Global

   * - .. alert:: UNDELETE_HOST_AUDIT 
     - Host undeleted
     - Project, Global

   * - .. alert:: VERSION_BEHIND 
     - Host does not have the latest version
     - Project, Global

   * - .. alert:: VERSION_CHANGED 
     - Host version changed
     - Project, Global

   * - .. alert:: VERSION_CURRENT 
     - Host has the latest version
     - Project, Global

.. _alerts-list-org:

Organization
------------

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: ALL_ORG_USERS_HAVE_MFA 
     - Organization users have two-factor authentication enabled
     - Organization, Global

   * - .. alert:: ORG_API_KEY_ADDED 
     - API key has been added
     - Organization

   * - .. alert:: ORG_API_KEY_DELETED 
     - API key has been deleted
     - Organization

   * - .. alert:: ORG_EMPLOYEE_ACCESS_RESTRICTED 
     - MongoDB Production Support Employees restricted from accessing
       Atlas backend infrastructure for any Atlas cluster in this
       organization (You may grant a 24 hour bypass to the access
       restriction at the Atlas cluster level)
     - Organization, Global

   * - .. alert:: ORG_EMPLOYEE_ACCESS_UNRESTRICTED 
     - MongoDB Production Support Employees unrestricted from accessing
       Atlas backend infrastructure for any Atlas cluster in this
       organization
     - Organization, Global

   * - .. alert:: ORG_PUBLIC_API_ACCESS_LIST_NOT_REQUIRED 
     - IP Access List for Public API Not Required
     - Organization, Global

   * - .. alert:: ORG_PUBLIC_API_ACCESS_LIST_REQUIRED 
     - Require IP Access List for Public API Enabled
     - Organization, Global

   * - .. alert:: ORG_RENAMED 
     - Organization has been renamed
     - Organization, Global

   * - .. alert:: ORG_TWO_FACTOR_AUTH_OPTIONAL 
     - Two-factor Authentication Optional
     - Organization, Global

   * - .. alert:: ORG_TWO_FACTOR_AUTH_REQUIRED 
     - Two-factor Authentication Required
     - Organization, Global

   * - .. alert:: ORG_USERS_WITHOUT_MFA 
     - Organization users do not have two-factor authentication enabled
     - Organization, Global

.. _alerts-list-project:

Project
-------

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: ALL_USERS_HAVE_MULTI_FACTOR_AUTH 
     - Users have two-factor authentication enabled
     - Project, Global

   * - .. alert:: USERS_WITHOUT_MULTI_FACTOR_AUTH 
     - Users do not have two-factor authentication enabled
     - Project, Global

.. _alerts-list-replica-set:

Replica Set
-----------

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - .. alert:: Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: CONFIGURATION_CHANGED 
     - Replica set has an updated configuration
     - Project, Global

   * - .. alert:: ENOUGH_HEALTHY_MEMBERS 
     - Replica set has enough healthy members
     - Project, Global

   * - .. alert:: MEMBER_ADDED 
     - Replica set member added
     - Project, Global

   * - .. alert:: MEMBER_REMOVED 
     - Replica set member removed
     - Project, Global

   * - .. alert:: MULTIPLE_PRIMARIES 
     - Replica set elected multiple primaries
     - Project, Global

   * - .. alert:: NO_PRIMARY 
     - Replica set has no primary
     - Project, Global

   * - .. alert:: ONE_PRIMARY 
     - Replica set elected one primary
     - Project, Global

   * - .. alert:: PRIMARY_ELECTED 
     - Replica set elected a new primary
     - Project, Global

   * - .. alert:: TOO_FEW_HEALTHY_MEMBERS 
     - Replica set has too few healthy members
     - Project, Global

   * - .. alert:: TOO_MANY_ELECTIONS 
     - Replica set has too many election events
     - Project, Global

   * - .. alert:: TOO_MANY_UNHEALTHY_MEMBERS 
     - Replica set has too many unhealthy members
     - Project, Global

.. _alerts-list-team:

Team
----

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: TEAM_ADDED_TO_GROUP 
     - Team added to project
     - Organization, Project, Global

   * - .. alert:: TEAM_CREATED 
     - Team created
     - Organization, Global

   * - .. alert:: TEAM_DELETED 
     - Team deleted
     - Organization, Global

   * - .. alert:: TEAM_NAME_CHANGED 
     - Team name changed
     - Organization, Global

   * - .. alert:: TEAM_REMOVED_FROM_GROUP 
     - Team removed from project
     - Organization, Project, Global

   * - .. alert:: TEAM_ROLES_MODIFIED 
     - Team roles modified in project
     - Organization, Project, Global

   * - .. alert:: TEAM_UPDATED 
     - Team updated
     - Organization, Global

   * - .. alert:: USER_ADDED_TO_TEAM 
     - User added to team
     - Organization, Global

.. _alerts-list-user:

User
----

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: INVITED_TO_GROUP 
     - User was invited to project
     - Project, Global

   * - .. alert:: INVITED_TO_ORG 
     - User was invited to organization
     - Organization, Global

   * - .. alert:: JOIN_GROUP_REQUEST_APPROVED_AUDIT 
     - Request to join project was approved
     - Project, Global

   * - .. alert:: JOIN_GROUP_REQUEST_DENIED_AUDIT 
     - Request to join project was denied
     - Project, Global

   * - .. alert:: JOINED_GROUP 
     - User joined the project
     - Project, Global

   * - .. alert:: JOINED_ORG 
     - User joined the organization
     - Organization, Global

   * - .. alert:: JOINED_TEAM 
     - User joined the team
     - Organization, Global

   * - .. alert:: REMOVED_FROM_GROUP 
     - User left the project
     - Project, Global

   * - .. alert:: REMOVED_FROM_ORG 
     - User left the organization
     - Organization, Global

   * - .. alert:: REMOVED_FROM_TEAM 
     - User left the team
     - Organization, Global

   * - .. alert:: REQUESTED_TO_JOIN_GROUP 
     - User requested to join project
     - Project, Global

   * - .. alert:: USER_ROLES_CHANGED_AUDIT 
     - User had their role changed
     - Project, Organization, Global
