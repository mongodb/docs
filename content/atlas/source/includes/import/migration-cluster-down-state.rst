.. note::

   You can't migrate a {+cluster+} in a down state. The cluster running MongoDB 
   must be operational for the live migration to {+service+} to occur, 
   as {+service+} migrates one cluster member at a time, starting with 
   secondary members and finalizing with the primary member. 
   Ensure your cluster is running before attempting migration.