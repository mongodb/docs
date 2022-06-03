.. note::

   You can't convert a replica set to a sharded cluster when either of 
   the following {+atlas-app-services+} features is enabled for the cluster:

   - A :appservices:`database trigger </triggers/database-triggers/#configuration>` 
     with the :guilabel:`Document Preimage` configuration option 
     enabled, or 
   - :appservices:`Atlas Device Sync </sync/learn/overview/>`.
