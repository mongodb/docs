.. procedure:: 
   :style: normal 

   .. step:: Set up and initialize the .NET/C# project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``search-materialized-view`` and initialize your project in that directory: 

      .. code-block:: sh

         mkdir search-materialized-view
         cd search-materialized-view
         dotnet new console
         dotnet add package MongoDB.Driver

      For more detailed installation instructions, see the 
      :driver:`MongoDB C# Driver documentation </csharp/current/get-started>`.
   
   .. step:: Define the ``purchaseOrders`` collection documents.
   
      Paste the following code into the ``Program.cs`` file. This code
      performs the following actions:

      - Inserts documents into a new ``purchaseOrders`` collection in the
        ``sample_supplies`` database.

      - Runs a simple query to display the documents in the
        ``purchaseOrders`` collection, sorted by the ``saleDate`` field
        in descending order.

      .. literalinclude:: /includes/fts/materialized-view/create-collection.cs
         :caption: Program.cs
         :language: csharp
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst
   
   .. step:: Populate the ``purchaseOrders`` collection and display its documents.
   
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run Program.cs

         .. output::
            :visible: false

            Successfully inserted purchase order documents.
            
            Query results:
            { "_id" : ObjectId("..."), "saleDate" : ISODate("2018-01-25T10:01:02.918Z"), "items" : [...], "storeLocation" : "Seattle", "customer" : {...}, "couponUsed" : false, "purchaseMethod" : "Phone" }
            { "_id" : ObjectId("..."), "saleDate" : ISODate("2018-01-23T21:06:49.506Z"), "items" : [...], "storeLocation" : "Denver", "customer" : {...}, "couponUsed" : true, "purchaseMethod" : "Phone" }
