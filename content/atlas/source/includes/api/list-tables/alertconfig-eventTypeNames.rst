.. important::

   The complete list of event type values changes frequently.

**Backup**

- | ``CPS_SNAPSHOT_SUCCESSFUL``
  | Snapshot taken successfully

- | ``CPS_SNAPSHOT_FALLBACK_SUCCESSFUL``
  | Fallback snapshot taken

- | ``CPS_SNAPSHOT_FALLBACK_FAILED``
  | Fallback snapshot failed

- | ``CPS_SNAPSHOT_BEHIND``
  | Snapshot schedule fell behind

- | ``CPS_RESTORE_FAILED``
  | Backup restore failed

- | ``CPS_RESTORE_SUCCESSFUL``
  | Backup restore succeeded

- | ``CPS_SNAPSHOT_DOWNLOAD_REQUEST_FAILED``
  | Snapshot download request failed

**Billing**
     
- | ``CREDIT_CARD_ABOUT_TO_EXPIRE``
  | Credit card is about to expire

- | ``PENDING_INVOICE_OVER_THRESHOLD``
  | Monthly pending invoice ($) total is...

- | ``DAILY_BILL_OVER_THRESHOLD``:
  | Daily amount billed ($) is...

**Encryption Key**

- | ``AWS_ENCRYPTION_KEY_NEEDS_ROTATION``
  | AWS encryption key elapsed time since last rotation is...

- | ``AZURE_ENCRYPTION_KEY_NEEDS_ROTATION``
  | Azure encryption key elapsed time since last rotation is...

- | ``GCP_ENCRYPTION_KEY_NEEDS_ROTATION``
  | GCP encryption key elapsed time since last rotation is...

**Host**

- | ``HOST_DOWN``
  | Host is down

- | ``OUTSIDE_METRIC_THRESHOLD``
  | Metric occurred outside of the metric threshold.
  | To learn more, see :ref:`monitor-cluster-metrics`.

- | ``HOST_MONGOT_CRASHING_OOM``
  | Search process (``mongot``) ran out of memory.
  | To learn more and troubleshoot the issue that triggered this 
  | alert, see :ref:`Atlas Search alerts <atlas-search-alerts>`.

- | ``MONGOT_NOT_CRASHING_OOM``
  | Search process (``mongot``) has enough memory.

**Project**

- | ``USERS_WITHOUT_MULTI_FACTOR_AUTH``
  | Users do not have |mfa| enabled.

**Replica Set**

- | ``PRIMARY_ELECTED``
  | Replica set elected a new primary

- | ``NO_PRIMARY``
  | Replica set has no primary

- | ``TOO_MANY_ELECTIONS``
  | Number of election events is...

- | ``REPLICATION_OPLOG_WINDOW_RUNNING_OUT``
  | Replication Oplog Window is...

**Serverless**

- | ``OUTSIDE_SERVERLESS_METRIC_THRESHOLD``.
  | Serverless metric occurred outside of the metric threshold.
  | To learn more, see :ref:`review-serverless-metrics`.

**Sharded Cluster**

- | ``CLUSTER_MONGOS_IS_MISSING``
  | Cluster is missing an active mongos

**User**

- | ``USER_ROLES_CHANGED_AUDIT``
  | User had their role changed

- | ``JOINED_GROUP``
  | User joined the project

- | ``REMOVED_FROM_GROUP``
  | User left the project

**X.509**

- | ``NDS_X509_USER_AUTHENTICATION_MANAGED_USER_CERTS_EXPIRATION_CHECK``
  | X.509 User Authentication, Client Certificates Expiration
  | Alert when days to expiration is...
       
- | ``NDS_X509_USER_AUTHENTICATION_CUSTOMER_CA_EXPIRATION_CHECK``
  | X.509 User Authentication, Self-Managed CA Expiration Alert 
  | when days to expiration is...
