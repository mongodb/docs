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
                :guilabel:`Hour`.
      
         * - :guilabel:`Select An Event Type`
           - Select :guilabel:`Function`.
    
   .. step:: Create the Function.
 
      The function for this trigger defines a 
      ``monthlyPhoneTransactions`` materialized view that contains cumulative 
      monthly sales information. The function updates monthly sales 
      information for sales conducted over the phone.
      
      Paste the following code into the function:
      
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
            
            var monthlyPhoneTransactions = context.services.get("mongodb-atlas").db("sample_supplies").collection("sales");
            
            return monthlyPhoneTransactions.aggregate(pipeline);
         };
      
      The function uses the following aggregation pipeline stages to update
      ``monthlyPhoneTransactions``:
      
      - The :pipeline:`$match` stage filters the data to process only those
        sales that were completed over the ``Phone``.
      
      - The :pipeline:`$group` stage groups the sales information by the
        year-month. This stage outputs documents of the form:
      
        .. code-block:: javascript
           :copyable: false
      
           { "_id" : "<YYYY-mm>", "sales_quantity" : <num>, "sales_amount" : <NumberDecimal> }
      
      - The :pipeline:`$set` stage changes the data type of the ``sales_price``
        field to ``double``. |fts| ``$search`` operators don't support the
        ``Decimal128`` data type. Changing the ``sales_price`` field's data
        type allows you to query this field using |fts| indexes.
      
      - The :pipeline:`$merge` stage writes the output to the
        ``monthlyPhoneTransactions`` collection.
      
        :ref:`Based <merge-on>` on the ``_id`` field, the stage checks if the 
        document in the aggregation results :ref:`matches <merge-whenMatched>` 
        an existing document in the collection:
      
        - When |fts| finds a :ref:`match <merge-whenMatched>` (that is, a
          document with the same year-month already exists in the collection),
          |fts| :ref:`replaces <merge-whenMatched-replace>` the existing
          document with the document from the aggregation results as specified
          in the stage.
      
        - When |fts| doesn't find a :ref:`match <merge-whenNotMatched>`, |fts|
          inserts the document from the aggregation results into the collection
          as specified in the stage.
      
   .. step:: Test the Function.

      Click the :guilabel:`Run` button in the 
      lower right-hand corner of the :guilabel:`Function Editor`
      to create the ``monthlyPhoneTransactions`` materialized view.

      The :guilabel:`Result` tab at the bottom of the 
      :guilabel:`Function Editor` reflects the execution status of 
      the function. Click :guilabel:`Save Draft`.
      
