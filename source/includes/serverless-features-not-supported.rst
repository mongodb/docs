.. _atlas-serverless-limits-csp:

{+Serverless-instances+} don't currently support the
|service| features listed below. If you require these capabilities, 
please use a :ref:`{+dedicated-cluster+} <create-new-cluster>`.

{+Serverless-instances+} don't support some features even though they 
are a part of the :manual:`Stable API v1 
</reference/stable-api/#api-v1-commands>`. We note unsupported 
features that are a part of the :manual:`Stable API v1 
</reference/stable-api/#api-v1-commands>` inline.

MongoDB plans to add support for more configurations and actions on
{+Serverless-instances+} over time. Footnotes indicate that 
MongoDB plans to support the feature for {+Serverless-instances+} in 
the future.

Unsupported Configurations
--------------------------

Currently, {+Serverless-instances+} don't support the following 
configurations:

- Multi-Region Deployments
 
- Multi-Cloud Deployments

- :manual:`Sharded </sharding>` Deployments

- :doc:`Global Clusters </global-clusters>`

- :doc:`Private Endpoints on Google Cloud using {+gcp-psc+} 
  </security-private-endpoint>`

- :doc:`Network Peering (VPC/VNet) </security-vpc-peering>`

- Advanced Enterprise Security Features (including :doc:`LDAP 
  </security-ldaps>` and :doc:`Database Auditing </database-auditing>`)
  
  {+Serverless-instances+} do support X.509 certificates and IAM 
  for authentication.

Unsupported Actions
-------------------

Currently, {+Serverless-instances+} don't support the following actions:

