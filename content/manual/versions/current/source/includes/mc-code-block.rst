.. code-block:: javascript
  
   db.adminCommand( 
     { 
       moveCollection: "app.inventory",
       toShard: "shard02"
     } 
   )
