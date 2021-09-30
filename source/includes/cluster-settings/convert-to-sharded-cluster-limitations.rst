.. note::

   You can't convert a replica set to a sharded cluster when either of 
   the following {+MongoDB-Realm+} features is enabled for the cluster:

   - A :realm:`database trigger </triggers/database-triggers/#configuration>` 
     with the :guilabel:`Document Preimage` configuration option 
     enabled, or 
   - :realm:`Realm Sync </sync>`.
