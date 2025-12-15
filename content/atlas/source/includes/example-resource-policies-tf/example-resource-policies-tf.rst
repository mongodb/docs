.. _tf-restrict-number-of-clusters:

Restrict Number of Clusters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents users from creating more than ``2``
clusters in a project: 

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-restrict-number-of-clusters
   :end-before: # end-restrict-number-of-clusters

.. _tf-restrict-cloud-provider:

Restrict Cloud Provider
~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents users from creating a {+cluster+} 
on all cloud providers except |aws|:

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-restrict-provider
   :end-before: # end-restrict-provider

.. _tf-restrict-region:

Restrict Region
~~~~~~~~~~~~~~~

The following example uses the ``unless`` clause to allow users to 
create {+clusters+} *only* in the regions ``aws:us-east-1`` and
``aws:eu-central-1``:

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-restrict-region
   :end-before: # end-restrict-region

.. _tf-restrict-provider-region:

Restrict Cloud Provider and Region
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example uses the ``unless`` clause to allow users to create
{+clusters+} *only* on |gcp| or in the regions ``aws:us-east-1`` and
``aws:eu-central-1``:

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-provider-region
   :end-before: # end-provider-region

.. _tf-restrict-ip-addresses:

Restrict IP Addresses
~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-wildcard-ip.rst

The following example prevents users from editing a project 
from a wildcard IP (``0.0.0.0/0``):

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-restrict-ip
   :end-before: # end-restrict-ip

.. _tf-limit-max-disk-size:

Enforce Disk Size (GB)
~~~~~~~~~~~~~~~~~~~~~~

The following example enforces a maximum disk size of 4 TB by forbidding any 
value greater than (``>``) the limit.

To prevent creating clusters smaller than a certain size, 
use a less-than operator (``<``) in your forbid policy.

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-limit-max-disk-size
   :end-before: # end-limit-max-disk-size

.. _tf-restrict-cluster-type: 

Enforce Cluster Topology (Replica Set, Sharded, or Global Cluster)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example enables users to create *only* replica set clusters.

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-enforce-cluster-type
   :end-before: # end-enforce-cluster-type

To allow a different cluster topology, use one of the following values:

- **Sharded Cluster**: ``ResourcePolicy::ClusterType::"sharded"`` Used for standard 
  horizontal scaling, where data is distributed across multiple shards to support 
  large datasets or high throughput.
- **Global Cluster**: ``ResourcePolicy::ClusterType::"geosharded"`` Used for 
  location-aware deployments, where data is distributed across specific geographic 
  zones to ensure data resides close to users.

.. _tf-restrict-shard-count:

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

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-restrict-shard-count
   :end-before: # end-restrict-shard-count