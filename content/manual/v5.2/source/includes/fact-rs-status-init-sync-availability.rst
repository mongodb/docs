.. important:: Availability


   Starting in MongoDB 4.2.1,
   :data:`replSetGetStatus.initialSyncStatus` metrics are only
   available when run on a member during its initial sync (i.e.
   :replstate:`STARTUP2` state).
      
   In earlier versions (3.6.x-4.2.0),
   :data:`replSetGetStatus.initialSyncStatus` metrics are available
   when the command is run with ``initialSync: 1`` option on a
   secondary or a member in its :replstate:`STARTUP2` state, even after
   the member completes its initial sync. However, some fields that
   relate to the progress of an on-going initial sync only appear while
   the initial sync is in progress and do not appear once the initial
   sync completes.
   
   
