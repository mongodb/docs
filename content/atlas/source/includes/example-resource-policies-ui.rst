.. _restrict-number-of-clusters-ui:

Restrict Number of Clusters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents users from creating more than ``2``
clusters in a project: 

.. code-block::
   :copyable: true
   
   forbid (
       principal,
       action == ResourcePolicy::Action::"cluster.modify",
       resource
   )
   when { context.project.clustersInProject > 2 };

.. _restrict-cloud-provider-ui: 

Restrict Cloud Provider
~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents users from creating a cluster 
on |gcp|:

.. code-block::
   :copyable: true  

   forbid (
       principal, 
       action == ResourcePolicy::Action::"cluster.modify", 
       resource
   ) 
   when { context.cluster.cloudProviders.contains(ResourcePolicy::CloudProvider::"gcp") };


The following example uses the ``unless`` clause to allow users to 
create {+clusters+} *only* on |gcp|:

.. code-block::
   :copyable: true 

    forbid(
      principal, 
      action == ResourcePolicy::Action::"cluster.modify", 
      resource
    ) 
    unless { context.cluster.cloudProviders == [ResourcePolicy::CloudProvider::"gcp"] };

The following example uses the ``when`` clause to prevent users from  
creating or editing a cluster in the project with ID ``6217f7fff7957854e2d09179`` 
unless |gcp| is the only cloud provider:

.. code-block::
   :copyable: true 
               
    forbid (
      principal, 
      action == ResourcePolicy::Action::"cluster.modify", 
      resource
    ) 
    when {resource in ResourcePolicy::Project::"6217f7fff7957854e2d09179" && context.cluster.cloudProviders == [ResourcePolicy::CloudProvider::"gcp"] };

The following example prevents modifications to the cluster with ID 
``3217e2gdf79a4c54e2d0827`` when |gcp| is the cloud provider:

.. code-block::
   :copyable: true 
               
    forbid (
      principal, 
      action == ResourcePolicy::Action::"cluster.modify", 
      resource
    ) 
    when {resource in ResourcePolicy::Project::"65dcbf5ccd12a54df59a54e6" && resource == ResourcePolicy::Cluster::"670968dfc0a2297ef46bc02a" && context.cluster.cloudProviders == [ResourcePolicy::CloudProvider::"gcp"]};

.. _restrict-region-ui: 

Restrict Cloud Provider Region
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents users from creating or editing a cluster
in the region ``aws:us-east-1``:

.. code-block::
   :copyable: true 

    forbid (
      principal,
      action == ResourcePolicy::Action::"cluster.modify",
      resource
    ) 
    when {context.cluster.regions.contains(ResourcePolicy::Region::"aws:us-east-1")};

The following example prevents users from creating a cluster 
in the region ``aws:us-west-1``:

.. code-block::
   :copyable: true 

    forbid(
      principal, 
      action == ResourcePolicy::Action::"cluster.modify", 
      resource
    ) 
    when { context.cluster.regions.contains(ResourcePolicy::Region::"aws:us-west-1") };

The following example prevents users from creating a cluster 
in the regions ``aws:us-east-1``, ``aws:us-west-1``, or ``azure:westeurope``:

.. code-block::
   :copyable: true 
          
    forbid(
      principal, 
      action == ResourcePolicy::Action::"cluster.modify", 
      resource
    ) 
    when { context.cluster.regions.containsAny([ResourcePolicy::Region::"aws:us-east-1",ResourcePolicy::Region::"aws:us-west-1",ResourcePolicy::Region::"azure:westeurope"]) };

The following example uses the ``unless`` clause to allow users to 
create {+clusters+} *only* in the regions ``aws:us-east-1`` and ``azure:westeurope``:

.. code-block::
   :copyable: true 

    forbid(
      principal, 
      action == ResourcePolicy::Action::\"cluster.modify\", 
      resource
    ) 
    unless { [ResourcePolicy::Region::"aws:us-east-1", ResourcePolicy::Region::"azure:westeurope"].containsAll(context.cluster.regions) };

The following example uses the ``when`` clause to restrict users from 
editing the cluster with ID ``3217e2gdf79a4c54e2d0827`` 
in the regions ``aws:us-east-1`` and ``aws:us-west-1``:

.. code-block::
   :copyable: true 

    forbid(
      principal, 
      action == ResourcePolicy::Action::"cluster.modify", 
      resource == ResourcePolicy::Cluster::"3217e2gdf79a4c54e2d0827"
    ) 
    when { context.cluster.regions.containsAny([ResourcePolicy::Region::"aws:us-east-1",ResourcePolicy::Region::"aws:us-west-1"]) };

.. _restrict-ip-addresses-ui: 

Restrict IP Addresses
~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-wildcard-ip.rst

The following example prevents users from editing a project 
from a wildcard IP (``0.0.0.0/0``):

.. code-block::
   :copyable: true 

    forbid(
      principal, 
      action == ResourcePolicy::Action::"project.ipAccessList.modify", 
      resource
    ) 
    when { context.project.ipAccessList.contains(ip("0.0.0.0/0")) };

