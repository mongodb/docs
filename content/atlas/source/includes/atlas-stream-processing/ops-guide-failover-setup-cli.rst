.. procedure::
   :style: normal

   .. step:: Create a {+spw+} with regional failover enabled.

      .. include:: /includes/extracts/atlas-api-streams-createStreamProcessor.rst

      Set the following key-value pairs in your API request file:
		   
      .. list-table::
	 :header-rows: 1
         :widths: 50 50

	 * - Key
	   - Value

	 * - ``failoverRegions.cloudProvider``
	   - Cloud provider that hosts your failover region

	 * - ``failoverRegions.region``
	   - Failover region for this workspace
      
		   
   .. step:: Create a connection with regional failover enabled.

      .. include:: /includes/extracts/atlas-api-streams-createStreamConnection.rst
	     
      After creating your connection, enable regional failover by configuring a
      failover connection.

      .. include:: /includes/extracts/atlas-api-streams-createFailoverConnection.rst
		   
   .. step:: Create a stream processor with regional failover enabled.

      .. include:: /includes/extracts/atlas-api-streams-createStreamProcessor.rst

      Set ``failoverEnabled`` to ``true`` in your API request file.

   .. step:: Start your stream processor.

      .. include:: /includes/extracts/atlas-api-streams-startStreamProcessor.rst

      Start the processor only in your primary region. Don't start any
      failover processors directly.

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

   .. step:: Test automated failover.	 

      a. :ref:`Trigger workspace failover
	 <atlas-sp-manage-spi-failover>` or :ref:`Trigger processor
	 failover <atlas-sp-manage-processor-failover>`.

      #. Observe the outage and resumption of service. Your failover
	 processor in your {+spw+} failover region comes online and
	 resumes processing from the last checkpoint.

   .. step:: Perform failback.

   Repeat the failover process on your failover region and resume
   operation of the processor in your primary region.	 
