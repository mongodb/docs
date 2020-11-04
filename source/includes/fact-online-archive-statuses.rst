- Pending - Indicates documents are queued for archive, but archiving 
  has not yet started. In this state, documents queued for archiving are 
  still on your active |service| cluster, but cannot be modified.
- Active - Indicates archiving has started. In this state, the documents 
  that meet the criteria for archiving are archived or are being archived. 
- Paused - Indicates archiving has been temporarily stopped. In this state, 
  previously archived documents continue to be available on the cloud object 
  storage, but the specified archiving operation on active cluster is put on 
  hold. You can resume archiving for paused archives at any time.
- Orphaned - Indicates collection associated with an active or paused online 
  archive was deleted. |service| will not automatically delete the archived 
  data. You must manually delete the online archives associated with the 
  deleted collection.
- Deleted - Indicates online archive was deleted. When you delete an online 
  archive, associated archived documents are removed from the cloud object 
  storage.