The following example uses the ``unless`` clause to allow users to 
edit projects *only* from the IP addresses ``1.2.3.4/32``, ``8.8.8.8/32``, 
and ``4.4.4.4/32``:

.. code-block::
   :copyable: true 

    forbid(
      principal, 
      action == ResourcePolicy::Action::"project.ipAccessList.modify", 
      resource
    ) 
    unless { [ip("1.2.3.4/32"), ip("8.8.8.8/32"), ip("4.4.4.4/32")].containsAll(context.project.ipAccessList) };

The following example ensures that all traffic to the cluster is prohibited 
over public networks by requiring the IP access list to be empty.

.. code-block::
   :copyable: true 

    forbid (
      principal,
      action == ResourcePolicy::Action::"project.ipAccessList.modify",
      resource 
    )
    unless { context.project.ipAccessList.isEmpty() };

.. _restrict-cluster-tier-ui: 

Restrict cluster Tier Sizes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the ``when`` clause to restrict |service| from
provisioning or scaling  {+clusters+} to less than ``M30`` or greater than ``M60``:
        
.. note::

    This policy doesn't restrict {+clusters+} with a :ref:`cluster class <storage-class-ui>` of  **Low CPU** or **NVMe SSD**.

.. code-block::
   :copyable: true

    forbid(
      principal, 
      action == ResourcePolicy::Action::"cluster.modify",
      resource
    ) 
    when { (context.cluster has minGeneralClassInstanceSizeValue && context.cluster.minGeneralClassInstanceSizeValue < 30) || (context.cluster has maxGeneralClassInstanceSizeValue && context.cluster.maxGeneralClassInstanceSizeValue > 60) };

.. _require-maintenance-window-ui: 

Require Project Maintenance Windows
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example requires that a project has a :ref:`maintenance window <configure-maintenance-window>` configured:

.. code-block::
   :copyable: true

    forbid (
      principal, 
      action == ResourcePolicy::Action::"project.maintenanceWindow.modify", 
      resource
    ) 
    when {context.project.hasDefinedMaintenanceWindow == false};

.. _prevent-peering-modifications-ui:

Prevent Modifications to Network Peering
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents modifications to |vpc| peering connections across 
different cloud providers (|aws|, |gcp|, |azure|).

Each cloud provider requires different details for |vpc| peering. Gather the following
details for your cloud provider and replace them in the example:

**AWS:** ``aws:<AWS_ACCOUNT_ID>:<VPC_ID>:<VPC_CIDR>``

- ``AWS_ACCOUNT_ID``: Your |aws| account number.
- ``VPC_ID``: The ID of the |vpc|.
- ``VPC_CIDR``: The |cidr| block of the |vpc|.

**Azure:** ``azure:<SUBSCRIPTION_ID>:<RESOURCE_GROUP_NAME>:<VNET_NAME>``

- ``SUBSCRIPTION_ID``: Your |azure| subscription ID.
- ``RESOURCE_GROUP_NAME``: The resource group in which your Virtual Network (VNet) exists.
- ``VNET_NAME``: The name of your VNet.

**Google Cloud:** ``gcp:<GCP_PROJECT_ID>:<VPC_NAME>``

- ``GCP_PROJECT_ID``: The ID of your |gcp| project.
- ``VPC_NAME``: The name of the |vpc| in |gcp|.

.. code-block::
   :copyable: true

    forbid (
      principal, 
      action == ResourcePolicy::Action::"project.vpcPeering.modify", 
      resource
    ) 
    when {context.project.peeringConnections == ["aws:000123456789:vpc-0316c47cc923ce313:10.0.0.0/16", "azure:fd01aafc-b3re-2193-8497-83lp3m83a1a5:rg-name:vnet", "gcp:inductive-cocoa-108200:default"]};

.. _prevent-private-endpoint-modifications-ui:

Prevent Modifications to Private Endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents modifications to private endpoint connections across 
cloud providers (|aws|, |gcp|, |azure|).

Each cloud provider requires different details for private endpoints. Gather the 
following details for your cloud provider and replace them in the example:

**AWS:** ``aws:<VPC_ENDPOINT_ID>``

- ``VPC_ENDPOINT_ID``: The ID of the |aws| |vpc| endpoint.

**Azure:** ``azure:<PRIVATE_ENDPOINT_RESOURCE_ID>:<PRIVATE_ENDPOINT_IP_ADDRESS>``

- ``PRIVATE_ENDPOINT_RESOURCE_ID``: The full resource ID path of the |azure| private endpoint.
- ``PRIVATE_ENDPOINT_IP_ADDRESS``: The IP address assigned to the private endpoint.

**Google Cloud:** ``gcp:<GCP_PROJECT_ID>:<VPC_NAME>``

- ``GCP_PROJECT_ID``: The ID of your |gcp| project.
- ``VPC_NAME``: The name of the |vpc| in |gcp| associated with the connection.

