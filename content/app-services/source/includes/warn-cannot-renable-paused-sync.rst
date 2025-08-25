.. warning::

   If your :manual:`oplog </core/replica-set-oplog/>` rolls past the 
   time that you paused Device Sync, you must terminate and re-enable 
   Device Sync. For example, if you only keep 12 hours of oplog for your 
   cluster, and you pause Device Sync for longer than 12 hours, you must
   terminate and re-enable Device Sync.

   Terminating and re-enabling paused Atlas Device Sync for your App erases 
   Atlas Device Sync metadata and requires you to specify configuration settings again. 
   Clients must perform a client reset when they reconnect after Atlas Device Sync has
   been terminated. For more information, see: :ref:`Terminate Sync <terminating-realm-sync>`.