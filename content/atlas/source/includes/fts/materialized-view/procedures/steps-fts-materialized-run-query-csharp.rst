.. procedure:: 
   :style: normal 

   .. step:: Specify a simple |fts| query on the ``sample_supplies.monthlyPhoneTransactions`` collection.
   
      Copy and paste the following code into the ``Program.cs`` file.

      .. literalinclude:: /includes/fts/materialized-view/query.cs
         :caption: Program.cs
         :language: csharp
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst
   
   .. step:: Run the query.
   
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run Program.cs

         .. output::
            :visible: false

            { "months_w_over_10000" : 4 }

      The above query returns ``4``, indicating that only 4 months out of all the months in the
      ``monthlyPhoneTransactions`` materialized view had total sales 
      greater than or equal to 10000 dollars. This result reflects data 
      from both the ``sample_supplies.sales`` and 
      ``sample_supplies.purchaseOrders`` collections.
