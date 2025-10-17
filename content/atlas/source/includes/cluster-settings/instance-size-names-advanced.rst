|service| supports
deploying **M0** and **Flex** tiers into a subset of available regions.
The documentation for
**replicationSpecs[n].regionConfigs[m].<type>Specs.instanceSize**
includes a list of these regions.

.. note:: Cluster Tier Naming Conventions

   Cluster tier names that are:

   - Appended with **_NVME** (**M40_NVME** for example) use direct
     attached :ref:`NVMe storage <nvme-storage>` for exceptional
     performance with the most I/O-intensive workloads.

   - Designated as **Low-CPU** (**M40 Low-CPU** for example) run
     a low CPU version of the cluster.