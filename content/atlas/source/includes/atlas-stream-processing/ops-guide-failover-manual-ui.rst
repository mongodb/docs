.. procedure::
   :style: normal
	   
   .. step:: Create two or more {+spw+}s.

      For each {+spw+}, follow the procedure described in :ref:`Manage {+SPW+}s
      <atlas-sp-manage-spi-create>`.

   .. step:: Create connections.

      In your {+spw+}, :ref:`create <atlas-sp-add-connection>` your
      source and sink connections. Use the same names for your intended
      connections across the workspaces. The following steps assume a
      {+service+} source and sink, but apply to **any** combination of
      source and sink supported by {+atlas-sp+}.

   .. step:: Create your stream processors.

      In each {+spw+}, :ref:`create
      <atlas-sp-manage-processor-create>` a stream processor with the
      following pipeline:

      .. code-block:: json

	 [
	   {
	     "$source": {
	       "connectionName": "mdb-atlas",
	       "db": "mySourceDB",
	       "coll": "myCollection"
	     }
	   },
	   {
	     "$tumblingWindow": {
	       "interval": { "size": 10, "unit": "second" },
	       "pipeline": [
		 {
		   "$group": {
		     "_id": { "$min": "$fullDocument.timestamp" },
		     "avgAmount": { "$avg": "$fullDocument.amount" },
		     "totalAmount": { "$sum": "$fullDocument.amount" },
		     "totalDocs": { "$sum": 1 }
		   }
		 }
	       ]
	     }
	   },
	   {
	     "$merge": {
	       "into": { "coll": "myCollection", "connectionName": "mdb-atlas", "db": "mySinkDB" },
	       "whenMatched": "replace",
	       "whenNotMatched": "insert"
	       }
 	     }
	   ]

   .. step:: Start your stream processor in one workspace.

      In one of your workspaces, :ref:`start
      <atlas-sp-manage-processor-start>` your stream processor.

   .. step:: Connect to your {+spw+} and run a data generator in ``mongosh``.

      Define a data generator and save it locally:
      
      .. code-block:: js

	 print("--- Data Generator Started ---");
	 while (true) {
	   try {
	     const categories = ["electronics", "books", "home", "garden"];
	     const randomAmount = Math.floor(Math.random() * 100) + 1;
	     const randomCategory = categories[Math.floor(Math.random() * categories.length)];
	     db.myCollection.insertOne({
	       amount: randomAmount,
	       category: randomCategory,
	       timestamp: new Date(),
	       metadata: {
		   source: "mongosh_generator",
		   version: "1.0"
	       }
	     });
	     print(`Inserted: ${randomCategory} - $${randomAmount} at ${new Date().toLocaleTimeString()}`);

	   } catch (err) {
	     print("Error during insertion: " + err);
	   }
	   // Sleep for 2 seconds
	   sleep(2000); 
	 }

      Connect to {+service+} and run your data generator using
      ``mongosh``.
	 
      .. code-block:: json

         mongosh "mongodb+srv://my-atlas-cluster/" --apiVersion	1 --username username --password password \
         load ("path/to/generator.js") 
	 
   .. step:: Test manual failover.

      a. :ref:`Stop <atlas-sp-manage-processor-stop>` your running
	 stream processor, or :ref:`pause <pause-cluster>` your
	 cluster.

      #. Observe the outage. Consult your preferred monitoring
	 method to determine the exact time of the stream
	 processor failure. This pipeline timestamps output data.

   .. step:: Start the failover processor.

   :ref:`Start <atlas-sp-manage-processor-start>` the stream
   processor in your failover region. Provide the timestamp you
   observed as the ``startAtOperationTime`` field.

   .. step:: Perform failback.

   Repeat the failover process on your failover region and resume
   operation of the processor in your primary region.
