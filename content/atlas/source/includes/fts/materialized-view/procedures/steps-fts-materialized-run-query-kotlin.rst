.. procedure::
   :style: normal

   .. step:: Specify a simple |fts| query on the ``sample_supplies.monthlyPhoneTransactions`` collection.

      Create a ``query.kt`` file in your ``search-materialized-view`` project directory, 
      and copy and paste the following code into this file.

      .. literalinclude:: /includes/fts/materialized-view/query.kt
         :language: kotlin
         :caption: query.kt
         :linenos:
         :copyable: true

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Compile and run the file to execute the query.

      Compile and run your application in your IDE or your shell. 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            kotlinc query.kt -include-runtime -d query.jar
            java -jar query.jar

         .. output::
            :visible: false

            Document{{months_w_over_10000=4}}

      The above query returns ``4``, indicating that only 4 months out of all the months in the
      ``monthlyPhoneTransactions`` materialized view had total sales 
      greater than or equal to 10000 dollars. This result reflects data 
      from both the ``sample_supplies.sales`` and 
      ``sample_supplies.purchaseOrders`` collections.
