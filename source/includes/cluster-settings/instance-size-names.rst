|service| supports deploying **M0**, **M2** and **M5** tiers
into a subset of available regions. 
Select your cloud provider's tab for example cluster region names
and available regions:

.. include:: /includes/cluster-settings/cloud-region-name-examples.rst

.. note:: Cluster Tier Naming Conventions

   Cluster tier names that are:

   - Appended with **_NVME** (**M40_NVME** for example) use direct
     attached :ref:`NVMe storage <nvme-storage>` for exceptional
     performance with the most I/O-intensive workloads.

   - Prepended with **R** instead of an **M** (**R40** for example) run
     a low CPU version of the cluster.
