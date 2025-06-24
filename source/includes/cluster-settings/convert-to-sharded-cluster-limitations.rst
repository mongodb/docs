.. note::

   You can't convert a replica set to a sharded cluster when either of 
   the following features is enabled for the cluster:

   - A :atlas:`database trigger </atlas-ui/triggers/database-triggers/#configuration>` 
     with the :guilabel:`Document Preimage` configuration option 
     enabled, or 
   - Atlas Device Sync.
