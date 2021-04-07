.. note:: 

   {+dl+} automatically generates schemas for only new collections and 
   views in the :ref:`storage configuration 
   <datalake-configuration-file>` or :ref:`namespace catalog 
   <manage-ns-catalog-cli>`. Existing :manual:`namespaces 
   </reference/limits/#faq-dev-namespace>` will not have auto-generated 
   schemas. If you want {+dl+} to automatically generate schemas for 
   your existing collections and views in the storage configuration, 
   :ref:`remove <datalake-setstorageconfig>` the 
   :datalakeconf:`databases` in your {+dl+} storage configuration and 
   then :ref:`update <datalake-setstorageconfig>` your {+dl+} storage 
   configuration with the old configuration.

   {+dl+} doesn't automatically generate or update schemas when you 
   update the storage configuration from the |service| UI. If you 
   update your {+dl+} storage configuration through the UI, you must 
   manually update schemas using the :ref:`sqlgenerateschema-cmd` 
   command.
