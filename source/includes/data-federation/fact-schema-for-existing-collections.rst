.. note:: 

   {+df+} automatically generates schemas for only new collections and 
   views in the :ref:`storage configuration 
   <config-adf>` or :ref:`namespace catalog 
   <manage-ns-catalog-cli>`. Existing :manual:`namespaces 
   </reference/limits/#faq-dev-namespace>` will not have auto-generated 
   schemas. If you want {+df+} to automatically generate schemas for 
   your existing collections and views in the storage configuration, 
   :ref:`remove <adf-setstorageconfig>` the ``databases`` in your 
   {+fdi+} storage configuration and then :ref:`update 
   <adf-setstorageconfig>` your {+fdi+} storage configuration with the 
   old configuration.

   {+df+} doesn't automatically generate or update schemas when you 
   update the storage configuration from the |service| UI. If you 
   update your {+fdi+} storage configuration through the UI, you must 
   manually update schemas using the :ref:`sqlgenerateschema-cmd` 
   command.
