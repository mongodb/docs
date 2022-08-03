The :guilabel:`Cluster Tier` section of the 
:guilabel:`Create New Cluster` dialog displays the available
|service| cluster tiers. |service| categorizes the cluster tiers
into tiers as follows:

:guilabel:`{+Shared-Clusters+}`
  Sandbox cluster tiers for getting started with MongoDB, such as the 
  ``M0`` {+free-cluster+}.

  These clusters support replica set deployments in a shared 
  environment with access to a subset of |service| features and
  functionality.

:guilabel:`Dedicated Development Clusters`
  clusters that support development environments and low-traffic
  applications.

  These clusters support replica set deployments only, but otherwise
  provide full access to |service| features and functionality.

:guilabel:`Dedicated Production Clusters`
  Clusters that support production environments with high traffic
  applications and large datasets. 

  These clusters support replica set and sharded cluster
  deployments with full access to |service| features and functionality.

  Some clusters have variants, denoted by the |angle| character. 
  When you select these clusters, |service| lists the variants 
  and tags each cluster to distinguish their key characteristics.

  .. |angle| unicode:: U+276F

The selected cluster tier dictates the 
memory, storage, and IOPS specification for each data-bearing 
server [#data-bearing]_ in the cluster. 

.. include:: /includes/fact-free-tier-paid-tier.rst

.. include:: /includes/fact-analytics-nodes-tier.rst
  