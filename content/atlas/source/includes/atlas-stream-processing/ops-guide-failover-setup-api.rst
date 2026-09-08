.. procedure::
   :style: normal

   .. step:: Create a {+spw+} with regional failover enabled.

      Call the :oas-bump-atlas-op:`Create One Stream Workspace
      <creategroupstreamworkspace>` endpoint with the following
      key-value pairs:

      .. list-table::
	 :header-rows: 1
         :widths: 50 50

	 * - Key
	   - Value

	 * - ``failoverRegions.cloudProvider``
	   - Cloud provider that hosts your failover region

	 * - ``failoverRegions.region``
	   - Failover region for this workspace

      For greater resilience, enable multiple failover regions by
      passing multiple objects in the ``failoverRegions`` array as in
      the following example:

      .. code-block:: json

	 {
	   "dataProcessRegion": {
	     "cloudProvider": "AWS",
	     "region": "SYDNEY_AUS"
	   },
	   "failoverRegions": [
	     {
	       "cloudProvider": "AWS",
	       "region": "MONTREAL_CAN"
	     },
	     {
	       "cloudProvider": "AWS",
	       "region": "DUBLIN_IRL"
	     }	      
	   ],
	   "name": "string",
	   "sampleConnections": {
	     "solar": false
	   },
	   "streamConfig": {
	     "maxTierSize": "SP50",
	     "tier": "SP50"
	   }
	 }		     

   .. step:: Create a connection and configure it for failover.

      1. Call the :oas-bump-atlas-op:`Create One Stream Connection
         <creategroupstreamconnection>` endpoint.

      #. To enable regional failover for this connection, call the
	 :oas-bump-atlas-op:`Create One Failover Stream Connection
	 <creategroupstreamconnectionfailoverconnection>` endpoint.

	 This endpoint enables failover for the connection you name in
	 the endpoint path. A failover connection must be the same
	 connection type as the underlying connection for which you
	 enable it. You can host failover connections only in your
	 {+spw+}'s configured failover regions.

	 You can configure multiple failover connections for each
	 primary connection.
	  
   .. step:: Create a stream processor with regional failover enabled.

      Call the :oas-bump-atlas-op:`Create One Stream Processor
      <creategroupstreamprocessor>` endpoint with ``failoverEnabled``
      set to ``true``. Then, configure your stream processor to
      use your failover-enabled connection.

   .. step:: Start your stream processor.

      Call the :oas-bump-atlas-op:`Start One Stream Processor
      <startgroupstreamprocessor>` endpoint.
      
      Start the processor only in your primary region. Don't start any
      failover processors directly.      

   .. step:: Connect to your {+spw+} and run a data generator in
      ``mongosh``.

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
	      
