.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 11 55

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - autoScaling
     - object
     - Optional
     - Collection of settings that configures auto-scaling information
       for the cluster.

       If you specify the **autoScaling** object, you must also specify
       the **providerSettings.autoScaling** object.

       .. seealso:: :ref:`cluster-autoscaling`.

   * - autoScaling.compute
     - object
     - Optional
     - Collection of settings that configure how a cluster might scale
       its cluster tier and whether the cluster can scale down.

       .. important::

          Cluster tier auto-scaling is not available for clusters
          using **Low CPU** or **NVME** storage classes.

   * - autoScaling.compute.enabled
     - boolean
     - Optional
     - Flag that indicates whether cluster tier auto-scaling is
       enabled. The default is **false**.

       - Set to **true** to enable cluster tier auto-scaling. If
         enabled, you must specify a value for
         **providerSettings.autoScaling.compute.maxInstanceSize**.

       - Set to **false** to disable cluster tier auto-scaling.

   * - autoScaling.compute.scaleDownEnabled
     - boolean
     - Conditional
     - Flag that indicates whether the cluster tier may scale down.
       |service| requires this parameter if
       **"autoScaling.compute.enabled" : true**.

       If you enable this option, specify a value for
       **providerSettings.autoScaling.compute.minInstanceSize**.

   * - autoScaling.diskGBEnabled
     - boolean
     - Optional
     - Flag that indicates whether disk auto-scaling is enabled. The
       default is **true**.

       - Set to **true** to enable disk auto-scaling.
       - Set to **false** to disable disk auto-scaling.

       .. include:: /includes/fact-ram-to-storage-ratio.rst

   * - backupEnabled
     - boolean
     - Optional
     - Flag that indicates whether
       :doc:`{+old-backup+}s </backup/legacy-backup/overview>` have
       been enabled.

       .. include:: /includes/fact-only-m10-clusters.rst

       .. important::

          Clusters running MongoDB |fcv-link| 4.2 or later and any new
          |service| clusters of any type do not support this parameter.
          These clusters must use :doc:`/backup/cloud-backup/overview`:
          **providerBackupEnabled**

          If you create a new |service| cluster and set
          **"backupEnabled" : true**, the |api| responds with an error.

          This change doesn't affect existing clusters that use
          {+old-backup+}s.

       Set to **true** to enable |service|
       :doc:`{+old-backup+}s </backup/legacy-backup/overview>` for the
       cluster.

       Set to **false** to disable {+old-backup+}s for the cluster.
       |service| deletes any stored snapshots.

       To learn more about snapshot storage, see the {+old-backup+}
       :ref:`retention-policy`.

       You can't enable {+old-backup+}s if you have an
       existing cluster in the project with
       :doc:`/backup/cloud-backup/overview` enabled.

       The default value is **false**.

   * - biConnector
     - object
     - Optional
     - Configuration of |bic| on this cluster.

       .. include:: /includes/extracts/cluster-option-bi-cluster-requirements.rst

   * - biConnector.enabled
     - boolean
     - Optional
     - Flag that indicates whether or not |bic| is enabled on the
       cluster.

       - Set to **true** to enable |bic|.
       - Set to **false** to disable |bic|.

   * - biConnector.readPreference
     - string
     - Optional
     - Source from which the |bic| reads data. Each |bic| read
       preference contains a distinct combination of
       :manual:`readPreference </core/read-preference/>` and
       :manual:`readPreferenceTags </core/read-preference/#tag-sets>`
       options.

       .. seealso:: :ref:`BI Connector Read Preferences Table <bic-read-preferences>`.

       .. list-table::
          :header-rows: 1
          :stub-columns: 1
          :widths: 20 80

          * - Value
            - Description
          * - primary
            - |bic| reads data from the primary.
          * - secondary
            - |bic| reads data from a secondary. *The preference
              defaults to this value if there are no analytics nodes in
              the cluster*.
          * - analytics
            - |bic| reads data from an :ref:`analytics node
              <analytics-nodes-overview>`. *Default if the cluster
              contains analytics nodes*.

       .. note::

          To set the **readPreference** value to **"analytics"**,
          the cluster must have at least one analytics node.

          If the **readPreference** value is **"analytics"**, you
          cannot remove all analytics nodes from the cluster.

   * - clusterType
     - string
     - Conditional
     - Type of the cluster that you want to create.

       .. admonition:: When should you use **clusterType**?
          :class: note

          .. list-table::
             :header-rows: 1
             :widths: 80 20

             * - Condition
               - Necessity

             * - You set **replicationSpecs**.
               - Required

             * - You are deploying
                 :doc:`Global Clusters </global-clusters>`.
               - Required

             * - You are deploying non-Global replica sets and sharded
                 clusters.
               - Optional

       |service| accepts:

       .. list-table::
          :header-rows: 1
          :widths: 60 40

          * - Value
            - Cluster Type
          * - REPLICASET
            - :term:`replica set`
          * - SHARDED
            - :term:`sharded cluster`
          * - GEOSHARDED
            - :doc:`global cluster </global-clusters>`

   * - connectionStrings
     - object
     - Required
     - Set of
       :manual:`connection strings </reference/connection-string>`
       that your applications use to connect to this cluster.

       Use the parameters in this object to connect your applications
       to this cluster.

       .. seealso:: :doc:`Connection String Options </reference/faq/connection-changes>`

       |service| returns the contents of this object after the
       cluster starts, not while it builds the cluster.

   * - connectionStrings.standard
     - string
     - Conditional
     - Public
       **mongodb://** :manual:`connection string
       </reference/connection-string>` for this cluster.

   * - connectionStrings.standardSrv
     - string
     - Conditional
     - Public
       **mongodb+srv://** :manual:`connection string
       </reference/connection-string>` for this cluster.

       The **mongodb+srv** protocol tells the driver to look up the
       :ref:`seed list <connections-dns-seedlist>` of hosts in |dns|.
       |service| synchronizes this list with the nodes in a cluster. If
       the connection string uses this |uri| format, you don't need to:

       - Append the seed list or
       - Change the |uri| if the nodes change.

       Use this |uri| format if your driver supports it. If it doesn't,
       use **connectionStrings.standard**.

       .. seealso:: :manual:`Seedlist format </reference/connection-string/#dns-seedlist-connection-format>`

   * - connectionStrings.private
     - string
     - Conditional
     - :ref:`Network-peering-endpoint-aware <vpc-peering>`
       **mongodb://**:manual:`connection strings </reference/connection-string>`
       for each interface |vpc| endpoint you configured to connect to
       this cluster. |service| returns this parameter only if you created a network peering
       connection to this cluster.

   * - connectionStrings.privateSrv
     - string
     - Conditional
     - :ref:`Network-peering-endpoint-aware <vpc-peering>`
       **mongodb+srv://** :manual:`connection strings </reference/connection-string>`
       for each interface |vpc| endpoint you configured to connect to
       this cluster. |service| returns this parameter only if you created a network peering
       connection to this cluster.

       The **mongodb+srv** protocol tells the driver to look up the
       :ref:`seed list <connections-dns-seedlist>` of hosts in |dns|.
       |service| synchronizes this list with the nodes in a cluster. If
       the connection string uses this |uri| format, you don't need to:

       - Append the seed list or
       - Change the |uri| if the nodes change.

       Use this |uri| format if your driver supports it. If it doesn't,
       use **connectionStrings.private**.

       .. seealso:: :manual:`Seedlist format </reference/connection-string/#dns-seedlist-connection-format>`

   * - connectionStrings.awsPrivateLink
     - string
     - Conditional
     - :ref:`Private-endpoint-aware <private-endpoint-connection-strings>`
       **mongodb://**:manual:`connection strings
       </reference/connection-string>` for each interface |vpc|
       endpoint you configured to connect to this cluster. |service|
       returns this parameter only if you created a {+aws-pl+}
       connection to this cluster.

   * - connectionStrings.awsPrivateLinkSrv
     - string
     - Conditional
     - :ref:`Private-endpoint-aware <private-endpoint-connection-strings>`
       **mongodb+srv://** :manual:`connection strings
       </reference/connection-string>` for each interface |vpc|
       endpoint you configured to connect to this cluster. |service|
       returns this parameter only if you created a {+aws-pl+}
       connection to this cluster.

       The **mongodb+srv** protocol tells the driver to look up the
       :ref:`seed list <connections-dns-seedlist>` of hosts in |dns|.
       |service| synchronizes this list with the nodes in a cluster. If
       the connection string uses this |uri| format, you don't need to:

       - Append the seed list or
       - Change the |uri| if the nodes change.

       Use this |uri| format if your driver supports it. If it doesn't,
       use **connectionStrings.awsPrivateLink**.

       .. seealso:: :manual:`Seedlist format </reference/connection-string/#dns-seedlist-connection-format>`

   * - diskSizeGB
     - number
     - Conditional
     - Capacity, in gigabytes, of the host's root volume. Increase this
       number to add capacity, up to a maximum possible value of
       **4096** (4 TB). This value must be a positive integer.

       .. admonition:: When should you use **diskSizeGB**?
          :class: note

          This setting:

          - Cannot be used with |nvme-clusters|.
          - Cannot be used with |azure| clusters. Use
            :ref:`providerSettings.diskTypeName <create-cluster-providerSettings-diskTypeName>` instead.
          - Must be used when **replicationSpecs** is set.

       The minimum disk size for dedicated clusters is 10 GB for |aws|
       and |gcp|, and 32 GB for |azure|. If you specify **diskSizeGB**
       with a lower disk size, |service| defaults to the minimum disk
       size value.

       .. important::

          |service| calculates storage charges differently
          depending on whether you choose the default value or a
          custom value.

          .. seealso:: :ref:`storage-capacity`.

       .. include:: /includes/fact-storage-limitation.rst

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

             .. include:: /includes/fact-encryption-at-rest-restrictions.rst

          .. tab:: GCP
             :tabid: gcp

             Specify **GCP** to enable
             :doc:`Encryption at Rest </security-kms-encryption/>`
             using the |service| project |gcp| Key Management System
             settings. The cluster must meet the following
             requirements:

             .. include:: /includes/fact-encryption-at-rest-restrictions.rst

          .. tab:: Azure
             :tabid: azure

             Specify **AZURE** to enable
             :ref:`Encryption at Rest <security-azure-kms>` using
             the |service| project Azure Key Management System
             settings. The cluster must meet the following
             requirements:

             .. include:: /includes/fact-encryption-at-rest-restrictions.rst

          .. tab:: NONE
             :tabid: none

             Specify **NONE** to disable encryption at rest.

   * - labels
     - array of objects
     - Optional
     - Collection of key-value pairs that tag and categorize the
       cluster.

       Each key and value has a maximum length of 255 characters.

       .. include:: /includes/fact-example-labels.rst

       .. note::

          The |service| console doesn't display your **labels**.
          |service| returns them in the response body when you use the
          |service| |api| to

          - :doc:`get one </reference/api/clusters-get-one/>` |service|
            cluster
          - :doc:`get all </reference/api/clusters-get-all/>` |service|
            clusters
          - :doc:`modify </reference/api/clusters-modify-one/>` a
            |service| cluster

   * - mongoDBMajorVersion
     - string
     - Optional
     - Version of the cluster to deploy. |service| supports the
       following MongoDB versions for **M10+** clusters:

       - **3.6**
       - **4.0**
       - **4.2**
       - **4.4**

       You must set this value to **4.4** if
       **"providerSettings.instanceSizeName" : "M2"** or **"M5"**.

       .. include:: /includes/admonitions/version-4.4-shared-tier-exception.rst

       |service| always deploys the cluster with the latest stable
       release of the specified version. You can upgrade to a newer
       version of MongoDB when you
       :doc:`modify a cluster </reference/api/clusters-modify-one>`.

   * - name
     - string
     - Required
     - Name of the cluster as it appears in |service|. After |service|
       creates the cluster, you can't change its name.

   * - numShards
     - number
     - Conditional
     - Positive integer that specifies the number of shards to deploy
       for a sharded cluster.

       .. important::

          If you use the **replicationSpecs** parameter, you must set
          **numShards**.

       |service| accepts **1** through **50**, inclusive. The default
       value is **1**.

       - If you specify a **numShards** value of **1** and a
         **clusterType** of **SHARDED**, |service| deploys a
         single-shard :term:`sharded cluster`.

       - If you specify a **numShards** value of **1** and a
         **clusterType** of **REPLICASET**, |service| deploys a
         :term:`replica set`.

       .. include:: /includes/fact-single-shard-cluster-warning.rst

       .. seealso::

          - :manual:`Sharding </sharding>`
          - :ref:`server-number-costs`

       .. note::

          Don't include in the request body for
          :doc:`Global Clusters </global-clusters>`.

   * - pitEnabled
     - boolean
     - Optional
     - Flag that indicates the cluster uses
       :ref:`{+pit-restore+}s <pit-restore>`.

       - Set to **true** to enable :ref:`{+pit-restore+}s
         <pit-restore>`. Requires that you set
         **providerBackupEnabled** to **true**.

       - Set to **false** to disable
         :ref:`{+pit-restore+}s <pit-restore>`.

   * - providerBackupEnabled
     - boolean
     - Optional
     - .. include:: /includes/fact-only-m10-clusters.rst

       Flag that indicates if the cluster uses
       :ref:`backup-cloud-provider` for backups.

       - If **true**, the cluster uses :ref:`backup-cloud-provider` for
         backups.

       - If **"providerBackupEnabled" : false** *and* **"backupEnabled"
         : false**, the cluster doesn't use |service| backups.

       You cannot enable {+Cloud-Backup+}s if you have an existing
       cluster in the project with :ref:`legacy-backup` enabled.

       .. important::

          You must set this value to **true** for |nvme| clusters.

   * - providerSettings
     - object
     - Required
     - Configuration for the provisioned hosts on which MongoDB runs.
       The available options are specific to the cloud service
       provider.

   * - providerSettings.autoScaling
     - object
     - Conditional
     - Range of instance sizes to which your cluster can scale.

       .. important::

          You can't specify the **providerSettings.autoScaling** object
          if **"autoScaling.compute.enabled" : false**.

   * - providerSettings.autoScaling.compute
     - object
     - Conditional
     - Range of instance sizes to which your cluster can scale.
       |service| requires this parameter if
       **"autoScaling.compute.enabled" : true**.

   * - providerSettings.autoScaling.compute.minInstanceSize
     - string
     - Conditional
     - Minimum instance size to which your cluster can automatically
       scale (such as **M10**). |service| requires this parameter if
       **"autoScaling.compute.scaleDownEnabled" : true**.

   * - providerSettings.autoScaling.compute.maxInstanceSize
     - string
     - Conditional
     - Maximum instance size to which your cluster can automatically
       scale (such as **M40**). |service| requires this parameter if
       **"autoScaling.compute.enabled" : true**.

   * - providerSettings.backingProviderName
     - string
     - Conditional
     - Cloud service provider on which the host for a multi-tenant
       cluster is provisioned.

       This setting only works when **"providerSetting.providerName" :
       "TENANT"** and **"providerSetting.instanceSizeName" : M2** or
       **M5**.

       |service| accepts the following values:

       .. include:: /includes/fact-cloud-service-providers.rst

   * - providerSettings.diskIOPS
     - number
     - Conditional
     - Disk |iops| setting for |aws| storage. Set only if you selected
       |aws| as your cloud service provider.

       .. include:: /includes/providerSettings-diskIOPS.rst

       .. include:: /includes/fact-aws-minimum-iops.rst

   * - providerSettings.diskTypeName
     - string
     - Conditional
     - Type of disk if you selected |azure| as your cloud service
       provider.

       .. include:: /includes/create-cluster-providerSettings-diskTypeName.rst

   * - providerSettings.encryptEBSVolume
     - boolean
     - Conditional
     - Flag that indicates whether the Amazon EBS encryption feature
       encrypts the host's root volume for both data at rest within
       the volume and for data moving between the volume and the
       cluster.

       .. note::

          This setting is always enabled for |nvme-clusters|.

       The default value is **true**.

   * - providerSettings.instanceSizeName
     - string
     - Required
     - |service| provides different cluster tiers, each with a default
       storage capacity and RAM size. The cluster you select is
       used for all the data-bearing hosts in your cluster tier.

       .. seealso:: :ref:`server-number-costs`.

       .. important::
          If you are deploying a :doc:`Global Cluster
          </global-clusters>`, you must choose a cluster tier of
          **M30** or larger.

       .. tabs-cloud-providers::

          .. tab::
             :tabid: aws

             .. include:: /includes/list-tables/instance-types/aws.rst

             .. include:: /includes/fact-instance-size-names.rst

          .. tab::
             :tabid: gcp

             .. include:: /includes/list-tables/instance-types/gcp.rst

          .. tab::
             :tabid: azure

             .. include:: /includes/list-tables/instance-types/azure.rst

       .. include:: /includes/fact-m2-m5-multi-tenant.rst

   * - providerSettings.providerName
     - string
     - Required
     - Cloud service provider on which |service| provisions the hosts.

       .. include:: /includes/api/list-tables/clusters/cloud-service-providers.rst

       .. list-table::
          :widths: 20 80
          :stub-columns: 1

          * - TENANT
            - **M2** or **M5** multi-tenant cluster.

              See **providerSettings.backingProviderName** for the
              cloud service provider where |service| provisioned the
              host serving the cluster.

       .. include:: /includes/fact-m2-m5-multi-tenant.rst

   * - providerSettings.regionName
     - string
     - Conditional
     -
       .. admonition:: Required if **replicationSpecs** array is empty
          :class: note

          If you haven't set values in the  **replicationSpecs** array,
          you must set this parameter.

       Physical location of your MongoDB cluster. The region you choose
       can affect network latency for clients accessing your databases.

       *Don't* specify this parameter when creating a multi-region
       cluster using the **replicationSpec** object or a
       :doc:`Global Cluster </global-clusters>` with the
       **replicationSpecs** array.

       .. include:: /includes/fact-group-region-association.rst

       Select your cloud service provider's tab for example cluster
       region names:

       .. include:: /includes/fact-cloud-region-name-examples.rst

   * - providerSettings.volumeType
     - string
     - Conditional
     - Disk |iops| setting for |aws| storage. Set only if you selected
       |aws| as your cloud service provider.

       .. include:: /includes/providerSettings-volumeType.rst

   * - replicationFactor
     - number
     - Optional
     -

       .. admonition:: Use **replicationSpecs**
          :class: note

          **replicationFactor** is deprecated. Use
          **replicationSpecs**.

       Number of :term:`replica set` members. Each member keeps a copy
       of your databases, providing high availability and data
       redundancy. |service| accepts **3**, **5**, or **7**. The
       default value is **3**.

       *Don't* specify this parameter when creating a multi-region
       cluster using the **replicationSpec** object.

       If your cluster is a sharded cluster, each shard is a replica
       set with the specified replication factor.

       |service| ignores this value if you pass the **replicationSpec**
       object.

       .. seealso::

          - :ref:`server-number-costs`
          - :manual:`Replication </replication>`

   * - replicationSpec
     - object
     - Optional
     -

       .. admonition:: Use **replicationSpecs**
          :class: note

          **replicationSpec** is deprecated. Use **replicationSpecs**.

       Configuration of each region in a multi-region cluster. Each
       element in this object represents a region where |service|
       deploys your cluster.

       For single-region clusters, you can either specify the
       **providerSettings.regionName** and **replicationFactor**, *or*
       you can use the **replicationSpec** object to define a single
       region.

       For multi-region clusters, omit the
       **providerSettings.regionName** parameter.

       For Global Clusters, specify the **replicationSpecs** parameter
       rather than a **replicationSpec** parameter.

       .. important::

          If you use **replicationSpec**, you must specify a minimum of
          one **replicationSpec.<region>** object.

       Use the **replicationSpecs** parameter to create a
       :doc:`Global Cluster </global-clusters>`.

       .. note::

          You cannot specify both the **replicationSpec** and
          **replicationSpecs** parameters in the same request body.

   * - replicationSpec.<region>
     - object
     - Required
     - Physical location of the region. Replace **<region>** with the
       name of the region. Each **<region>** object describes the
       region's priority in elections and the number and type of
       MongoDB nodes |service| deploys to the region.

       .. important::

          If you use **replicationSpec**, you must specify a minimum of
          one **replicationSpec.<region>** object.

       Select your cloud service provider's tab for example cluster
       region names:

       .. include:: /includes/fact-cloud-region-name-examples.rst

       For each **<region>** object, you must specify the
       **analyticsNodes**, **electableNodes**, **priority**, and
       **readOnlyNodes** parameters.

       .. seealso:: :ref:`mod-cluster-considerations`.

       .. include:: /includes/fact-group-region-association.rst


   * - replicationSpec.<region>.analyticsNodes
     - number
     - Optional
     -
       .. include:: /includes/fact-api-analytics-nodes-description.rst

   * - replicationSpec.<region>.electableNodes
     - number
     - Optional
     - Number of electable nodes for |service| to deploy to the
       region. Electable nodes can become the :term:`primary` and can
       facilitate local reads.

       The total number of **electableNodes** across all
       **replicationSpec.<region>** object must be **3**, **5**, or
       **7**.

       Specify **0** if you do not want any electable nodes in the
       region.

       You cannot create electable nodes if the
       **replicationSpec.<region>.priority** is 0.

   * - replicationSpec.<region>.priority
     - number
     - Optional
     - Election priority of the region. For regions with only
       **replicationSpec.<region>.readOnlyNodes**, set this value to
       **0**.

       For regions where **replicationSpec.<region>.electableNodes**
       is at least **1**, each **replicationSpec.<region>** must have
       a priority of exactly one **(1)** less than the previous region.
       The first region **must** have a priority of **7**. The lowest
       possible priority is **1**.

       The priority **7** region identifies the **Preferred Region** of
       the cluster. |service| places the :term:`primary` node in the
       **Preferred Region**. Priorities **1** through **7** are
       exclusive: you can't assign a given priority to no more than one
       region per cluster.

       .. example::

          If you have three regions, their priorities would be **7**,
          **6**, and **5** respectively. If you added two more regions
          for supporting electable nodes, the priorities of those
          regions would be **4** and **3** respectively.

   * - replicationSpec.<region>.readOnlyNodes
     - number
     - Optional
     - Number of read-only nodes for |service| to deploy to the region.
       Read-only nodes can never become the :term:`primary`, but can
       facilitate local-reads.

       Specify **0** if you do not want any read-only nodes in the
       region.

   * - replicationSpec.<region>.analyticsNodes
     - number
     - Optional
     - .. include:: /includes/fact-api-analytics-nodes-description.rst

   * - replicationSpecs
     - array of objects
     - Conditional
     - Configuration for cluster regions.

       .. admonition:: When should you use **replicationSpecs**?
          :class: note

          .. list-table::
             :header-rows: 1
             :widths: 40 20 40

             * - Condition
               - Necessity
               - Values

             * - You are deploying
                 :doc:`Global Clusters </global-clusters>`.
               - Required
               - Each object in the array represents a zone where
                 |service| deploys your cluster's nodes.

             * - You are deploying non-Global replica sets and sharded
                 clusters.
               - Optional
               - This array has one object representing where
                 |service| deploys your cluster's nodes.

       You must specify all parameters in **replicationSpecs** object
       array.

       .. admonition:: What parameters depend on **replicationSpecs**?

          If you set **replicationSpecs**, you must:

          - Set **clusterType**
          - Set **numShards**
          - Not set **replicationSpec**
          - Not use |nvme-clusters|
          - Not use Azure clusters

   * - replicationSpecs[n].id
     - string
     - Conditional
     - Unique identifier of the replication object for a zone in a
       |global-write-cluster|. Must be exactly 24 hexadecimal digits in
       length.

       .. list-table:: When is this value needed?
          :header-rows: 1
          :widths: 80 20

          * - Condition
            - Necessity

          * - Existing zones included in a cluster modification request
              body.
            - Required

          * - Adding a new zone to an existing |global-write-cluster|.
            - Optional

       .. warning::

          |service| deletes any existing zones in a
          |global-write-cluster| that are not included in a cluster
          modification request.

   * - replicationSpecs[n].numShards
     - number
     - Required
     - Number of shards to deploy in each specified zone. The default
       value is **1**.

   * - replicationSpecs[n].regionsConfig
     - object
     - Optional
     - Physical location of the region. Each **regionsConfig** object
       describes the region's priority in elections and the number and
       type of MongoDB nodes that |service| deploys to the region.

       .. important::

          If you use **replicationSpecs**, you must specify a minimum
          of one **replicationSpecs.regionsConfig.<regionName>**
          object.

       .. include:: /includes/fact-group-region-association.rst

       Select your cloud service provider's tab for example cluster
       region names:

       .. include:: /includes/fact-cloud-region-name-examples.rst

   * - replicationSpec.<region>.analyticsNodes
     - number
     - Optional
     - Number of :ref:`analytics nodes <analytics-nodes-overview>`
       in the region. Analytics nodes are useful for handling analytic
       data such as reporting queries from |bic|. Analytics nodes are
       read-only, and can never become the :term:`primary` member.

   * - replicationSpec.<region>.electableNodes
     - number
     - Optional
     - Number of electable nodes in the region. Electable nodes
       can become the :term:`primary` and can facilitate local reads.

   * - replicationSpec.<region>.priority
     - number
     - Required
     - Election priority of the region. The highest possible priority
       is **7**, which identifies the **Preferred Region** of the
       cluster. |service| places the :term:`primary` node in the
       **Preferred Region**. The lowest possible priority is **0**,
       which identifies a read-only region.

       You can have any number of priority **0** read-only regions.
       Priorities **1** through **7** are exclusive: only one
       region per cluster can be assigned a given priority.

   * - replicationSpec.<region>.readOnlyNodes
     - number
     - Optional
     - Number of read-only nodes in the region. Read-only nodes can
       never become the :term:`primary`, but can facilitate
       local reads.

   * - replicationSpecs[n].zoneName
     - string
     - Optional
     - Name for the zone in a |global-write-cluster|. Don't provide
       this value if **clusterType** is not **GEOSHARDED**.
