.. important::

   The complete list of event type values changes frequently.

**{+atlas-app-services+}**

- | ``AUTH_LOGIN_FAIL``
  | Number of failed client login requests per second meets the 
  | specified threshold.

- | ``ENDPOINTS_COMPUTE_MS``
  | HTTPS endpoints 
  | :appservices:`compute time </billing/#app-services-compute>` per 
  | second meets the specified threshold.

- | ``ENDPOINTS_EGRESS_BYTES``
  | HTTPS endpoints 
  | :appservices:`data egress </billing/#data-transfer>` bytes per 
  | second meets the specified threshold.

- | ``ENDPOINTS_FAILED_REQUESTS``
  | Number of HTTPS endpoints requests that fail per second meets the 
  | specified threshold.

- | ``ENDPOINTS_RESPONSE_MS``
  | 95th percentile of duration in milliseconds for HTTPS endpoint 
  | requests meets the specified threshold.

- | ``GRAPHQL_COMPUTE_MS``
  | GraphQL :appservices:`compute time </billing/#app-services-compute>` per second meets the specified 
  | threshold.

- | ``GRAPHQL_EGRESS_BYTES``
  | GraphQL :appservices:`data egress </billing/#data-transfer>` bytes 
  | per second meets the specified threshold.

- | ``GRAPHQL_FAILED_REQUESTS``
  | Number of GraphQL requests that fail per second meets the 
  | specified threshold.

- | ``GRAPHQL_RESPONSE_MS``
  | 95th percentile of duration in milliseconds for GraphQL requests 
  | meets the specified threshold.

- | ``OVERALL_COMPUTE_MS``
  | Overall :appservices:`compute time </billing/#app-services-compute>` per second meets the specified 
  | threshold.

- | ``OVERALL_EGRESS_BYTES``
  | Overall :appservices:`data egress </billing/#data-transfer>` bytes 
  | per second meets the specified threshold.

- | ``OVERALL_FAILED_REQUESTS``
  | Number of requests that fail per second meets the specified 
  | threshold.

- | ``SDKFNS_FAILED_REQUESTS``
  | Number of SDK Function requests that fail per second meets the 
  | specified threshold.

- | ``SDK_FNS_RESPONSE_MS``
  | 95th percentile of duration in milliseconds for SDK function 
  | requests meets the specified threshold.

- | ``SDK_FUNCTIONS_COMPUTE_MS``
  | SDK Functions :appservices:`compute time </billing/#app-services-compute>` per second meets the specified 
  | threshold.

- | ``SDK_FUNCTIONS_EGRESS_BYTES``
  | SDK Functions :appservices:`data egress </billing/#data-transfer>` 
  | bytes per second meets the specified threshold.

- | ``SDK_MQL_COMPUTE_MS``
  | SDK MQL :appservices:`compute time </billing/#app-services-compute>` per second meets the specified 
  | threshold.

- | ``SDK_MQL_EGRESS_BYTES``
  | SDK MQL :appservices:`data egress </billing/#data-transfer>` bytes 
  | per second meets the specified threshold.

- | ``SDK_MQL_RESPONSE_MS``
  | 95th percentile of duration in milliseconds for MQL requests meets 
  | the specified threshold.

- | ``SYNC_CURRENT_OPLOG_LAG_MS_SUM``
  | Approximate amount of time that the 
  | :appservices:`Atlas Device Sync </sync/learn/overview/>` is behind 
  | the MongoDB :term:`oplog` meets the specified threshold.

- | ``SYNC_EGRESS_BYTES``
  | :appservices:`Atlas Device Sync </sync/learn/overview/>` 
  | :appservices:`data egress </billing/#data-transfer>` bytes per 
  | second meets the specified threshold.

- | ``SYNC_NUM_UNSYNCABLE_DOCS_LIMIT`` 
  | Percentage of {+app-services+} :appservices:`unsyncable documents </mongodb/internal-database-usage/#std-label-unsynced-documents>` meets 
  | the specified threshold.

- | ``TRIGGERS_COMPUTE_MS``
  | Triggers :appservices:`compute time </billing/#app-services-compute>` per second has meets the 
  | specified threshold.

- | ``TRIGGERS_CURRENT_OPLOG_LAG_MS_SUM``
  | Approximate amount of time that the {+app-services+} triggers is 
  | behind the MongoDB :term:`oplog` meets the specified threshold.

- | ``TRIGGERS_EGRESS_BYTES``
  | Triggers :appservices:`data egress </billing/#data-transfer>` bytes 
  | per second meets the specified threshold.

- | ``TRIGGERS_FAILED_REQUESTS``
  | Number of Triggers requests that fail per second meets the 
  | specified threshold.

- | ``TRIGGERS_RESPONSE_MS``
  | 95th percentile of duration in milliseconds for triggers meets 
  | the specified threshold.

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
  | Users do not have two-factor authentication enabled

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
