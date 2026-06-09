.. procedure::
   :style: normal

   .. step:: Connect to the deployment by using ``mongosh``. 

      In your terminal, connect to your {+service+} cloud-hosted 
      deployment or local deployment from {+mongosh+}. For detailed 
      instructions on how to connect, see 
      :mongosh:`Connect to a Deployment </connect/>`.

   .. step:: Switch to the database that contains the collection for which you want to create the materialized view. 

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: shell

             use sample_supplies

         .. output:: 
            :visible: false
            :language: shell 

            switched to db sample_supplies

   .. step:: Create the materialized view using an aggregation pipeline.

      Create a materialized view of monthly phone transactions by running the 
      following aggregation pipelines. This creates a new collection that 
      contains aggregated data about phone transactions by month:

      .. code-block:: shell
         :copyable: true

            db.sales.aggregate([
              { $match: { purchaseMethod: "Phone" } },
              { $unwind: { path: "$items" } },
              { 
                $group: {
                  _id: { 
                    $dateToString: {
                      format: "%Y-%m",
                      date: "$saleDate"
                    }
                  },
                  sales_quantity: { $sum: "$items.quantity" },
                  sales_price: { $sum: "$items.price" }
                }
              },
              { $set: { sales_price: { $toDouble: "$sales_price" } } },
              { $merge: { into: "monthlyPhoneTransactions", whenMatched: "replace" } }
            ])

            db.purchaseOrders.aggregate([
              { $match: { purchaseMethod: "Phone" } },
              { $unwind: { path: "$items" } },
              { 
                $group: {
                  _id: { 
                    $dateToString: {
                      format: "%Y-%m",
                      date: "$saleDate"
                    }
                  },
                  sales_quantity: { $sum: "$items.quantity" },
                  sales_price: { $sum: "$items.price" }
                }
              },
              { $set: { sales_price: { $toDouble: "$sales_price" } } },
              { $merge: { into: "monthlyPhoneTransactions", whenMatched: "replace" } }
            ])

   .. step:: Set up a script to periodically update the view.

      For production environments, you should set up a scheduled task to
      update the materialized view. You can do this with:

      1. **MongoDB Scheduled Triggers**: If using MongoDB Atlas, create a 
         scheduled trigger through the Atlas UI to run this aggregation 
         on a monthly basis.
      
      2. **Cron Job**: Set up a cron job on your server that runs a script
         to connect to MongoDB and execute the aggregation pipeline.
      
      3. **Application Logic**: Implement scheduled updates in your application
         using the example code shown in the programming language examples 
         of this guide.

   .. step:: Verify that the materialized view was created.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            db.monthlyPhoneTransactions.find().sort({_id: 1}).limit(3)

         .. output::

            [
              { _id: '2013-01', sales_quantity: 200, sales_price: 2941.47 },
              { _id: '2013-02', sales_quantity: 191, sales_price: 4822.15 },
              { _id: '2013-03', sales_quantity: 74, sales_price: 2429.12 }
            ]
