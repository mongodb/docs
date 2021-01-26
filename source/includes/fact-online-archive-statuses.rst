.. list-table::
   :widths: 20 80 

   * - Pending
     - Indicates documents are queued for archive, but archiving 
       has not yet started. 
   * - Archiving 
     - Indicates archiving has started. In this state, the documents 
       that meet the criteria for archiving are being archived. 
   * - Idle
     - Indicates online archive is waiting for the next archival 
       :ref:`job <online-archive-job>` to start.
   * - Pausing 
     - Indicates that you have requested to pause archiving. In this 
       state, |service| is finishing the running archiving operation 
       and therefore, |service| has not yet put archiving on hold. The 
       online archive transitions to the ``Paused`` state when the 
       running archiving operation finishes.
   * - Paused 
     - Indicates archiving has been temporarily stopped. In this 
       state, previously archived documents continue to be available 
       on the cloud object storage for querying, but the specified 
       archiving operation on the active cluster is put on hold and 
       additional documents are not archived. You can resume archiving 
       for paused archives at any time.
   * - Orphaned
     - Indicates collection associated with an active or paused 
       online archive was deleted. |service| will not automatically 
       delete the archived data. You must manually delete the online 
       archives associated with the deleted collection.
   * - Deleted 
     - Indicates online archive was deleted. When you delete an 
       online archive, associated archived documents are removed from 
       the cloud object storage.