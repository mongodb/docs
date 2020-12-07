.. note:: Cluster Tier & API Naming Conventions


   For purposes of management with the :ref:`Atlas API <atlas-api>`, cluster
   tier names that are prepended with ``R`` instead of an ``M`` (``R40``
   for example) run a :ref:`low-CPU <storage-class-ui>` version of the cluster.
   When :ref:`creating <create-one-cluster-ref>` or :ref:`modifying
   <modify-one-cluster-ref>` a cluster with the API, be sure to specify
   your desired cluster class by name with the
   ``providerSettings.instanceSizeName`` attribute.