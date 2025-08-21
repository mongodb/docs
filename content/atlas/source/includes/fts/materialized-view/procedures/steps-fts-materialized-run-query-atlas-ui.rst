.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Go to the :guilabel:`Aggregation` page for your cluster.

      a. Click the :guilabel:`Browse Collections` button for your
         {+cluster+}. 
      #. Expand the :guilabel:`sample_supplies` database and click the
         :guilabel:`monthlyPhoneTransactions` collection.
      #. Click the :guilabel:`Aggregation` tab for the
         collection.

   .. step:: Run a simple |fts| query on the ``sample_supplies.monthlyPhoneTransactions`` collection.
      
      Click the :guilabel:`TEXT` view on the :guilabel:`Aggregation` page.
      Then, copy and paste the following code into the pipeline
      to run the query:
      
      .. io-code-block::
         :copyable: true
      
         .. input::
            :language: js
            :linenos:
         
            [
              {
                $search: {
                  "index": "monthlySalesIndex",
                  "range": { 
                    "gt": 10000,
                    "path": ["sales_price"]
                  }
                }
              },
              {
                $count: 'months_w_over_10000'
              }
            ]
      
         .. output::
            :visible: true

            {
              "months_w_over_10000": 4
            }

   .. step:: Interpret your query results.

      The above query returns ``4``, indicating that only 4 months out of all the months in the
      ``monthlyPhoneTransactions`` materialized view had total sales 
      greater than or equal to 10000 dollars. This result reflects data 
      from both the ``sample_supplies.sales`` and 
      ``sample_supplies.purchaseOrders`` collections.  