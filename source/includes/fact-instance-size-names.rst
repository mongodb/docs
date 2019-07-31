|service| supports the following instance sizes.
|service| supports deploying ``M2`` and ``M5`` instances
into a subset of available regions. The documentation for
``providersettings.regionName`` includes a list of these regions.

.. admonition:: Cluster Tier Naming Conventions
   :class: note

   Cluster tier names that are:

   - Appended with ``_NVME`` (``M40_NVME`` for example) use direct
     attached :ref:`NVMe storage <nvme-storage>` for exceptional
     performance with the most I/O-intensive workloads.

   - Prepended with ``R`` instead of an ``M`` (``R40`` for example) run
     a low CPU version of the cluster.

