.. warning:: Upgrade Managed Databases to MongoDB 4.4 or Later

   |onprem| 8.0 doesn't support MongoDB 4.2 and earlier. If you're using
   MongoDB 4.2 or earlier and want to upgrade to |onprem| 8.0, you must
   upgrade to at least MongoDB 4.4. If you don't upgrade to at least MongoDB 4.4, 
   |onprem| fails :ref:`pre-flight checks <fix-local-mode-start-failure>` and won't start. 
   After upgrading to at least MongoDB 4.4, we still recommend that you upgrade
   to at least MongoDB 6.0 before upgrading to |onprem| 8.0.
   