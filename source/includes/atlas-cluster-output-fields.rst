.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Field
     - Returned Value

   * - ``autoScaling``
     - Configuration for
       :atlas:`automatically scaling </cluster-autoscaling/#cluster-autoscaling>`
       cluster storage and tier.

   * - | ``autoscaling``
       | ``.diskGBEnabled``
     - State of this cluster's disk
       :atlas:`auto-scaling </cluster-autoscaling/#cluster-autoscaling>`:

       - ``true`` if enabled
       - ``false`` if disabled

       By default, |service| disables disk auto-scaling.

   * - ``backupEnabled``
     - State of
       :atlas:`cloud backup </backup/cloud-provider-snapshots>`
       for this cluster:

       - ``true`` if enabled
       - ``false`` if disabled

   * - ``biConnector``
     - Configuration for |bic| on the cluster.

   * - | ``biConnector``
       | ``.enabled``
     - State of |bic-short| for the cluster:

       - ``true`` if enabled
       - ``false`` if disabled

       The default value is false.

   * - | ``biConnector``
       | ``.readPreference``
     - Read preference for |bic-short| on the cluster:

       - ``primary``: |bic-short| reads from the primary.
       - ``secondary``: |bic-short| reads from the secondary.
       - ``analytics``: |bic-short| reads from the
         :atlas:`analytics node </faq/#analytics-nodes-overview>`.

   * - ``clusterType``
     - Type of cluster:

       - ``REPLICASET``
       - ``SHARDED``
       - ``GEOSHARDED``

   * - ``diskSizeGB``
     - Capacity, in GB, of the host's root volume.

   * - ``encryptionAtRestProvider``
     - Configuration for encryption at rest.

   * - ``id``
     - Unique identifier of the cluster.

   * - ``groupId``
     - Unique identifier of the project.

       .. note::

          Your project ID equals ``groupId``.

   * - ``labels``
     - Returns identifying tags for the cluster. As of version 1.0.0,
       MongoDB uses this field to track use of ``monogcli``.

   * - ``mongoDBVersion``
     - MongoDB version that is deployed.

   * - ``mongoDBMajorVersion``
     - Major version of MongoDB that is deployed.

   * - ``mongoURI``
     - Base :manual:`connection string </reference/connection-string/>`
       for the cluster.

   * - ``MongoURIUpdated``
     - Timestamp in |iso8601-time| when someone last updated the
       connection string.

   * - ``name``
     - Name of the cluster.

   * - ``numShards``
     - Number of shards in the cluster:

       - ``1``: replica set.
       - Between ``2`` and ``12`` inclusive: sharded cluster.

   * - ``paused``
     - State of the cluster:

       - ``true`` if cluster is paused.
       - ``false`` if cluster is active.

   * - ``providerBackupEnabled``
     - State of
       :atlas:`Cloud Backup </backup/cloud-provider-snapshots/#backup-cloud-provider>`
       for the cluster:

       - ``true`` if enabled.
       - ``false`` if disabled.

   * - ``providerSettings``
     - Configuration for the provisioned servers on which MongoDB runs.

   * - | ``providerSettings``
       | ``.backingProviderName``
     - Cloud provider service on which the servers are provisioned:

       - ``AWS`` for Amazon AWS
       - ``GCP`` for Google Cloud Platform
       - ``AZURE`` for Microsot Azure

   * - | ``providerSettings``
       | ``.instanceSizeName``
     - Name of the cluster tier used for |service| cluster:

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

   * - | ``providerSettings``
       | ``.providerName``
     - Name of the cloud service provider on which |service|
       provisioned the MongoDB host:

       - ``AWS`` for Amazon AWS
       - ``GCP`` for Google Cloud Platform
       - ``AZURE`` for Microsot Azure

   * - | ``providerSettings``
       | ``.regionName``
     - Physical location of the cluster.

       For a complete list of regions, see cloud provider reference:

       - :atlas:`AWS </reference/amazon-aws/#amazon-aws>`
       - :atlas:`GCP </reference/google-gcp/#google-gcp>`
       - :atlas:`Azure </reference/microsoft-azure/#microsoft-azure>`

   * - ``replicationFactor``
     - Number of :term:`replica set members <replica set>` in the
       cluster: ``3``, ``5``, or ``7``.

   * - ``replicationSpec``
     - Configuration for each region in the cluster. Each element in
       this object represents a region where |service| deployed your
       cluster.

   * - | ``replicationSpec``
       | ``.<region>``
     - Physical location of the region.

       Each ``<region>`` object describes the region’s priority
       in elections and the number and type of MongoDB nodes
       |service| deploys to the region.

   * - | ``replicationSpec``
       | ``.<region>.analyticsNodes``
     - Number of
       :atlas:`analytics nodes </faq/#analytics-nodes-overview>` in
       the region.

   * - | ``replicationSpec``
       | ``.<region>.electableNodes``
     - Number of electable nodes in the region.

   * - | ``replicationSpec``
       | ``.<region>.priority``
     - Election priority of the region as an integer between ``0`` and
       ``7`` inclusive.

   * - | ``replicationSpec``
       | ``.<region>.readOnlyNodes``
     - Number of read-only nodes in the region.

   * - ``replicationSpecs``
     - Returns :atlas:`Global Cluster </global-clusters>` zone. As
       ``mongocli`` can't create Global Clusters, this response
       includes one zone only.

       Each object in this array represents a zone where |service|
       deploys nodes for your :atlas:`Global Cluster </global-clusters>`.

   * - ``replicationSpecs.id``
     - Unique identifier of the replication object.

   * - ``replicationSpecs.numShards``
     - Number of shards to deploy in the specified zone.

   * - ``replicationSpecs.zoneName``
     - Name for the zone.

   * - ``replicationSpecs.regionConfig``
     - Configuration for the physical location of the region. Each
       ``regionsConfig`` object describes the region’s priority in
       elections and the number and type of MongoDB nodes that
       |service| deploys to the region.

   * - | ``replicationSpecs[n]``
       | ``.regionsConfig``
       | ``.<regionName>.analyticsNodes``
     - Number of analytics nodes to deploy in the region.

   * - | ``replicationSpecs[n]``
       | ``.regionsConfig``
       | ``.<regionName>.electableNodes``
     - Number of electable nodes for |service| to deploy to the region.

   * - | ``replicationSpecs[n]``
       | ``.regionsConfig``
       | ``.<regionName>.priority``
     - Election priority of the region.

   * - | ``replicationSpecs[n]``
       | ``.regionsConfig``
       | ``.<regionName>.readOnlyNodes``
     - Number of read-only nodes for |service| to deploy to the region.

   * - ``srvAddress``
     - :manual:`connection string </reference/connection-string/>`
       for connecting to the |service| cluster. The ``+srv`` modifier
       forces the connection to use |tls|. The ``mongoURI`` parameter
       lists additional options.

   * - ``stateName``
     - Current status of the cluster:

       - ``IDLE``
       - ``CREATING``
       - ``UPDATING``
       - ``DELETING``
       - ``DELETED``
       - ``REPAIRING``