- Convert |service| {+Serverless-instances+} into {+clusters+}. [#f2]_

- Convert |service| dedicated {+clusters+} into |service| {+Serverless-instances+}

- :doc:`Live migrate </import/live-import>` into |service| {+Serverless-instances+}.

- Store more than 1 TB of data.

  This value includes the number of bytes of all uncompressed BSON 
  documents stored in all collections, plus the bytes stored in 
  their associated indexes.

- Perform :doc:`automated restores </backup-restore-cluster>`
  from backup snapshots.

- Use :doc:`Atlas Search </atlas-search>`.

- Use :doc:`Online Archive </online-archive/manage-online-archive>`.

- Use :ref:`atlas-triggers`.

- Use predefined :doc:`replica set tags </reference/replica-set-tags>`.

- :doc:`Test primary failover 
  </tutorial/test-resilience/test-primary-failover>`.

- :doc:`Simulate a regional outage 
  </tutorial/test-resilience/simulate-regional-outage>`.

- :doc:`Encryption at Rest using key management 
  </security-kms-encryption/>`.

- Track database access.

- Use :manual:`server-side JavaScript </core/server-side-javascript/>`, 
  such as ``$where``, ``$function``, ``$accumulator`` and 
  ``map-reduce``.

  .. include:: /includes/fact-unsupported-stable-api.rst

- Download :doc:`database logs </mongodb-logs/>`.

- Use wire compression between clients and |service| 
  {+Serverless-instances+}.

- Use |bic-short|.

.. [#f2] Coming soon.

Operational Limitations and Considerations
------------------------------------------

Additionally, {+Serverless-instances+} have the following operational
limitations and considerations:

.. list-table::
   :widths: 30 70
   :header-rows: 1
   :stub-columns: 1

   * - Operation
     - Limitation
  
   * - :manual:`Aggregation </aggregation>` and :manual:`Queries 
       </tutorial/query-documents/>`
     - {+Serverless-instances+} don't support the ``allowDiskUse`` 
       option for the :manual:`aggregation command 
       </reference/command/aggregate>`, its :manual:`helper method 
       </reference/method/db.collection.aggregate>`, or the 
       :manual:`cursor.allowDiskUse() </reference/method/cursor.allowDiskUse/#mongodb-method-cursor.allowDiskUse>` query cursor 
       method.

       {+Serverless-instances+} don't support the :manual:`$out 
       </reference/operator/aggregation/out/>` stage. Use 
       :manual:`$merge </reference/operator/aggregation/merge/>` 
       instead.
       
       Aggregation fields on {+Serverless-instances+} that represent 
       database and collection names (such as :manual:`$merge
       </reference/operator/aggregation/merge/>` values) can't be 
       expressions.

       .. include:: /includes/fact-unsupported-stable-api.rst

       Aggregation pipelines for {+Serverless-instances+} don't support
       the :pipeline:`$currentOp`, :pipeline:`$listLocalSessions`,
       :pipeline:`$listSessions`, and :pipeline:`$planCacheStats` 
       stages.

       Aggregation pipelines for {+Serverless-instances+} can have a 
       maximum of 50 stages.

   * - Sort
     - The :manual:`$sort </reference/operator/aggregation/sort/>` 
       stage has a limit of 32 megabytes of RAM.

   * - Authentication
     
     - {+Serverless-instances+} support the following
       authentication methods only:
      
       - Password (SCRAM-SHA-1)
       - X.509 Certificates
       - AWS IAM

   * - Build Index with Rolling Build
     - {+Serverless-instances+} don't support :manual:`building indexes
       with a rolling build </tutorial/build-indexes-on-replica-sets/>`.

   * - Real-Time Performance Panel
     - {+Serverless-instances+} don't provide access to the
       :doc:`Real-Time Performance Panel 
       </real-time-performance-panel>`.
   
   * - Throughput
     - {+Serverless-instances+} don't routinely cap operation 
       throughput. |service| may throttle operations for your 
       {+Serverless-instance+} temporarily while the system scales.

   * - Connections
     - {+Serverless-instances+} can support up to 500 simultaneous 
       connections.

   * - Cursors
     - {+Serverless-instances+} can't use the :manual:`noTimeout cursor
       option </reference/method/cursor.addOption/#flags>`.

   * - Database Commands
     - Some database commands have limitations for \
       {+Serverless-instances+}. To learn more, see
       :ref:`Unsupported Commands in Serverless Instances 
       <atlas-serverless-command-limitations>`.
       
       You cannot create a capped collection or convert an existing
       collection to a capped collection.

   * - Namespaces and Database Names
     - |service| limits {+Serverless-instance+} database names to 38 characters.
       In addition, namespace names (``<database>.<collection>``) cannot 
       exceed 95 characters.

   * - Database and Collections
     - {+Serverless-instances+} have a maximum of 50 databases and 500 
       collections total.

   * - Custom Roles
     - Changes to :doc:`custom roles </security-add-mongodb-roles/>` may
       take up to 30 seconds to deploy in {+Serverless-instances+}.

   * - Access to Collections in ``local``, ``admin``, and ``config`` 
       Databases
     - {+Serverless-instances+} don't allow:
     
       - Read access to the oplog or any other collection in the 
         ``local`` database.
       - Write access to any collection in the ``local`` and ``config`` 
         databases.
       - Read or write access to any collection in the ``admin`` 
         database. 

       |service| issues an error similar to the following if you attempt
       to read or write to collections in these databases:
       
       .. code-block:: none
          :copyable: false
       
          command <cmd name> is not allowed in this Atlas tier
          (Unauthorized) not authorized on <db name> to execute command 
          <cmd name>

   * - :manual:`Change Streams </changeStreams/>`
     - {+Serverless-instances+} don't support change streams.

       {+Serverless-instances+} don't support this feature even though 
       it's a part of the :manual:`Stable API v1 
       </reference/stable-api/#api-v1-commands>`.

   * - :manual:`Collation </reference/collation/>` 
     - {+Serverless-instances+} don't support collation on collections,
       indexes, or queries.

       .. include:: /includes/fact-unsupported-stable-api.rst

   * - |bson| Nested Object Depth
     - {+Serverless-instances+} can't store documents with more than 50 
       nested levels.

   * - Transaction Size
     - {+Serverless-instances+} support multi-document transactions 
       that are up to 700 MB in size. |service| aborts any 
       {+Serverless-instance+} transactions that
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

       For {+clusters+} other than ``M0``, ``M2``, or ``M5`` 
       {+clusters+}, you can verify whether you're using a write 
       concern mode that {+Serverless-instances+} don't support with 
       the :manual:`serverStatus </reference/command/serverStatus/>` 
       command's :manual:`opWriteConcernCounters </reference/command/serverStatus/#opwriteconcerncounters>` 
       field.
