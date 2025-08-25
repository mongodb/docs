.. important:: 

   Wiping and restarting the instance erases all local unsynced data on the 
   instance.

   If that data was written by an Atlas Device SDK client, the client itself
   can handle data recovery. This enables local unsynced data written by the 
   client to eventually make its way to Atlas.

   If the data was written by a MongoDB Driver or tool using the Wire Protocol,
   the unsynced data is unrecoverable.
