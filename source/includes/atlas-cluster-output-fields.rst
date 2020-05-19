.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Field 
     - Description

   * - ``autoScaling``
     - Configuration for :atlas:`automatically scaling 
       </cluster-autoscaling/#cluster-autoscaling>` cluster storage 
       and tier.

   * - ``autoscaling.diskGBEnabled``
     - Specifies whether or not disk :atlas:`auto-scaling 
       </cluster-autoscaling/#cluster-autoscaling>` is enabled. 

       Value can be:

       - ``true`` if enabled
       - ``false`` if disabled

       By default, disk auto-scaling is disabled.

   * - ``backupEnabled``
     - Specifies whether or not :atlas:`cloud provider snapshots 
       </backup/cloud-provider-snapshots>` are enabled. 
       Value can be:

       - ``true`` if enabled
       - ``false`` if disabled

   * - ``biConnector``
     - Configuration for |bic| on the cluster.

   * - ``biConnector.enabled``
     - Specifies whether or not |bic-short| is enabled. 
       Value can be:

       - ``true`` if enabled
       - ``false`` if disabled

       The default value is false.

   * - ``biConnector.readPreference``
     - Specifies the read preference for |bic-short| on the 
       cluster. Value can be:

       - ``primary`` to allow |bic-short| to read from 
         primary.
       - ``secondary`` to allow |bic-short| to read from 
         the secondary. 
       - ``analytics`` to allow |bic-short| to read from 
         the :atlas:`analytics node </faq/#analytics-nodes-overview>`.

       The default value is ``secondary`` if there are no 
       analytics nodes in the cluster. If there analytics 
       nodes in the cluster, the default value is ``analytics``.

   * - ``clusterType``
     - Specifies the type of cluster. Value can be:

       - ``REPLICASET``
       - ``SHARDED``
       - ``GEOSHARDED``

       The default value is ``REPLICASET``.

   * - ``diskSizeGB``
     - Specifies the capacity, in GB, of the host's root 
       volume. 

   * - ``encryptionAtRestProvider``
     - Configuration for encryption-at-rest. Default value 
       is ``NONE``.

   * - ``id``
     - Specifies the unique identifier of the cluster.

   * - ``groupId``
     - Specifies the unique identifier of the project. 
      
       .. note::

          Groups and projects are synonymous terms. Your 
          {GROUP-ID} is the same as your project ID. 

   * - ``mongoDBVersion``
     - Specifies the MongoDB version that is deployed.

   * - ``mongoDBMajorVersion``
     - Specifies the major version of MongoDB that is deployed.

   * - ``mongoURI``
     - Specifies the base :manual:`connection string 
       </reference/connection-string/>` for the cluster.

   * - ``MongoURIUpdated``
     - Specifies the timestamp in |iso8601-time| when the connection 
       string was last updated. 

   * - ``name``
     - Specifies the name of the cluster.

   * - ``numShards``
     - Specifies the numer of shards in the sharded cluster. Value 
       can be:

       - ``1`` if the cluster is a replica set.
       - ``2`` or higher, up to ``12``, if the cluster is a sharded 
         cluster. 

   * - ``paused``
     - Specifies whether or not the cluster is paused. Value 
       can be:

       - ``true`` if cluster is paused.
       - ``false`` if cluster is active.

   * - ``providerBackupEnabled``
     - Specifies whether or not :atlas:`Cloud Provider 
       Snapshots </backup/cloud-provider-snapshots/#backup-cloud-provider>` 
       is enabled. Value can be: 

       - ``true`` if enabled.
       - ``false`` if disabled.

   * - ``providerSettings``
     - Configuration for the provisioned servers on which 
       MongoDB runs.

   * - ``providerSettings.backingProviderName``
     - Specifies the cloud provider service on which the 
       servers are provisioned. Value can be:

       - ``AWS`` for Amazon AWS
       - ``GCP`` for Google Cloud Platform
       - ``AZURE`` for Microsot Azure

   * - ``providerSettings.instanceSizeName``
     - Specifies the name of the cluster tier used for |service| 
       cluster. 

       .. tabs-cloud-providers::

          .. tab:: 
             :tabid: aws

             .. include:: /includes/extracts/fact-cluster-instance-sizes-AWS.rst

          .. tab:: 
             :tabid: gcp

             .. include:: /includes/extracts/fact-cluster-instance-sizes-GCP.rst

          .. tab:: 
             :tabid: azure
              
             .. include:: /includes/extracts/fact-cluster-instance-sizes-AZURE.rst

   * - ``providerSettings.providerName``
     - Specifies the name of the cloud service provider on which 
       the server is provisioned. Value can be: 

       - ``AWS`` for Amazon AWS
       - ``GCP`` for Google Cloud Platform
       - ``AZURE`` for Microsot Azure

   * - ``providerSettings.regionName``
     - Specifies the physical location of the cluster. For a 
       complete list of regions, see cloud provider reference:

       - :atlas:`AWS </reference/amazon-aws/#amazon-aws>`
       - :atlas:`GCP </reference/google-gcp/#google-gcp>` 
       - :atlas:`Azure </reference/microsoft-azure/#microsoft-azure>`

   * - ``replicationFactor``
     - Specifies the number of :atlas:`replica set members 
       </reference/glossary/#term-replica-set>` in the cluster. The 
       possible values are ``3``, ``5``, ``7``.

   * - ``replicationSpec``
     - Configuration for each region in the cluster. Each 
       element in this object represents a region where 
       your cluster is deployed. 

   * - ``replicationSpec.<region>``
     - Specifies the physical location of the region. 

       Each ``<region>`` object describes the region’s priority 
       in elections and the number and type of MongoDB nodes 
       |service| deploys to the region. 

   * - ``replicationSpec.<region>.analyticsNodes``
     - Specifies the number of :atlas:`analytics nodes 
       </faq/#analytics-nodes-overview>` in the region. 
       Analytics nodes are read-only, and can never become 
       the :atlas:`primary </reference/glossary/#term-primary>`.

   * - ``replicationSpec.<region>.electableNodes``
     - Specifies the number of electable nodes in the 
       region. Electable nodes can become the 
       :atlas:`primary </reference/glossary/#term-primary>` 
       and can facilitate local reads.

   * - ``replicationSpec.<region>.priority``
     - Specifies the election priority of the region. The highest 
       possible priority is ``7``, which identifies the ``Preferred 
       Region`` of the cluster. |service| places the primary node in 
       the ``Preferred Region``. The lowest possible priority is ``0``, 
       which identifies a read-only region.

       You can have any number of priority ``0`` read only regions. 
       Priorities ``1`` through ``7`` are exclusive: only one region 
       per cluster can be assigned a given priority.

   * - ``replicationSpec.<region>.readOnlyNodes``
     - Specifies the number of read-only nodes in the region. Read-only 
       nodes can never become the primary member, but can facilitate 
       local reads.

   * - ``replicationSpecs``
     - Configuration for each zone in a :atlas:`Global Cluster 
       </global-clusters>`. Each object in this array represents a 
       zone where |service| deploys nodes for your :atlas:`Global Cluster 
       </global-clusters>`.

   * - ``replicationSpecs.id``
     - Specifies the unique identifier of the replication object.

   * - ``replicationSpecs.numShards``
     - Specifies the number of shards to deploy in the specified 
       zone.

   * - ``replicationSpecs.zoneName``
     - Specifies the name for the zone in a :atlas:`Global Cluster 
       </global-clusters>`.

   * - ``replicationSpecs.regionConfig``
     - Configuration for the physical location of the region. Each 
       ``regionsConfig`` object describes the region’s priority in 
       elections and the number and type of MongoDB nodes that 
       |service| deploys to the region.

   * - | ``replicationSpecs[n].regionsConfig``
       | ``.<regionName>.analyticsNodes``
     - Specifies the number of analytics nodes to deploy in the 
       region.

   * - | ``replicationSpecs[n].regionsConfig``
       | ``.<regionName>.electableNodes``
     - Number of electable nodes for |service| to deploy to the region.
       Electable nodes can become the :term:`primary` and can
       facilitate local reads.

   * - | ``replicationSpecs[n].regionsConfig``
       | ``.<regionName>.priority``
     - Election priority of the region. If you have regions with only
       read-only nodes, set this value to ``0``.

   * - | ``replicationSpecs[n].regionsConfig``
       | ``.<regionName>.readOnlyNodes``
     - Number of read-only nodes for |service| to deploy to the region.
       Read-only nodes can never become the :term:`primary`, but can
       facilitate local-reads.

       Specify ``0`` if you do not want any read-only nodes in the
       region.

   * - ``srvAddress``
     - The :manual:`connection string </reference/connection-string/>` 
       for connecting to the |service| cluster. The ``+srv`` modifier 
       forces the connection to use |tls|. The ``mongoURI`` parameter 
       lists additional options.

   * - ``stateName``
     - The current status of the cluster. Value can be:

       - ``IDLE``
       - ``CREATING``
       - ``UPDATING``
       - ``DELETING``
       - ``DELETED``      
       - ``REPAIRING``    
