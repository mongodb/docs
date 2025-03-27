.. procedure:: 
   :style: normal 

   .. step:: Set up and initialize the .NET/C# project for the query.

      a. Create a new directory called ``lookup-with-search`` and
         initialize your project with the dotnet new command. 
  
         .. code-block:: bash

            mkdir lookup-with-search
            cd lookup-with-search
            dotnet new console

      #. Add the .NET/C# Driver to your project as a dependency.

         .. code-block:: bash

            dotnet add package MongoDB.Driver

   .. step:: Copy and paste the query into the ``Program.cs`` file.

      .. include:: /includes/fts/lookup-with-search/query-intro.rst

      .. literalinclude:: /includes/fts/lookup-with-search/query.cs
         :language: csharp
         :linenos:
         :dedent:
         :emphasize-lines: 15

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run the ``Program.cs`` file.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
        
            dotnet run lookup-with-search.csproj

         .. output:: 
            :language: javascript

            { 
              "name" : "Elizabeth Ray",
              "email" : "arroyocolton@gmail.com", 
              "active" : true, 
              "accounts" : [371138, 324287, 276528, 332179, 422649,
              387979], 
              "purchases" : [
                 { 
                   "_id" : ObjectId("5ca4bbc7a2dd94ee58162402"), 
                   "account_id" : 422649, 
                   "limit" : 10000, 
                   "products" : ["CurrencyService", "InvestmentStock"] 
                 }, 
                 { 
                   "_id" : ObjectId("5ca4bbc7a2dd94ee581623a9"), 
                   "account_id" : 324287, 
                   "limit" : 10000, 
                   "products" : ["Commodity", "CurrencyService", "Derivatives", "InvestmentStock"] 
                 }, 
                 { 
                   "_id" : ObjectId("5ca4bbc7a2dd94ee58162400"), 
                   "account_id" : 332179, 
                   "limit" : 10000, 
                   "products" : ["Commodity", "CurrencyService", "InvestmentFund", "Brokerage", "InvestmentStock"] 
                 }
              ] 
            }
            { 
              "name" : "Lindsay Cowan", 
              "email" : "cooperalexis@hotmail.com", 
              "accounts" : [116508], 
              "purchases" : [] 
            }
            { 
              "name" : "Katherine David", 
              "email" : "timothy78@hotmail.com", 
              "accounts" : [462501, 228290, 968786, 515844, 377292], 
              "purchases" : [
                { 
                  "_id" : ObjectId("5ca4bbc7a2dd94ee581623c9"), 
                  "account_id" : 228290, 
                  "limit" : 10000, 
                  "products" : ["CurrencyService", "InvestmentStock", "InvestmentFund", "Brokerage"] }, 
                { 
                  "_id" : ObjectId("5ca4bbc7a2dd94ee581623cb"), 
                  "account_id" : 515844, 
                  "limit" : 10000, 
                  "products" : ["Commodity", "CurrencyService", "InvestmentFund", "Brokerage", "InvestmentStock"] 
                }
              ] 
            }
            { 
              "name" : "Leslie Martinez", 
              "email" : "tcrawford@gmail.com", 
              "accounts" : [170945, 951849], 
              "purchases" : [] 
            }
            { 
              "name" : "Brad Cardenas", 
              "email" : "dustin37@yahoo.com", 
              "accounts" : [721914, 817222, 973067, 260799, 87389], 
              "purchases" : [
                { 
                  "_id" : ObjectId("5ca4bbc7a2dd94ee581623d6"), 
                  "account_id" : 87389, 
                  "limit" : 10000, 
                  "products" : ["CurrencyService", "InvestmentStock"] }, 
                { 
                  "_id" : ObjectId("5ca4bbc7a2dd94ee581623d5"), 
                  "account_id" : 260799, 
                  "limit" : 10000, 
                  "products" : ["Brokerage", "InvestmentStock", "Commodity", "CurrencyService"] 
                }
              ] 
            }
        