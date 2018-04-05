The :guilabel:`Cluster Tier` section of the 
:guilabel:`Create New Cluster` dialog displays the available
|service| instance sizes. |service| categorizes the instance
sizes into tiers as follows:

:guilabel:`Shared Clusters`
  Sandbox instances for getting started with MongoDB, such as the 
  ``M0`` Free Tier instance.

  These instances support replica set deployments in a shared 
  environment with access to a subset of |service| features and
  functionality.

:guilabel:`Dedicated Development Clusters`
  Instances that support development environments and low-traffic
  applications.

  These instances support replica set deployments only, but otherwise
  provide full access to |service| features and functionality.

:guilabel:`Dedicated Production Clusters`
  Instances that support production environments with high traffic
  applications and large datasets. 

  These instances support replica set and sharded cluster
  deployments with full access to |service| features and functionality.

  Some instances have variants, denoted by the |angle| character. 
  When you select these instances, |service| lists the variants 
  and tags each instance to distinguish their key characteristics.

  .. |angle| unicode:: U+276F

The selected instance size dictates the 
memory, storage, and IOPS specification for each data-bearing 
server [#data-bearing]_ in the cluster. 

.. include:: /includes/fact-free-tier-paid-tier.rst