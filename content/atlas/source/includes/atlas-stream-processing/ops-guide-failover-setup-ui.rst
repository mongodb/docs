.. procedure::
   :style: normal

   .. step:: Create a {+spw+} with regional failover enabled.

      Follow the procedure described in :ref:`Manage {+SPW+}s
      <atlas-sp-manage-spi-create>`, selecting two failover regions
      for greater resilience.

   .. step:: Create a connection with regional failover enabled.

      Follow the procedure described in :ref:`Add an {+atlas-sp+}
      Connection <atlas-sp-add-connection>`, selecting failover
      regions in the :guilabel:`Failover region settings` pane.

   .. step:: Create a stream processor with regional failover enabled.

      Follow the procedure described in :ref:`Develop Stream
      Processors <atlas-sp-manage-processor-create>`. In the
      :guilabel:`Advanced settings` pane, toggle on :guilabel:`Enable
      failover processor(s).`

   .. step:: Start your stream processor.

      Follow the procedure described in :ref:`Develop Stream
      Processors <atlas-sp-manage-processor-start>`.
      
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
