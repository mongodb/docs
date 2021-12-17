.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 11 55

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - backupEnabled
     - Boolean
     - Optional
     - Flag that indicates whether the cluster can perform backups.

       - If **true**, the cluster can perform backups. You must set
         this value to **true** for |nvme| clusters.

         Backup uses:

         - :ref:`backup-cloud-provider` for {+dedicated-clusters+}.
         - :ref:`m2-m5-snapshots` for tenant clusters.

       - If **"backupEnabled" : false**, the cluster doesn't use
         |service| backups.

       This parameter defaults to **false**.

   * - biConnector
     - object
     - Optional
     - Configuration settings applied to |bic| on this cluster.

       .. include:: /includes/extracts/cluster-option-bi-cluster-requirements.rst

   * - | biConnector
       | .enabled
     - Boolean
     - Optional
     - Flag that indicates whether this cluster has |bic| enabled.

   * - | biConnector
       | .readPreference
     - string
     - Optional
     - Source from which the |bic| reads data. Each |bic| read
       preference contains a distinct combination of
       :manual:`readPreference </core/read-preference/>` and
       :manual:`readPreferenceTags </core/read-preference/ tag-sets>`
       options.

       This API resource accepts **primary**, **secondary**, or
       **analytics**.

       This parameter defaults to **analytics** if the cluster includes
       analytics nodes. If the cluster lacks analyics nodes, the
       default value is **secondary**.

       To set the **readPreference** value to **"analytics"** requires
       the cluster to have at least one analytics node. Once you have
       set the **readPreference** value to **"analytics"**, you must
       have at least one analytics node in the cluster.

       **See also:** :ref:`BI Connector Read Preferences Table <bic-read-preferences>`.

   * - clusterType
     - string
     - Required
     - Type of the cluster that you want to create.

       This API resource accepts :term:`REPLICASET <replica set>`,
       :term:`SHARDED <sharded cluster>`, and
       :doc:`GEOSHARDED </global-clusters>`.

   * - diskSizeGB
     - number
     - Optional
     - Capacity, in gigabytes, of the host's root volume. Increase this
       number to add capacity, up to a maximum possible value of
       ``4096`` (i.e., 4 TB). This value must be a positive number.

       You can't set this value with |nvme-clusters|.

       The minimum disk size for {+dedicated-clusters+} is 10 GB for |aws|
       and |gcp|. If you specify **diskSizeGB** with a lower disk size,
       |service| defaults to the minimum disk size value.

       If your cluster includes Azure nodes, this value must correspond
       to an existing Azure disk type (8, 16, 32, 64, 128, 256, 512,
       1024, 2048, or 4095)

       |service| calculates storage charges differently depending on
       whether you choose the default value or a custom value.

       .. include:: /includes/cluster-settings/storage-limitation.rst

       If your cluster spans cloud service providers, this value
       defaults to the minimum default of the providers involved.

       **See also:** :ref:`storage-capacity`.

   * - encryptionAtRestProvider
     - string
     - Optional
     - Cloud service provider that offers
       :doc:`Encryption at Rest </security-aws-kms>`.

       .. tabs::

          .. tab:: AWS
             :tabid: aws

             Specify **AWS** to enable
             :doc:`Encryption at Rest </security-aws-kms>` using the
             |service| project |aws| Key Management System settings.
             The cluster must meet the following requirements:

             .. include:: /includes/cluster-settings/encryption-at-rest-restrictions-advanced.rst

          .. tab:: GCP
             :tabid: gcp

             Specify **GCP** to enable :doc:`Encryption at Rest
             </security-kms-encryption/>` using the |service| project
             |gcp| Key Management System settings. The cluster must
             meet the following requirements:

             .. include:: /includes/cluster-settings/encryption-at-rest-restrictions-advanced.rst

          .. tab:: Azure
             :tabid: azure

             Specify **AZURE** to enable
             :ref:`Encryption at Rest <security-azure-kms>` using the
             |service| project Azure Key Management System settings.
             The cluster must meet the following requirements:

             .. include:: /includes/cluster-settings/encryption-at-rest-restrictions-advanced.rst

          .. tab:: NONE
             :tabid: none

             Specify **NONE** to disable encryption at rest.

   * - labels
     - array
     - Optional
     - Collection of key-value pairs that tag and categorize the
       cluster. Each key and value has a maximum length of 255
       characters.

       .. literalinclude:: /includes/cluster-settings/example-labels.json

       The |service| console doesn't display your **labels**. The |api|
       returns the labels in the response body when you use the |api|
       to:

       - :doc:`get one </reference/api/cluster-advanced/get-one-cluster-advanced>` |service|
         cluster
       - :doc:`get all </reference/api/cluster-advanced/get-all-cluster-advanced>` |service|
         clusters
       - :doc:`modify </reference/api/cluster-advanced/modify-one-cluster-advanced>` a
         |service| cluster

   * - mongoDBMajorVersion
     - string
     - Optional
     - Version of the cluster to deploy. |service| supports the
       following MongoDB versions for **M10** or greater clusters:

       - **3.6**
       - **4.0**
       - **4.2**
       - **4.4**

       If omitted, |service| deploys a cluster that runs MongoDB 4.4.

       If **"replicationSpecs[n].regionConfigs[m].<type>Specs.instanceSize":
       "M0"**, **"M2"**, or **"M5"**, deploy MongoDB **4.4**.

       |service| always deploys the cluster with the latest stable
       release of the specified version. You can upgrade to a newer
       version of MongoDB when you :doc:`modify a cluster
       </reference/api/clusters-modify-one>`.

       If you set a value to this parameter and set
       **"versionReleaseSystem" : "CONTINUOUS"**, the resource returns
       an error. Either clear this parameter or set
       **"versionReleaseSystem" : "LTS"**.

   * - name
     - string
     - Required
     - Label that identifies this cluster. After |service| creates the
       cluster, you can't change its name.

   * - pitEnabled
     - Boolean
     - Optional
     - Flag that indicates whether the cluster uses
       :ref:`{+pit-restore+}s <pit-restore>`.

   * - replicationSpecs
     - array
     - Required
     - Configuration for cluster regions and the hardware provisioned
       in them.

   * - | replicationSpecs[n]
       | .numShards
     - number
     - Conditional
     - Positive integer that specifies the number of shards to deploy
       in each specified zone. Provide this value if you set a
       **clusterType** of **SHARDED** or **GEOSHARDED**. Omit this
       value if you selected a **clusterType** of **REPLICASET**.

       This API resource accepts **1** through **50**, inclusive. This
       parameter defaults to **1**.

       If you specify a **numShards** value of **1** and a
       **clusterType** of **SHARDED**, |service| deploys a single-shard
       :term:`sharded cluster`.

       .. include:: /includes/cluster-settings/single-shard-cluster-warning.rst

       **See Also:**

       - :manual:`Sharding </sharding>`
       - :ref:`server-number-costs`

   * - | replicationSpecs[n]
       | .regionConfigs
     - array
     - Required
     - Hardware specifications for nodes set for a given region. Each
       **regionConfigs** object describes the region's priority in
       elections and the number and type of MongoDB nodes that
       |service| deploys to the region.

       Each **regionConfigs** object must have either an
       **analyticsSpecs** object, **electableSpecs** object, or
       **readOnlySpecs** object.

       - Tenant clusters only require **electableSpecs**.

       - Dedicated clusters can specify any of these specifications,
         but must have at least one **electableSpecs** object within a
         **replicationSpec**.

       - Every hardware specification must use the same
         **instanceSize**.

       .. example::

          If you set
          **replicationSpecs[n].regionConfigs[m].analyticsSpecs.instanceSize**
          to **M30**, you must set
          **replicationSpecs[n].regionConfigs[m].electableSpecs.instanceSize**
          to **M30** if you have electable nodes and
          **replicationSpecs[n].regionConfigs[m].readOnlySpecs.instanceSize**
          to **M30** if you have read-only nodes.

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .analyticsSpecs
     - object
     - Optional
     - Hardware specifications for
       :ref:`analytics nodes <analytics-nodes-overview>` needed in the
       region. Analytics nodes handle analytic data such as reporting
       queries from |bic|. Analytics nodes are read-only and can never
       become the :term:`primary`.

       If you don't specify this parameter, no analytics nodes deploy to
       this region.

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .analyticsSpecs
       | .diskIOPS
     - number
     - AWS Optional
     - Target throughput (|iops|) desired for |aws| storage attached to
       your cluster.

       .. include:: /includes/cluster-settings/multicloud/set-aws-only.rst

       To change this value from the default, set
       **replicationSpecs[n].regionConfigs[m].analyticsSpecs.ebsVolumeType**
       to **PROVISIONED**.

       .. include:: /includes/cluster-settings/providerSettings/diskIOPS-advanced.rst
       .. include:: /includes/cluster-settings/minimum-iops.rst

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .analyticsSpecs
       | .ebsVolumeType
     - string
     - AWS Optional
     - Type of storage you want to attach to your |aws|-provisioned
       cluster.

       .. include:: /includes/cluster-settings/multicloud/set-aws-only.rst

       .. include:: /includes/cluster-settings/providerSettings/volumeType.rst

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .analyticsSpecs
       | .instanceSize
     - string
     - Conditional
     - .. include:: /includes/cluster-settings/instance-size-parameter-advanced.rst

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .analyticsSpecs
       | .nodeCount
     - number
     - Conditional
     - .. include:: /includes/cluster-settings/api-analytics-nodes-description.rst

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .autoScaling
     - object
     - Optional
     - Collection of settings that configures auto-scaling information
       for the cluster.

       The values for the **.autoScaling** parameter must be the same
       for every item in the **replicationSpecs** array.

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .autoScaling
       | .diskGB
       | .enabled
     - Boolean
     - Optional
     - Flag that indicates whether this cluster enables disk
       auto-scaling. This parameter defaults to **true**.

       - Set to **true** to enable disk auto-scaling.
       - Set to **false** to disable disk auto-scaling.

       .. include:: /includes/cluster-settings/ram-to-storage-ratio.rst

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .autoScaling
       | .compute
     - object
     - Optional
     - Collection of settings that configure how a cluster might scale
       its instance size and whether the cluster can scale down.

       Cluster tiers with  **Low CPU** or **NVME** storage classes
       can't use auto-scaling.

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .autoScaling
       | .compute
       | .enabled
     - Boolean
     - Optional
     - Flag that indicates whether instance size auto-scaling is
       enabled. This parameter defaults to **false**.

       - Set to **true** to enable instance size auto-scaling. If
         enabled, you must specify a value for
         **replicationSpecs[n].regionConfigs[m].autoScaling.compute.maxInstanceSize**.

       - Set to **false** to disable instance size auto-scaling.

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .autoScaling
       | .compute
       | .scaleDownEnabled
     - Boolean
     - Conditional
     - Flag that indicates whether the instance size may scale down.
       |service| requires this parameter if
       **"replicationSpecs[n].regionConfigs[m].autoScaling.compute.enabled" : true**.

       If you enable this option, specify a value for
       **replicationSpecs[n].regionConfigs[m].autoScaling.compute.minInstanceSize**.

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .autoScaling
       | .compute
       | .minInstanceSize
     - string
     - Conditional
     - Minimum instance size to which your cluster can automatically
       scale (such as **M10**). |service| requires this parameter if
       **"replicationSpecs[n].regionConfigs[m].autoScaling.compute.
       scaleDownEnabled" : true**.

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .autoScaling
       | .compute
       | .maxInstanceSize
     - string
     - Conditional
     - Maximum instance size to which your cluster can automatically
       scale (such as **M40**). |service| requires this parameter if
       **"replicationSpecs[n].regionConfigs[m].autoScaling.compute
       .enabled" : true**.

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .backingProviderName
     - string
     - Conditional
     - Cloud service provider on which you provision the host for a
       multi-tenant cluster.

       Use this setting only when
       **"replicationSpecs[n].regionConfigs[m].providerName" :
       "TENANT"** and
       **"replicationSpecs[n].regionConfigs[m].<type>Specs.instanceSize":
       M2** or **M5**.

       The API resource accepts the following values:

       .. include:: /includes/api/list-tables/clusters/cloud-service-providers-advanced.rst

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .electableSpecs
     - object
     - Optional
     - Hardware specifications for electable nodes in the region.
       Electable nodes can become the :term:`primary` and can enable
       local reads.

       If you do not specify this option, no electable nodes are
       deployed to the region.

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .electableSpecs
       | .diskIOPS
     - number
     - AWS Optional
     - Target throughput (|iops|) desired for |aws| storage attached to
       your cluster.

       .. include:: /includes/cluster-settings/multicloud/set-aws-only.rst

       To change this value from the default, set **.ebsVolumeType** to
       **PROVISIONED**.

       .. include:: /includes/cluster-settings/providerSettings/diskIOPS-advanced.rst

       .. include:: /includes/cluster-settings/minimum-iops.rst

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .electableSpecs
       | .ebsVolumeType
     - string
     - AWS Optional
     - Type of storage you want to attach to your |aws|-provisioned
       cluster.

       .. include:: /includes/cluster-settings/multicloud/set-aws-only.rst

       .. include:: /includes/cluster-settings/providerSettings/volumeType.rst

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .electableSpecs
       | .instanceSize
     - string
     - Conditional
     - .. include:: /includes/cluster-settings/instance-size-parameter-advanced.rst

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .electableSpecs
       | .nodeCount
     - number
     - Conditional
     - Number of electable nodes for |service| to deploy to the region.
       Electable nodes can become the :term:`primary` and can enable
       local reads.

       The combined **electableSpecs.nodeCount** across all
       **replicationSpecs[n].regionConfigs[m]** objects must total
       **3**, **5**, or **7**.

       You cannot create electable nodes if the
       **replicationSpecs[n].regionConfigs[m].priority** is **0**.

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .priority
     - Integer
     - Required
     - Precedence is given to this region when a primary election
       occurs.

       If your **regionConfigs** has only **.readOnlySpecs**,
       **.analyticsSpecs**, or both, set this value to **0**.

       If you have multiple **regionConfigs** objects (your cluster is
       multi-region or multi-cloud), they must have priorities in
       descending order. The highest priority is **7**.

       .. example::

          Set your highest priority region to **7**, your
          second-highest priority to **6**, and your third-priority
          region to **5**. If you have no electable nodes, set this
          value to **0**.

       If your region has set **.electableSpecs.nodeCount** to **1** or
       higher, it must have a priority of exactly one **(1)** less than
       another region in the **replicationSpecs[n].regionConfigs[m]**
       array. The highest-priority region **must** have a priority of
       **7**. The lowest possible priority is **1**.

       The priority **7** region identifies the **Preferred Region** of
       the cluster. |service| places the :term:`primary` node in the
       **Preferred Region**. Priorities **1** through **7** are
       exclusive: you can't assign a given priority to more than one
       region per cluster.

       .. example::

          If you have three regions, their priorities would be **7**,
          **6**, and **5** respectively. If you added two more regions
          for supporting electable nodes, the priorities of those
          regions would be **4** and **3** respectively.

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .providerName
     - string
     - Required
     - Cloud service provider on which |service| provisions the hosts.

       - Set {+dedicated-clusters+} to **AWS**, **GCP**, or **AZURE**.

       - Set M2/M5 {+clusters+} to **TENANT**.

       .. include:: /includes/api/list-tables/clusters/cloud-service-providers-advanced.rst

       .. include:: /includes/cluster-settings/multi-tenant-advanced.rst

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .readOnlySpecs
     - object
     - Optional
     - Hardware specifications for read-only nodes in the region.
       Read-only nodes can never become the :term:`primary` member, but
       can enable local reads.

       If you don't specify this parameter, no read-only nodes are
       deployed to the region.

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .readOnlySpecs
       | .diskIOPS
     - number
     - AWS Optional
     - Target throughput (|iops|) desired for |aws| storage attached to
       your cluster.

       .. include:: /includes/cluster-settings/multicloud/set-aws-only.rst

       To change this value from the default, set **.ebsVolumeType**
       must be **PROVISIONED**.

       .. include:: /includes/cluster-settings/providerSettings/diskIOPS-advanced.rst

       .. include:: /includes/cluster-settings/minimum-iops.rst

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .readOnlySpecs
       | .ebsVolumeType
     - string
     - AWS Optional
     - Type of storage you want to attach to your |aws|-provisioned
       cluster.

       .. include:: /includes/cluster-settings/multicloud/set-aws-only.rst

       .. include:: /includes/cluster-settings/providerSettings/volumeType.rst

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .readOnlySpecs
       | .instanceSize
     - string
     - Conditional
     - .. include:: /includes/cluster-settings/instance-size-parameter-advanced.rst

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .readOnlySpecs
       | .nodeCount
     - number
     - Conditional
     - Number of read-only nodes for |service| to deploy to the region.
       Read-only nodes can never become the :term:`primary`, but can
       enable local reads.

   * - | replicationSpecs[n]
       | .regionConfigs[m]
       | .regionName
     - string
     - Required
     - Physical location of your MongoDB cluster nodes. The region you
       choose can affect network latency for clients accessing your
       databases.

       .. include:: /includes/cluster-settings/group-region-association.rst

       Select your cloud service provider's tab for example cluster
       region names:

       .. include:: /includes/cluster-settings/cloud-region-name-examples.rst

   * - | replicationSpecs[n]
       | .zoneName
     - string
     - Conditional
     - Name for the zone in a |global-write-cluster|. Provide
       this value if you set **clusterType** to **GEOSHARDED**.

   * - rootCertType
     - string
     - Optional
     - .. include:: /includes/cluster-settings/rootcert.rst

   * - versionReleaseSystem
     - string
     - Optional
     - Method by which this cluster maintains the MongoDB versions. The
       resource accepts **CONTINUOUS** or **LTS** (Long Term Support).

       This parameter defaults to **LTS**.

       If you set this parameter to **CONTINUOUS** and set any value
       for **mongoDBMajorVersion**, this resource returns an error.
