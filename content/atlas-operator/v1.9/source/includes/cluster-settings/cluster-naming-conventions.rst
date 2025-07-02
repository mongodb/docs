.. note:: Cluster Tier & API Naming Conventions


   For purposes of management with the :ref:`{+atlas-admin-api+} 
   <atlas-api>`, cluster tier names that are prepended with ``R`` 
   instead of an ``M`` (``R40`` for example) run a :ref:`low-CPU 
   <storage-class-ui>` version of the cluster. When 
   :oas-atlas-op:`creating </createOneCluster>` or 
   :oas-atlas-op:`modifying </updateConfigurationOfOneCluster>` a 
   cluster with the API, be sure to specify your desired cluster class 
   by name with the ``providerSettings.instanceSizeName`` attribute.