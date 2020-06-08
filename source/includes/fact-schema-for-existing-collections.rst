.. note:: 

   {+dl+} automatically generates schemas for only new collections and 
   views in the :ref:`storage configuration <datalake-configuration-file>`.
   Existing :manual:`namespaces </reference/limits/#faq-dev-namespace>` 
   will not have auto-generated schemas. If you want {+dl+} to automatically 
   generate schemas for your existing non-wildcard collections and views in 
   the storage configuration, :ref:`remove <datalake-setstorageconfig>` the :datalakeconf:`databases` in your {+dl+} storage configuration and then 
   :ref:`update <datalake-setstorageconfig>` your {+dl+} storage 
   configuration with the old configuration.