.. code-block::
   :copyable: true

    forbid (
      principal, 
      action == ResourcePolicy::Action::"project.privateEndpoint.modify", 
      resource
    ) 
    when {context.project.privateEndpoints == ["aws:vpce-042d72ded1748f314", "azure:/subscriptions/fd01aafc-b3re-2193-8497-83lp3m83a1a5/resourceGroups/rg-name/providers/Microsoft.Network/privateEndpoints/pe-name:10.0.0.4", "gcp:inductive-cocoa-108200:default"]};

.. _restrict-tls-ui:

Restrict |tls| Protocol and Cipher Suites
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example restricts the minimum |tls| version that your cluster
accepts for incoming connections to |tls| 1.2. 

Possible values for ``minTLSVersion`` include:

* **TLS 1.0**: ``ResourcePolicy::TLSVersion::"tls1_0"``
* **TLS 1.1**: ``ResourcePolicy::TLSVersion::"tls1_1"``
* **TLS 1.2**: ``ResourcePolicy::TLSVersion::"tls1_2"``

.. code-block::
   :copyable: true

    forbid (
      principal,
      action == ResourcePolicy::Action::"cluster.modify",
      resource
    )
    unless
    { context.cluster.minTLSVersion == ResourcePolicy::TLSVersion::"tls1_2" };

The following example requires that {+clusters+} use the custom |tls| cipher suite configuration 
``TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`` by setting ``ResourcePolicy::CipherConfigMode::"custom"``.

Possible values for custom |tls| cipher suite configurations are:

* ``ResourcePolicy::CipherSuite::"TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"``
* ``ResourcePolicy::CipherSuite::"TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"``

.. code-block::
   :copyable: true

    forbid (
      principal,
      action == ResourcePolicy::Action::"cluster.modify",
      resource
    )
    unless
    {
      context.cluster.cipherConfigMode == ResourcePolicy::CipherConfigMode::"custom" &&
      context.cluster.cipherSuites == [ResourcePolicy::CipherSuite::"TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"]
    };

The following example requires that {+clusters+} use the default |tls| cipher suite configuration.

.. code-block::
   :copyable: true

    forbid (
      principal,
      action == ResourcePolicy::Action::"cluster.modify",
      resource
    )
    unless
    {
      context.cluster.cipherConfigMode == ResourcePolicy::CipherConfigMode::"default"
    };

.. _enforce-disk-size-ui: 

Enforce Disk Size (GB)
~~~~~~~~~~~~~~~~~~~~~~

The following example enforces a maximum disk size of 4 TB by forbidding any 
value greater than (``>``) the limit.

To prevent creating clusters smaller than a certain size, 
use a less-than operator (``<``) in your forbid policy.

.. code-block::
   :copyable: true 

    forbid (
      principal,
      action == ResourcePolicy::Action::"cluster.modify",
      resource
    )
    when 
    {
      context.cluster has diskSizeGB && context.cluster.diskSizeGB > 4096
    };

.. _restrict-cluster-type-ui: 

Enforce Cluster Topology (Replica Set, Sharded, or Global Cluster)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example enables users to create *only* replica set clusters.

.. code-block::
   :copyable: true 

    forbid (
      principal,
      action == ResourcePolicy::Action::"cluster.modify",
      resource
    )
    unless 
    {
      context.cluster.clusterType == ResourcePolicy::ClusterType::"replicaset"
    };

To allow a different cluster topology, use one of the following values:

- **Sharded Cluster**: ``ResourcePolicy::ClusterType::"sharded"`` Used for standard 
  horizontal scaling, where data is distributed across multiple shards to support 
  large datasets or high throughput.
- **Global Cluster**: ``ResourcePolicy::ClusterType::"geosharded"`` Used for 
  location-aware deployments, where data is distributed across specific geographic 
  zones to ensure data resides close to users.

.. _restrict-shard-count-ui:

Enforce Minimum Shard Count
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example requires that sharded clusters have at least three shards.

.. important::
   
   * If you enforce a minimum shard count greater than one, 
     you must explicitly allow the transition state for cluster conversions in your policy 
     (for example, ``&& !context.cluster.isConvertingToSharded``). 
     Without this exception, |service| blocks users from converting a replica set to 
     a sharded cluster because the conversion process requires an intermediate state 
     where the cluster has only one shard.

   * |service| treats a replica set as having a shard count of one. If you enforce a 
     minimum shard count greater than one without checking whether clusters are sharded clusters, all replica sets in the project are marked as non-compliant.

   * Use ``minShardCount`` to enforce *minimums* only (for example, ``< 3``) and 
     ``maxShardCount`` to enforce *maximums* only (for example, ``> 10``). 
     Using opposite comparison operators with these properties causes policy evaluation errors.

.. code-block::
   :copyable: true 

    forbid (
      principal,
      action == ResourcePolicy::Action::"cluster.modify",
      resource
    )
    when 
    {
      context.cluster.minShardCount < 3 && !context.cluster.isConvertingToSharded
    };
