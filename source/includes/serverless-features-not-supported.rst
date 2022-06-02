.. _atlas-serverless-limits-csp:

{+Serverless-instances+} are in a preview release and do not currently support the
|service| features listed below. If you require these capabilities, please use a
:doc:`{+dedicated-cluster+} </tutorial/create-new-cluster>`.

MongoDB plans to add support for more configurations and capabilities on
{+serverless-instances+} over time. A checkmark below indicates that MongoDB
plans to support the feature for {+serverless-instances+} in the future.

Configurations
--------------

.. list-table::
   :header-rows: 1
   :widths: 70 30

   * - Configuration
     - Coming Soon

   * - Multi-Region Deployments
     - 

   * - Multi-Cloud Deployments
     - 

   * - :manual:`Sharded </sharding>` Deployments
     - 

   * - :doc:`Global Clusters </global-clusters>`
     - 

   * - :doc:`Private Endpoints on Azure using {+az-pl+} </security-private-endpoint>`
     - :icon:`check-square`

   * - :doc:`Private Endpoints on Google Cloud using {+gcp-psc+} </security-private-endpoint>`
     - :icon:`check-square`
  
   * - :doc:`Network Peering (VPC/VNet) </security-vpc-peering>`
     - 

   * - Advanced Enterprise Security Features (including :doc:`LDAP </security-ldaps>` 
       and :doc:`Database Auditing </database-auditing>`)
   
       {+Serverless-instances+} do support X.509 certificates and IAM for authentication.
     - 

Capabilities
------------

.. list-table::
   :header-rows: 1
   :widths: 70 30

   * - Capability
     - Coming Soon

   * - Migrate into {+Clusters+} from |service| {+Serverless-instances+}
     - :icon:`check-square`
  
   * - :doc:`Live Migrate </import/live-import>` into |service| {+Serverless-instances+}
     - 

   * - :doc:`Store More than 1 TB of Data </customize-storage>`
     - 

   * - :doc:`Configure Alerts </alerts>` on Service Metrics Billing Metrics

       |service| supports :doc:`configuring alerts </configure-alerts>`
       for your project or organization if your bill exceeds a certain threshold.
     - :icon:`check-square`

   * - Perform :doc:`Automated Restores </backup-restore-cluster>`
       from Backup Snapshots
     - 

   * - Use :doc:`Atlas Search </atlas-search>`
     - 

   * - Use :doc:`Online Archive </online-archive/manage-online-archive>`
     - 

   * - Use :charts:`MongoDB Charts </>`
     - 

   * - Use :realm:`Realm Sync </sync/learn/overview/#std-label-sync-overview>`
     - 

   * - Use :doc:`Triggers </triggers>`
     - 
   
   * - Use Predefined :doc:`Replica Set Tags </reference/replica-set-tags>`
     - 

   * - :doc:`Test Failover </tutorial/test-failover>`
     - 

   * - :doc:`Encryption at Rest Using Key Management </security-kms-encryption/>`
     - 

   * - Track Database Access
     - 

   * - Use :manual:`Server-Side JavaScript </core/server-side-javascript/>`,
       such as ``$where``, ``$function``,
       ``$accumulator`` and ``map-reduce``
     -
  
   * - Download :doc:`Database Logs </mongodb-logs/>`
     - 

   * - Use Wire Compression Between Clients and |service| {+Serverless-instances+}
     - 

   * - Use |bic-short|
     - 

Operational Limitations and Considerations
------------------------------------------

Additionally, {+serverless-instances+} have the following operational
limitations and considerations:

.. list-table::
   :widths: 30 70
   :header-rows: 1
   :stub-columns: 1

   * - Operation
     - Limitation
  
   * - :manual:`Aggregation </aggregation>` and :manual:`Queries </tutorial/query-documents/>`
     - {+Serverless-instances+} don't support the ``allowDiskUse`` option for the
       :manual:`aggregation command </reference/command/aggregate>`, 
       its :manual:`helper method </reference/method/db.collection.aggregate>`,
       or the :manual:`cursor.allowDiskUse() 
       </reference/method/cursor.allowDiskUse/#mongodb-method-cursor.allowDiskUse>` query cursor method.

       {+Serverless-instances+} don't support the :manual:`$out 
       </reference/operator/aggregation/out/>`
       stage. Use :manual:`$merge
       </reference/operator/aggregation/merge/>` instead.
       
       Aggregation fields on {+serverless-instances+} that represent database and
       collection names (such as :manual:`$merge
       </reference/operator/aggregation/merge/>` values) can't be expressions.
       
       Aggregation pipelines for {+serverless-instances+} can have a maximum of 50
       stages.

   * - Sort
     - The :manual:`$sort </reference/operator/aggregation/sort/>` stage has
       a limit of 32 megabytes of RAM.
   
   * - Throughput
     - {+Serverless-instances+} don't routinely cap operation throughput. |service| may
       throttle operations for your {+serverless-instance+} temporarily while the system scales.

   * - Connections
     - {+Serverless-instances+} can support up to 500 simultaneous connections.

   * - Database Commands
     - Some database commands have limitations for {+serverless-instances+}. To
       learn more, see
       :ref:`Unsupported Commands in Serverless Instances 
       <atlas-serverless-command-limitations>`.
       
       You cannot create a capped collection or convert an existing
       collection to a capped collection.

   * - Namespaces and Database Names
     - |service| limits {+serverless-instance+} namespaces to 95 characters and
       database names to 38 characters.

   * - Database and Collections
     - {+Serverless-instances+} have a maximum of 50 databases and 500 collections total.

   * - Custom Roles
     - Changes to :doc:`custom roles </security-add-mongodb-roles/>` may
       take up to 30 seconds to deploy in {+serverless-instances+}.

   * - Reading from the Oplog
     - {+Serverless-instances+} don't provide direct
       read access to the oplog or any other collection in the ``local``
       database.

   * - :manual:`Change Streams </changeStreams/>`
     - {+Serverless-instances+} don't support change streams.

   * - :manual:`Collation </reference/collation/>` 
     - {+Serverless-instances+} don't support collation on collections,
       indexes, or queries.

   * - |bson| Nested Object Depth
     - {+Serverless-instances+} can't store documents with more than 50 
       nested levels.

   * - Transaction Size
     - {+Serverless-instances+} support multi-document transactions that are up
       to 700 MB in size. |service| aborts any {+serverless-instance+} transactions that
       exceed 700 MB.

   * - Write Concern
     - {+Serverless-instances+} don't support a numeric :manual:`write 
       concern </reference/write-concern/#mongodb-writeconcern-writeconcern.-number->` level greater than 
       ``1``, or custom write concerns. Operations that use a 
       write concern level greater than ``1``, or custom write 
       concerns, might return an ``UnsatisfiableWriteConcern`` error. 
       This behavior also applies to operations sent over a connection 
       created with a :manual:`write concern option 
       </reference/connection-string/#write-concern-options>`.

       .. note::

          For {+clusters+} other than ``M0``, ``M2``, or ``M5`` 
          {+clusters+}, you can verify whether you're using a write 
          concern mode that {+serverless-instances+} don't support with 
          the :manual:`serverStatus </reference/command/serverStatus/>` 
          command's :manual:`opWriteConcernCounters 
          </reference/command/serverStatus/#opwriteconcerncounters>` 
          field.
