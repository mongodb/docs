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

.. _tf-restrict-eras:

Restrict Atlas Embedding and Reranking API Service for Projects
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example restricts access to the
:ref:`{+voyage-api-full+} <voyage-api-overview>`
for all projects in an organization. This effectively prevents users from
creating :ref:`model API keys <voyage-api-keys>` for any projects in the
organization.

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-restrict-eras
   :end-before: # end-restrict-eras

You can specify projects as exceptions using the policy's ``unless`` clause.
The following example restricts access to the {+voyage-api+} for all
projects in an organization *except* the project with ID
``6217f7fff7957854e2d09179``:

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-restrict-eras-except-project
   :end-before: # end-restrict-eras-except-project

.. _tf-require-database-auditing:

Require Database Auditing
~~~~~~~~~~~~~~~~~~~~~~~~~

The following example requires that database auditing is enabled on a
project before clusters can be created or modified:

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-require-database-auditing
   :end-before: # end-require-database-auditing

.. _tf-require-cmk-clusters:

Require Customer-Managed Keys on All Clusters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example requires that Customer-Managed Keys for encryption
at rest are enabled on all clusters in a project:

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-require-cmk-clusters
   :end-before: # end-require-cmk-clusters

.. _tf-require-cmk-search:

Require Customer-Managed Keys on All Dedicated Search Deployments
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example requires that Customer-Managed Keys for encryption
at rest are enabled on all dedicated search deployments in a project:

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-require-cmk-search
   :end-before: # end-require-cmk-search

.. _tf-require-cmk-all-org-data:

Enforce Customer-Managed Keys on All Organization Data (AWS Only)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example enforces Customer-Managed Keys on all organization
data (clusters and search nodes) and restricts deployments to |aws| only.

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-require-cmk-all-org-data
   :end-before: # end-require-cmk-all-org-data

.. note::

   Search nodes inherit encryption from their cluster, so enforcing CMK on
   data at rest also requires the cluster itself to use CMK. Both clusters
   and search deployments can be deployed on different cloud providers. Today,
   only |aws| supports search-node CMK, which is why all three policies are
   needed to ensure complete coverage.

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

.. _tf-enforce-config-server-management-mode:

Enforce Dedicated Config Servers for Sharded Clusters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents users from creating sharded clusters
with :ref:`embedded config servers <nodes-for-config-server>`, ensuring they use dedicated config servers from
the start.

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-enforce-config-server-management-mode
   :end-before: # end-enforce-config-server-management-mode

.. _tf-restrict-auto-embedding:

Restrict Automated Embedding for {+avs+}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents users from creating or modifying
search indexes that use ``autoEmbed`` type. This allows you to
restrict the use of Automated Embedding for compliance or cost
governance while still permitting creation of ``vector`` type
indexes.

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-restrict-auto-embedding
   :end-before: # end-restrict-auto-embedding

.. _tf-restrict-native-reranking:

Restrict Native Reranking
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example prevents users from enabling Native
Reranking (the ``$rerank`` aggregation stage) for any project in
the organization. This policy prevents projects from enabling
Native Reranking, but does not disable projects that already have
it enabled.

.. literalinclude:: /includes/example-resource-policies-tf/example-resource-policies-terraform.tf
   :language: terraform
   :start-after: # start-restrict-native-reranking
   :end-before: # end-restrict-native-reranking
