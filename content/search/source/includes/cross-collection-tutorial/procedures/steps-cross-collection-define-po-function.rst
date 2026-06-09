.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-triggers.rst

   .. step:: Click :guilabel:`Add a Trigger` to open the Trigger configuration page.

   .. step:: Enter configuration values for the Trigger.
   
      .. list-table:: 
         :header-rows: 1
         :widths: 20 80
       
         * - UI Field Name 
           - Configuration
      
         * - :guilabel:`Trigger Type`
           - Select :guilabel:`Scheduled`.
      
         * - :guilabel:`Name`
           - Specify ``updateMonthlySales``.
      
         * - :guilabel:`Schedule Type`
           - a. Select :guilabel:`Basic`. 
             
             #. For :guilabel:`Repeat once by`, select ``Day of the Month`` 
                and set the value to your preferred date.
           
                Alternatively, for testing purposes, 
                set :guilabel:`Repeat once by` dropdown to a more 
                frequent occurrence, such as :guilabel:`Minute` or 
                :guilabel:`Hour`
      
   .. step:: Create the Function.

      How the ``updateMonthlyPurchaseOrders`` Function Works
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      The ``updateMonthlyPurchaseOrders`` function adds cumulative monthly 
      purchase order information to the ``monthlyPhoneTransactions`` 
      materialized view. The function updates the monthly purchase order 
      information for purchase orders conducted over the phone.  
      The following example defines the function:  
      
      .. code-block:: javascript

         exports = function(){
            
            var pipeline = [
              { $match: {purchaseMethod: "Phone"} },
              { $unwind: {path: "$items"}},
              { $group: {
               _id: { $dateToString:
               { format: "%Y-%m", date: "$saleDate" } },
               sales_quantity: { $sum: "$items.quantity"},
               sales_price: { $sum: "$items.price"}
              }},
              { $set: { sales_price: { $toDouble: "$sales_price"}}},
              { $merge: { into: "monthlyPhoneTransactions", whenMatched: "replace" } } 
            ]
            
            var monthlyPhoneTransactions = context.services.get("mongodb-atlas").db("sample_supplies").collection("purchaseOrders");
            
            return monthlyPhoneTransactions.aggregate(pipeline);
         };  
        
      The ``updateMonthlyPurchaseOrders`` function uses the same aggregation 
      pipeline stages to update ``monthlyPhoneTransactions`` as the 
      ``updateMonthlySales`` function.      

   .. step:: Test the Function.

      Click the :guilabel:`Run` button in the 
      lower right-hand corner of the :guilabel:`Function Editor`
      to update the ``monthlyPhoneTransactions`` materialized view.
 
      The :guilabel:`Result` tab at the bottom of the 
      :guilabel:`Function Editor` reflects the execution status of 
      the function.
 
      The ``updateMonthlyPurchaseOrders`` function refreshes the 
      ``monthlyPhoneTransactions`` materialized view with the January 
      2018 purchase order data.

   .. step:: Click :guilabel:`Save`.
    
   .. step:: Review and deploy the ``Sales-App`` application draft.

   .. step:: 

      Use {+mongosh+} to query the 
      ``monthlyPhoneTransactions`` collection to confirm the update:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: sh

            db.monthlyPhoneTransactions.find().sort( { _id: -1} )

         .. output::
            :language: json
            :visible: false
 
            {
              _id: '2018-01',
              sales_quantity: 66,
              sales_price: Decimal128("1407.10")
            }

      The ``monthlyPhoneTransactions`` materialized view shows the 
      newly added data. The top result reflects that the most recent 
      transaction took place in January 2018.

   .. step:: Review and deploy the ``Sales-App`` application draft.

