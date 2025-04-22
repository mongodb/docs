{+c2c-product-name+} does not replicate :ref:`system collections 
<metadata-system-collections>` to the destination cluster.

If you issue a :dbcommand:`dropDatabase` command on the source cluster,
this change is not directly applied on the destination cluster. Instead,
{+c2c-product-name+} drops user collections and views in the database 
on the destination cluster, but it does not drop system collections 
on that database.

For example, on the destination cluster:

- The drop operation does not affect a user-created  
  :data:`system.js <<database>.system.js>` collection. 

- If you enable profiling, the :data:`system.profile 
  <<database>.system.profile>` collection remains.

- If you create views on the source cluster and then drop the database,
  replicating the drop removes the views, but leaves an empty
  :data:`system.views <<database>.system.views>` collection.

In these cases, the replication of ``dropDatabase`` removes all user-created
collections from the database, but leaves its system collections on the
destination cluster.
