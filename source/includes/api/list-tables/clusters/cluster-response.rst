.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 66

   * - Name
     - Type
     - Description

   * - autoScaling
     - object
     - Collection of settings that configures auto-scaling information
       for the cluster.

       .. seealso::

          :ref:`cluster-autoscaling`.

   * - autoScaling.autoIndexingEnabled
     - boolean
     - Flag that indicates whether :ref:`autopilot mode <pa-autopilot>`
       for Performance Advisor is enabled. The default is **false**.

       .. include:: /includes/fact-autopilot-early-access.rst

   * - autoScaling.compute
     - object
     - Collection of settings that configure how a cluster might scale
       its cluster tier and whether the cluster can scale down.

   * - autoScaling.compute.enabled
     - boolean
     - Flag that indicates whether cluster tier auto-scaling is
       enabled.

   * - autoScaling.compute.scaleDownEnabled
     - boolean
     - Flag that indicates whether the cluster tier can scale down.

   * - autoScaling.diskGBEnabled
     - boolean
     - Flag that indicates whether disk auto-scaling is enabled.

   * - backupEnabled
     - boolean
     - Flag that indicates whether {+old-backup+} has been enabled.

       .. important::

          Clusters running MongoDB |fcv-link| 4.2 or later and any newnew |service| clusters of any type do not support this
          parameter. These clusters must use
          :doc:`/backup/cloud-backup/overview`:
          **providerBackupEnabled**

          This change doesn't affect existing |service| clusters that
          use {+old-backup+}s.

   * - biConnector
     - object
     - Collection of settings that configure a |bic| for the cluster.

       .. include:: /includes/extracts/cluster-option-bi-cluster-requirements.rst

   * - biConnector.enabled
     - boolean
     - Flag that indicates whether |service| enabled the |bic| for this
       cluster.

   * - biConnector.readPreference
     - string
     - Source from which the |bic| reads data.

       .. list-table::
          :header-rows: 1
          :stub-columns: 1
          :widths: 20 80

          * - Value
            - Description
          * - primary
            - |bic| reads data from the primary.
          * - secondary
            - |bic| reads data from a secondary.
          * - analytics
            - |bic| reads data from an
                :ref:`analytics node <analytics-nodes-overview>`.

   * - clusterType
     - string
     - Type of the cluster:

       .. list-table::
          :header-rows: 1
          :stub-columns: 1
          :widths: 20 80

          * - Value
            - Description

          * - REPLICASET
            - :term:`replica set`
          * - SHARDED
            - :term:`sharded cluster`
          * - GEOSHARDED
            - :doc:`global cluster </global-clusters>`

   * - connectionStrings
     - object
     - Set of
       :manual:`connection strings </reference/connection-string>`
       that your applications use to connect to this cluster.

       Use the parameters in this object to connect your applications
       to this cluster.

       .. seealso::

          :doc:`Connection String Options </reference/faq/connection-changes>`

       |service| returns the contents of this object after the
       cluster is operational, not while it builds the cluster.

   * - connectionStrings.privateEndpoint
     - array of objects
     - :ref:`Private endpoint <private-endpoint>` connection strings.
       Each object describes the connection strings you can use to
       connect to this cluster through a private endpoint. |service|
       returns this parameter only if you deployed a private endpoint to
       all regions to which you deployed this cluster's nodes.

   * - connectionStrings.privateEndpoint[n].connectionString
     - string
     - :ref:`Private-endpoint-aware 
       <private-endpoint-connection-strings>`
       **mongodb://**:manual:`connection string </reference/connection-string>`
       for this private endpoint.

   * - connectionStrings.privateEndpoint[n].endpoints
     - array of objects
     - Private endpoint through which you connect to |service|
       when you use
       **connectionStrings.privateEndpoint[n].connectionString** or 
       **connectionStrings.privateEndpoint[n].srvConnectionString**.

   * - connectionStrings.privateEndpoint[n].endpoints[n].endpointId
     - string
     - Unique identifier of the private endpoint.

   * - connectionStrings.privateEndpoint[n].endpoints[n].providerName
     - string
     - Cloud provider to which you deployed the private endpoint. 
       |service| returns **AWS** or **AZURE**.

   * - connectionStrings.privateEndpoint[n].endpoints[n].region
     - string
     - Region to which you deployed the private endpoint.

   * - connectionStrings.privateEndpoint[n].srvConnectionString
     - string
     - :ref:`Private-endpoint-aware <private-endpoint-connection-strings>`
       **mongodb+srv://** :manual:`connection string </reference/connection-string>`
       for this private endpoint.

       The **mongodb+srv** protocol tells the driver to look up the
       :ref:`seed list <connections-dns-seedlist>` of hosts in |dns|.
       |service| synchronizes this list with the nodes in a cluster. If
       the connection string uses this |uri| format, you don't need to:

       - Append the seed list or
       - Change the |uri| if the nodes change.

       Use this |uri| format if your driver supports it. If it doesn't,
       use **connectionStrings.privateEndpoint[n].connectionString**.

       .. seealso:: :manual:`Seedlist format </reference/connection-string/#dns-seedlist-connection-format>`

   * - connectionStrings.privateEndpoint[n].type
     - string
     - Type of MongoDB process that you connect to with the connection
       strings. |service| returns:

       - **MONGOD** for replica sets, or
       - **MONGOS** for sharded clusters.

   * - connectionStrings.standard
     - string
     - Public
       **mongodb://** :manual:`connection string </reference/connection-string>`
       for this cluster.

   * - connectionStrings.standardSrv
     - string
     - Public
       **mongodb+srv://** :manual:`connection string </reference/connection-string>`
       for this cluster.

       .. seealso::

          :manual:`Seedlist format </reference/connection-string/#dns-seedlist-connection-format>`

   * - connectionStrings.private
     - string
     - :ref:`Network-peering-endpoint-aware <vpc-peering>`
       **mongodb://**:manual:`connection strings </reference/connection-string>`
       for each interface |vpc| endpoint you configured to connect to
       this cluster. |service| returns this parameter only if you
       created a network peering connection to this cluster.

       .. note::

          For |aws| clusters, |service| doesn't return this parameter
          unless you :doc:`enable custom DNS </reference/api/aws-custom-dns-update>`.

   * - connectionStrings.privateSrv
     - string
     - :ref:`Network-peering-endpoint-aware <vpc-peering>`
       **mongodb+srv://** :manual:`connection strings </reference/connection-string>`
       for each interface |vpc| endpoint you configured to connect to
       this cluster. |service| returns this parameter only if you
       created a network peering connection to this cluster.

       The **mongodb+srv** protocol tells the driver to look up the
       :ref:`seed list <connections-dns-seedlist>` of hosts in |dns|.
       |service| synchronizes this list with the nodes in a cluster. If
       the connection string uses this |uri| format, you don't need to:

       - Append the seed list or
       - Change the |uri| if the nodes change.

       Use this |uri| format if your driver supports it. If it doesn't,
       use **connectionStrings.private**.

       .. seealso::

          :manual:`Seedlist format </reference/connection-string/#dns-seedlist-connection-format>`

       .. note::

          For |aws| clusters, |service| doesn't return this parameter
          unless you :doc:`enable custom DNS </reference/api/aws-custom-dns-update>`.

   * - connectionStrings.awsPrivateLink
     - object
     - 

       .. important::

          This field is deprecated. Use
          **connectionStrings.privateEndpoint[n].connectionString**
          instead.

       .. note::

          |service| returns this parameter only if: 

          - the cluster is deployed to |aws|, and
          - you deployed a {+aws-pl+} private endpoint to
            the same regions as all of this cluster's nodes.

       :ref:`Private-endpoint-aware <private-endpoint-connection-strings>`
       **mongodb://**:manual:`connection strings </reference/connection-string>`
       for each {+aws-pl+} private endpoint. |service| returns this
       parameter only if you deployed a {+aws-pl+} private endpoint to
       the same regions as all of this cluster's nodes.

       In this object:

       - Each key is the unique identifier of an interface endpoint.
       - Each value is the **mongodb://** connection string you use to
         connect to |service| through the interface endpoint the key
         names.

   * - connectionStrings.awsPrivateLinkSrv
     - object
     - 

       .. important::

          This field is deprecated. Use
          **connectionStrings.privateEndpoint[n].srvConnectionString**
          instead.

       .. note::

          |service| returns this parameter only if: 

          - the cluster is deployed to |aws|, and
          - you deployed a {+aws-pl+} private endpoint to
            the same regions as all of this cluster's nodes.

       :ref:`Private-endpoint-aware <private-endpoint-connection-strings>`
       **mongodb+srv://** :manual:`connection strings </reference/connection-string>`
       for each {+aws-pl+} private endpoint.

       In this object:

       - Each key is the unique identifier of an interface endpoint.
       - Each value is the **mongodb+srv://** connection string you use 
         to connect to |service| through the interface endpoint the key
         names.

       The **mongodb+srv** protocol tells the driver to look up the
       :ref:`seed list <connections-dns-seedlist>` of hosts in |dns|.
       |service| synchronizes this list with the nodes in a cluster. If
       the connection string uses this |uri| format, you don't need to:

       - Append the seed list or
       - Change the |uri| if the nodes change.

       Use this |uri| format if your driver supports it. If it doesn't,
       use **connectionStrings.awsPrivateLink**.

       .. seealso::

          :manual:`Seedlist format </reference/connection-string/#dns-seedlist-connection-format>`

   * - createDate
     - string
     - |iso8601-time| when |service| created the cluster.

   * - diskSizeGB
     - number
     - Capacity, in gigabytes, of the host's root volume. Increase this
       number to add capacity, up to a maximum possible value of
       **4096** (4 TB). This value must be a positive number.

       .. note:: When should you use ``diskSizeGB``?
       
          This setting:

          - Cannot be used with |nvme-clusters|
          - Cannot be used with |azure| clusters. Use
            :ref:`providerSettings.diskTypeName <create-cluster-providerSettings-diskTypeName>` instead.
          - Must be used when **replicationSpecs** is set

       The minimum disk size for dedicated clusters is 10 GB for |aws|
       and |gcp|, and 32 GB for |azure|. If you specify **diskSizeGB**
       with a lower disk size, |service| defaults to the minimum disk
       size value.

       .. important::

          |service| calculates storage charges differently
          depending on whether you choose the default value or a
          custom value.

          .. seealso::

             :ref:`storage-capacity`.

       .. include:: /includes/fact-storage-limitation.rst

   * - encryptionAtRestProvider
     - string
     - Cloud service provider that offers
       :doc:`Encryption at Rest </security-aws-kms>`.

       .. seealso::

          - :ref:`security-aws-kms`
          - :ref:`security-aws-kms-restrictions`.

   * - groupId
     - string
     - Unique identifier of the project to which the cluster belongs.

   * - id
     - string
     - Unique identifier of the cluster.

   * - labels
     - array of documents
     - Collection of key-value pairs that tag and categorize the
       cluster.

   * - mongoDBVersion
     - string
     - Version of MongoDB the cluster runs, in
       **<major version>.<minor version>** format.

   * - mongoDBMajorVersion
     - string
     - Major version of MongoDB the cluster runs:

       - 3.6
       - 4.0
       - 4.2
       - 4.4

   * - mongoURI
     - string
     - Base
       :manual:`connection string </reference/connection-string>` for
       the cluster.

       |service| only displays this parameter after the cluster is
       operational, not while it builds the cluster.

   * - mongoURIUpdated
     - string
     - |iso8601-time| when the connection string was last updated. The
       connection string changes if you update any of the other values.

   * - mongoURIWithOptions
     - string
     - :manual:`connection string </reference/connection-string>` for
       connecting to the |service| cluster. Includes the
       **replicaSet**, **ssl**, and **authSource** query parameters in
       the connection string with values appropriate for the cluster.

       To review the connection string format, see the
       :manual:`connection string format documentation </reference/connection-string>`.
       To add database users to a |service| project, see
       :ref:`mongodb-users`.

       |service| only displays this parameter after the cluster is
       operational, not while it builds the cluster.

   * - name
     - string
     - Name of the cluster as it appears in |service|.

   * - numShards
     - number
     - Positive integer that specifies the number of shards for a
       sharded cluster.

       If this is set to **1**, the cluster is a replica set.

       If this is set to **2** or higher, the cluster is a sharded
       cluster with the number of shards specified.

       .. seealso::

          :ref:`server-number-costs`.

       |service| might return values between **1** and **50**.

       .. note::

          |service| doesn't return this value in the response body for
          :doc:`Global Clusters </global-clusters>`.

   * - paused
     - boolean
     - Flag that indicates whether the cluster is paused.

   * - pitEnabled
     - boolean
     - Flag that indicates if the cluster uses :ref:`{+PIT-Restore+}
       backups <pit-restore>`.

   * - providerBackupEnabled
     - boolean
     - .. include:: /includes/fact-only-m10-clusters.rst

       Flag that indicates if the cluster uses
       :ref:`backup-cloud-provider` for backups.

       If **true**, the cluster uses :ref:`backup-cloud-provider` for
       backups. If **providerBackupEnabled** *and* **backupEnabled**
       are **false**, the cluster does not use |service| backups.

   * - providerSettings
     - object
     - Configuration for the provisioned hosts on which MongoDB
       runs. The available options are specific to the cloud service
       provider.

   * - providerSettings.autoScaling
     - object
     - Range of instance sizes to which your cluster can scale.

       .. important::

          You can't specify the **providerSettings.autoScaling** object
          if **"autoScaling.compute.enabled" : false**.

   * - providerSettings.autoScaling.compute
     - object
     - Range of instance sizes to which your cluster can scale.
       |service| requires this parameter if
       **"autoScaling.compute.enabled" : true**.

   * - providerSettings.autoScaling.compute.minInstanceSize
     - string
     - Minimum instance size to which your cluster can
       automatically scale.

   * - providerSettings.autoScaling.compute.maxInstanceSize
     - string
     - Maximum instance size to which your cluster can
       automatically scale.

   * - providerSettings.backingProviderName
     - string
     - Cloud service provider on which the multi-tenant host is
       provisioned. |service| returns this parameter only if **"providerSettings.providerName" : "TENANT"**.

       |service| can return:

       .. include:: /includes/api/list-tables/clusters/cloud-service-providers.rst

   * - providerSettings.providerName
     - string
     - Cloud service provider on which |service| provisioned the hosts.

       |service| can return:

       .. include:: /includes/api/list-tables/clusters/cloud-service-providers.rst

       .. list-table::
          :widths: 20 80
          :stub-columns: 1

          * - TENANT
            - **M2** or **M5** multi-tenant cluster.

              See **providerSettings.backingProviderName** for the
              cloud service provider where |service| provisioned the
              host serving the cluster.

   * - providerSettings.regionName
     - string
     - Physical location of your MongoDB cluster. The region you
       choose can affect network latency for clients accessing your
       databases.

       For a complete list of region name values, refer to the
       the cloud provider reference pages:

       - :ref:`AWS <amazon-aws>`

       - :ref:`GCP <google-gcp>`

       - :ref:`Azure <microsoft-azure>`

       For multi-region clusters, see **replicationSpec.<region>**.

   * - providerSettings.diskIOPS
     - number
     - Maximum |iops| the system can perform.

   * - providerSettings.diskTypeName
     - string
     - Disk type of the host's root volume for Azure instances.

       The following table lists the possible values for this
       parameter, and their corresponding storage size.

       .. list-table::
          :header-rows: 1
          :widths: 40 60

          * - diskTypeName
            - Storage Size

          * - P4 [#]_
            - 32GB

          * - P6
            - 64GB

          * - P10 [#]_
            - 128GB

          * - P15
            - 256GB

          * - P20
            - 512GB

          * - P30
            - 1024GB

          * - P40
            - 2048GB

          * - P50
            - 4095GB

       .. [#] Default for **M20** and **M30** Azure cluster tiers

       .. [#] Default for **M40+** Azure cluster tiers

   * - providerSettings.encryptEBSVolume
     - boolean
     - Flag that indicates whether the Amazon EBS encryption feature
       encrypts the host's root volume for both data at rest within the
       volume and for data moving between the volume and the cluster.

   * - providerSettings.instanceSizeName
     - string
     - Name of the cluster tier used for the |service| cluster.

       .. include:: /includes/fact-instance-size-names.rst

       .. tabs-cloud-providers::

          .. tab::
             :tabid: aws

             .. include:: /includes/list-tables/instance-types/aws.rst

          .. tab::
             :tabid: gcp

             .. include:: /includes/list-tables/instance-types/gcp.rst

          .. tab::
             :tabid: azure

             .. include:: /includes/list-tables/instance-types/azure.rst

       .. include:: /includes/fact-m2-m5-multi-tenant.rst

   * - replicationFactor
     - number
     - Number of :term:`replica set` members. Each member keeps a copy
       of your databases, providing high availability and data
       redundancy.

       For multi-region clusters, add the total number of
       **replicationSpec.<region>.electableNodes** to calculate the
       replication factor of the cluster.

       If your cluster is a sharded cluster, each shard is a replica
       set with the specified replication factor.

       |service| may return **3**, **5**, or **7**.

       .. seealso::

          - :ref:`server-number-costs`
          - :manual:`Replication </replication>`

   * - replicationSpec
     - object
     - Configuration of each region in the cluster. Each element
       in this object represents a region where |service| deploys
       your cluster.

   * - replicationSpec.<region>
     - object
     - Physical location of the region. The **<region>** string
       corresponds to a region where |service| deploys your cluster.

       Each **<region>** object describes the region's priority in
       elections and the number and type of MongoDB nodes |service|
       deploys to the region.

   * - replicationSpec.<region>.analyticsNodes
     - number
     - Number of :ref:`analytics nodes <analytics-nodes-overview>`
       in the region. Analytics nodes are useful for handling analytic
       data such as reporting queries from |bic|. Analytics nodes are
       read-only, and can never become the :term:`primary`.

   * - replicationSpec.<region>.electableNodes
     - number
     - Number of electable nodes in the region. Electable nodes
       can become the :term:`primary` and can facilitate local reads.

   * - replicationSpec.<region>.priority
     - number
     - Election priority of the region. The highest possible priority
       is **7**, which identifies the **Preferred Region** of the
       cluster. |service| places the :term:`primary` node in the
       **Preferred Region**. The lowest possible priority is **0**,
       which identifies a read-only region.

       You can have any number of priority **0** read only regions.
       Priorities **1** through **7** are exclusive: only one region
       per cluster can be assigned a given priority.

   * - replicationSpec.<region>.readOnlyNodes
     - number
     - Number of read-only nodes in the region. Read-only nodes can
       never become the :term:`primary` member, but can facilitate
       local reads.

   * - replicationSpecs
     - array
     - Configuration for each zone in a
       :doc:`Global Cluster </global-clusters>`. Each object in this
       array represents a zone where |service| deploys nodes for your
       Global Cluster.

   * - replicationSpecs[n].id
     - string
     - Unique identifier of the replication object.

   * - replicationSpecs[n].zoneName
     - string
     - Name for the zone.

   * - replicationSpecs[n].numShards
     - number
     - Number of shards to deploy in the specified zone.

   * - replicationSpecs[n].regionsConfig
     - object
     - Physical location of the region. Each **regionsConfig** object
       describes the region's priority in elections and the number and
       type of MongoDB nodes that |service| deploys to the region.

   * - replicationSpecs[n].regionsConfig.<region>.analyticsNodes
     - number
     - .. include:: /includes/fact-api-analytics-nodes-description.rst

   * - replicationSpecs[n].regionsConfig.<region>.electableNodes
     - number
     - Number of electable nodes for |service| to deploy to the region.
       Electable nodes can become the :term:`primary` and can
       facilitate local reads.

   * - replicationSpecs[n].regionsConfig.<region>.readOnlyNodes
     - number
     - Number of read-only nodes for |service| to deploy to the region.
       Read-only nodes can never become the :term:`primary`, but can
       facilitate local-reads.

       Specify **0** if you do not want any read-only nodes in the
       region.

   * - replicationSpecs[n].regionsConfig.<region>.priority
     - number
     - Election priority of the region. If you have regions with only
       read-only nodes, set this value to **0**.

   * - replicationSpecs[n].zoneName
     - string
     - Name for the zone in a |global-write-cluster|. Do not provide
       this value if **clusterType** is not **GEOSHARDED**.

   * - srvAddress
     - string
     - :manual:`Connection string </reference/connection-string>` for
       connecting to the |service| cluster. The **+srv** modifier
       forces the connection to use |tls|. The **mongoURI** parameter
       lists additional options.

   * - stateName
     - string
     - Current state of the cluster. The possible states are:

       - **IDLE**
       - **CREATING**
       - **UPDATING**
       - **DELETING**
       - **DELETED**
       - **REPAIRING**
