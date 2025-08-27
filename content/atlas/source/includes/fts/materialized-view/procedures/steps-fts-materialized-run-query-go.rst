.. procedure::
   :style: normal

   .. step:: Specify a simple |fts| query on the ``sample_supplies.monthlyPhoneTransactions`` collection.
      
      Create a ``query.go`` file in your ``search-materialized-view`` project directory, 
      and copy and paste the following code into the file.  

      .. literalinclude:: /includes/fts/materialized-view/query.go
         :caption: query.go
         :language: go
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Run the query.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            go run query.go

         .. output::
            :visible: false

            map[months_w_over_10000:4]

      The above query returns ``4``, indicating that only 4 months out of all the months in the
      ``monthlyPhoneTransactions`` materialized view had total sales 
      greater than or equal to 10000 dollars. This result reflects data 
      from both the ``sample_supplies.sales`` and 
      ``sample_supplies.purchaseOrders`` collections.
