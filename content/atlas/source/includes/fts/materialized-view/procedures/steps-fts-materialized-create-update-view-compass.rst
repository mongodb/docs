.. procedure:: 
   :style: normal 

   .. step:: Connect to your {+cluster+} in |compass|.

      Open |compass| and connect to your {+cluster+}. For detailed
      instructions on connecting, see :ref:`atlas-connect-via-compass`.

   .. step:: Navigate to the ``sample_supplies`` database.

      On the :guilabel:`Database` screen, click the ``sample_supplies``
      database to access its collections.

   .. step:: Create a materialized view using the sales collection.

      First, you'll run an aggregation pipeline on the ``sales`` collection to create the materialized view:

      a. Click on the ``sales`` collection.
      #. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`Select...`, then configure each of the
         following pipeline stages by selecting the stage from the 
         dropdown and adding the query for that stage. Click
         :guilabel:`Add Stage` to add additional stages.

         - Stage 1: ``$match``
         
           .. code-block:: javascript
              :copyable: true
           
              {
                purchaseMethod: "Phone"
              }

         - Stage 2: ``$unwind``
         
           .. code-block:: javascript
              :copyable: true
           
              {
                path: "$items"
              }

         - Stage 3: ``$group``
         
           .. code-block:: javascript
              :copyable: true
           
              {
                _id: { 
                  $dateToString: {
                    format: "%Y-%m",
                    date: "$saleDate"
                  }
                },
                sales_quantity: { $sum: "$items.quantity" },
                sales_price: { $sum: "$items.price" }
              }

         - Stage 4: ``$set``
         
           .. code-block:: javascript
              :copyable: true
           
              {
                sales_price: { $toDouble: "$sales_price" }
              }

         - Stage 5: ``$merge``
         
           .. code-block:: javascript
              :copyable: true
           
              {
                into: "monthlyPhoneTransactions",
                whenMatched: "replace"
              } 
                 
      #. Click :guilabel:`Run` to execute the aggregation pipeline. This creates the initial ``monthlyPhoneTransactions`` collection from the ``sales`` data.

   .. step:: Update the materialized view with data from the purchaseOrders collection.

      Next, you'll run a similar aggregation pipeline on the ``purchaseOrders`` collection to add that data to the materialized view:

      a. Navigate back to the database view and click on the ``purchaseOrders`` collection.
      #. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`Select...`, then configure each of the
         following pipeline stages by selecting the stage from the 
         dropdown and adding the query for that stage. Click
         :guilabel:`Add Stage` to add additional stages.

         - Stage 1: ``$match``
         
           .. code-block:: javascript
              :copyable: true
           
              {
                purchaseMethod: "Phone"
              }

         - Stage 2: ``$unwind``
         
           .. code-block:: javascript
              :copyable: true
           
              {
                path: "$items"
              }

         - Stage 3: ``$group``
         
           .. code-block:: javascript
              :copyable: true
           
              {
                _id: { 
                  $dateToString: {
                    format: "%Y-%m",
                    date: "$saleDate"
                  }
                },
                sales_quantity: { $sum: "$items.quantity" },
                sales_price: { $sum: "$items.price" }
              }

         - Stage 4: ``$set``
         
           .. code-block:: javascript
              :copyable: true
           
              {
                sales_price: { $toDouble: "$sales_price" }
              }

         - Stage 5: ``$merge``
         
           .. code-block:: javascript
              :copyable: true
           
              {
                into: "monthlyPhoneTransactions",
                whenMatched: "replace"
              }
                 
      #. Click :guilabel:`Run` to execute the aggregation pipeline. This updates the ``monthlyPhoneTransactions`` collection with data from the ``purchaseOrders`` collection.

   .. step:: Verify that the materialized view was created correctly.

      a. Navigate back to the database view and click on the newly created ``monthlyPhoneTransactions`` collection.
      #. Click the :guilabel:`Documents` tab to view the documents in the collection.
      #. You should see documents with monthly aggregated data. The first few documents might look like:

         .. code-block:: json
            :copyable: false 

            {
              "_id": "2013-01",
              "sales_quantity": 200,
              "sales_price": 2941.47
            }
            {
              "_id": "2013-02",
              "sales_quantity": 191,
              "sales_price": 4822.15
            }
            {
              "_id": "2013-03",
              "sales_quantity": 74,
              "sales_price": 2429.12
            }

   .. step:: Set up a schedule to update the materialized view.

      For production environments, we recommend that you set up a scheduled task to
      update the materialized view. You can do this by using the following methods:

      1. **MongoDB Scheduled Triggers**: If using MongoDB Atlas, create a 
         scheduled trigger through the Atlas UI to run this aggregation 
         on a monthly basis.
      
      2. **Cron Job**: Set up a cron job on your server that runs a script
         to connect to MongoDB and execute the aggregation pipeline.
      
      3. **Application Logic**: Implement scheduled updates in your application
         using the example code shown in the programming language examples 
         of this guide.  
