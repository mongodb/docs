.. note:: Cluster Tier & API Naming Conventions


   For purposes of management with the :ref:`{+atlas-admin-api+} 
   <atlas-api>`, cluster tier names that are prepended with ``R`` 
   instead of an ``M`` (``R40`` for example) run a :ref:`low-CPU 
   <storage-class-ui>` version of the cluster. When 
   :oas-bump-atlas-op:`creating <creategroupcluster>` or 
   :oas-bump-atlas-op:`modifying <updategroupcluster>` a 
   cluster with the API, be sure to specify your desired cluster class 
   by name with the
   ``replicationSpecs[n].regionConfigs[m].electableSpecs.instanceSize``
   attribute.