.. procedure::
   :style: normal

   .. step:: Connect to your cluster in {+mongosh+}.

      Open {+mongosh+} in a terminal window and
      connect to your cluster. For detailed instructions on connecting,
      see :ref:`connect-mongo-shell`.

   .. step:: Use the ``sample_supplies`` database.

      Run the following command at {+mongosh+} prompt:

      .. code-block:: javascript

         use sample_supplies

   .. step:: Run a simple |fts| query on the ``sample_supplies.monthlyPhoneTransactions`` collection.

      The following query counts the number of months in monthlyPhoneTransactions
      with total sales greater than or equal to ``10000`` dollars:

      .. code-block:: javascript

          db.monthlyPhoneTransactions.aggregate([
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
            },
          ])

      The above query returns ``4``, 
      indicating that only 4 months out of all the months in the
      ``monthlyPhoneTransactions`` materialized view had total sales 
      greater than or equal to 10000 dollars. This result reflects data 
      from both the ``sample_supplies.sales`` and 
      ``sample_supplies.purchaseOrders`` collections.

      For complete aggregation
      pipeline documentation, see the :manual:`MongoDB Server Manual
      </aggregation>`.
