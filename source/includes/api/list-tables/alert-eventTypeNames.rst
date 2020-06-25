.. list-table::
   :widths: 20 80
   :header-rows: 1
   :stub-columns: 1

   * - Alert Target
     - Condition

   * - Billing
     -

       ``CREDIT_CARD_ABOUT_TO_EXPIRE``
         Credit card is about to expire
       ``PENDING_INVOICE_OVER_THRESHOLD``
          Monthly pending invoice ($) total is...
       ``DAILY_BILL_OVER_THRESHOLD``
         Daily amount billed ($) is...

   * - Encryption Key
     -

       ``AWS_ENCRYPTION_KEY_NEEDS_ROTATION``
         AWS encryption key elapsed time since last rotation is...
       ``AZURE_ENCRYPTION_KEY_NEEDS_ROTATION``
         Azure encryption key elapsed time since last rotation is...
       ``GCP_ENCRYPTION_KEY_NEEDS_ROTATION``
         GCP encryption key elapsed time since last rotation is...

   * - Host
     -

       ``HOST_DOWN``
         Host is down

       ``OUTSIDE_METRIC_THRESHOLD``
         Click the **Metrics** tab beneath
         `Request Body Parameters`_.

   * - Project
     -

       ``USERS_WITHOUT_MULTIFACTOR_AUTH``
         Users do not have two-factor authentication enabled

   * - Replica Set
     -

       ``PRIMARY_ELECTED``
         Replica set elected a new primary
       ``NO_PRIMARY``
         Replica set has no primary
       ``TOO_MANY_ELECTIONS``
         Number of election events is...
       ``REPLICATION_OPLOG_WINDOW_RUNNING_OUT``
         Replication Oplog Window is...

   * - Sharded Cluster
     -

       ``CLUSTER_MONGOS_IS_MISSING``
         Cluster is missing an active mongos

   * - User
     -

       ``USER_ROLES_CHANGED_AUDIT``
         User had their role changed
       ``JOINED_GROUP``
         User joined the project
       ``REMOVED_FROM_GROUP``
         User left the project
       ``USER_ROLES_CHANGED_AUDIT``
         User had their role changed

   * - X.509
     -

       ``NDS_X509_USER_AUTHENTICATION_MANAGED_USER_CERTS_EXPIRATION_CHECK``
         X.509 User Authentication, Client Certificates Expiration
         Alert when days to expiration is...

       ``NDS_X509_USER_AUTHENTICATION_CUSTOMER_CA_EXPIRATION_CHECK``
         X.509 User Authentication, Self-Managed CA Expiration Alert when days to expiration is...
