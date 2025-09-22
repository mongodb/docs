.. warning:: Upgrade Managed Databases to MongoDB 4.4 or Later

   |onprem| 8.0 doesn't support MongoDB versions earlier than 6.0. If you're using
   A MongoDB version earlier than 6.0 and want to upgrade to |onprem| 8.0, you must
   upgrade to at least MongoDB 6.0. If you don't upgrade to at least MongoDB 6.0, 
   |onprem| fails |pre-flight checks| and won't start. 
   After upgrading to at least MongoDB 6.0, we still recommend that you upgrade
   to the :ref:`latest MongoDB version compatible <mongo-db-compatibility>` 
   with |onprem| before upgrading to |onprem| 8.0.
   