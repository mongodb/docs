
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

Billing
-------

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: ACCOUNT_DOWNGRADED
     - Account downgraded
     - Project, Organization, Global

   * - .. alert:: ACCOUNT_UPGRADED
     - Account upgraded
     - Project, Organization, Global

   * - .. alert:: CHARGE_FAILED
     - Credit card charge has failed
     - Project, Organization, Global

   * - .. alert:: CHARGE_SUCCEEDED
     - Credit card was successfully charged
     - Project, Organization, Global

   * - .. alert:: CHECK_PAYMENT_RECEIVED
     - Invoice has been paid by check
     - Project, Organization, Global

   * - .. alert:: CREDIT_CARD_ABOUT_TO_EXPIRE
     - Credit card is about to expire
     - Project, Global

   * - .. alert:: CREDIT_CARD_CURRENT
     - Credit card is current
     - Project, Global

   * - .. alert:: CREDIT_ISSUED
     - Credit issued
     - Project, Organization, Global

   * - .. alert:: DAILY_BILL_OVER_THRESHOLD
     - Daily amount billed ($) is above threshold
     - Project, Global

   * - .. alert:: DAILY_BILL_UNDER_THRESHOLD
     - Daily amount billed ($) is below threshold
     - Project, Global

   * - .. alert:: DISCOUNT_APPLIED
     - Discount applied
     - Project, Organization, Global

   * - .. alert:: INVOICE_ADDRESS_ADDED
     - Invoice address added
     - Project, Organization, Global

   * - .. alert:: INVOICE_ADDRESS_CHANGED
     - Invoice address changed
     - Project, Organization, Global

   * - .. alert:: INVOICE_CLOSED
     - Invoice closed
     - Project, Organization, Global

   * - .. alert:: PAYMENT_FORGIVEN
     - Payment forgiven
     - Project, Organization, Global

   * - .. alert:: PENDING_INVOICE_OVER_THRESHOLD
     - Monthly bill has exceeded the limit you set
     - Project, Global

   * - .. alert:: PENDING_INVOICE_UNDER_THRESHOLD
     - Monthly pending invoice ($) total is below threshold
     - Project, Global

   * - .. alert:: PREPAID_PLAN_ACTIVATED
     - Prepaid plan added
     - Project, Organization, Global

   * - .. alert:: PROMO_CODE_APPLIED
     - Promo Credit issued
     - Project, Organization, Global

   * - .. alert:: REFUND_ISSUED
     - Refund issued
     - Project, Organization, Global

   * - .. alert:: STALE_PENDING_INVOICES
     - Organization has one or more pending invoices that are more than
       one month old
     - Organization

   * - .. alert:: WIRE_TRANSFER_PAYMENT_RECEIVED
     - Invoice has been paid by wire transfer
     - Project, Organization, Global

Cluster
-------

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
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
     - User performed a Data Explorer CRUD operation, which modifies data
     - Project, Global

Disk Backup

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: CPS_RESTORE_REQUESTED_AUDIT
     - A cloud provider snapshot restore has been requested
     - Organization

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

   * - .. alert:: HOST_EXPOSED
     - Host is exposed to the public Internet
     - Project, Global

   * - .. alert:: HOST_IP_CHANGED_AUDIT
     - Host IP address changed
     - Project, Global

   * - .. alert:: HOST_LOCKED_DOWN
     - Host is locked down
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

   * - .. alert:: HOST_SECURITY_CHECKUP_NOT_MET
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

   * - .. alert:: ORG_ACTIVATED
     - Organization has been reactivated
     - Organization, Global

   * - .. alert:: ORG_ADMIN_SUSPENDED
     - Organization has been suspended by an administrator
     - Organization, Global

   * - .. alert:: ORG_API_KEY_ADDED
     - API key has been added
     - Organization

   * - .. alert:: ORG_API_KEY_DELETED
     - API key has been deleted
     - Organization

   * - .. alert:: ORG_CREDIT_CARD_ABOUT_TO_EXPIRE
     - Credit card is about to expire
     - Organization, Global

   * - .. alert:: ORG_CREDIT_CARD_ADDED
     - Credit card was added
     - Organization, Global

   * - .. alert:: ORG_CREDIT_CARD_CURRENT
     - Credit card is current
     - Organization, Global

   * - .. alert:: ORG_CREDIT_CARD_UPDATED
     - Credit card information was updated
     - Organization, Global

   * - .. alert:: ORG_DAILY_BILL_OVER_THRESHOLD
     - Amount billed yesterday is above the limit you set
     - Organization, Global

   * - .. alert:: ORG_DAILY_BILL_UNDER_THRESHOLD
     - Daily amount billed is below the limit you set
     - Organization, Global

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

   * - .. alert:: ORG_GROUP_CHARGES_OVER_THRESHOLD
     - Current bill for any single project is above the limit you set
     - Organization, Global

   * - .. alert:: ORG_GROUP_CHARGES_UNDER_THRESHOLD
     - Project charges ($) are below threshold
     - Organization, Global

   * - .. alert:: ORG_INVOICE_OVER_THRESHOLD
     - Current bill for organization is over the limit you set
     - Organization, Global

   * - .. alert:: ORG_INVOICE_UNDER_THRESHOLD
     - Current bill is below the limit you set
     - Organization, Global

   * - .. alert:: ORG_LOCKED
     - Organization has been locked due to unpaid charges for more than
       %d days
     - Organization

   * - .. alert:: ORG_PUBLIC_API_ACCESS_LIST_NOT_REQUIRED
     - IP Access List for Public API Not Required
     - Organization, Global

   * - .. alert:: ORG_PUBLIC_API_ACCESS_LIST_REQUIRED
     - Require IP Access List for Public API Enabled
     - Organization, Global

   * - .. alert:: ORG_RENAMED
     - Organization has been renamed
     - Organization, Global

   * - .. alert:: ORG_SUSPENDED
     - Organization has been suspended due to unpaid charges for more
       than %d days
     - Organization

   * - .. alert:: ORG_TEMPORARILY_ACTIVATED
     - Organization has been granted temporary access
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

   * - .. alert:: DELINQUENT
     - Service suspended due to unpaid invoice(s) more than 30 days old
     - Project, Global

   * - .. alert:: PAID_IN_FULL
     - Service restored because all invoices are paid in full
     - Project, Global

   * - .. alert:: USERS_WITHOUT_MULTI_FACTOR_AUTH
     - Users do not have two-factor authentication enabled
     - Project, Global

Replica Set
-----------

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
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

Support Case
------------

.. list-table::
   :widths: 40 40 20
   :header-rows: 1

   * - Alert Type
     - Alert Message
     - Scopes

   * - .. alert:: CASE_CREATED
     - Case created.
     - Project, Global

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
