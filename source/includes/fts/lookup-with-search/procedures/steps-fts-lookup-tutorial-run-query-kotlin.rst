.. procedure:: 
   :style: normal 

   .. step:: Ensure that you add the following dependency to your project.

      .. list-table::
         :widths: 30 70 

         * - ``mongodb-driver-kotlin-coroutine``
           - 4.10.0 or higher version

   .. step:: Create a file named ``LookupWithSearchQuery.kt``.

   .. step:: Copy and paste the query into the ``LookupWithSearchQuery.kt`` file.

      .. include:: /includes/fts/lookup-with-search/query-intro.rst

      .. literalinclude:: /includes/fts/lookup-with-search/query.kt
         :language: kotlin
         :linenos:
         :dedent:
         :emphasize-lines: 11

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Run the ``LookupWithSearchQuery.kt`` file.

      When you run the ``LookupWithSearchQuery.kt`` program in your IDE, it prints
      the following documents:

      .. code-block:: none
         :copyable: false

         Document{{name=Elizabeth Ray, email=arroyocolton@gmail.com, active=true, accounts=[371138, 324287, 276528, 332179, 422649, 387979], purchases=[Document{{account_id=422649, limit=10000, products=[CurrencyService, InvestmentStock]}}, Document{{account_id=324287, limit=10000, products=[Commodity, CurrencyService, Derivatives, InvestmentStock]}}, Document{{account_id=332179, limit=10000, products=[Commodity, CurrencyService, InvestmentFund, Brokerage, InvestmentStock]}}]}}
         Document{{name=Lindsay Cowan, email=cooperalexis@hotmail.com, accounts=[116508], purchases=[]}}
         Document{{name=Katherine David, email=timothy78@hotmail.com, accounts=[462501, 228290, 968786, 515844, 377292], purchases=[Document{{account_id=228290, limit=10000, products=[CurrencyService, InvestmentStock, InvestmentFund, Brokerage]}}, Document{{account_id=515844, limit=10000, products=[Commodity, CurrencyService, InvestmentFund, Brokerage, InvestmentStock]}}]}}
         Document{{name=Leslie Martinez, email=tcrawford@gmail.com, accounts=[170945, 951849], purchases=[]}}
         Document{{name=Brad Cardenas, email=dustin37@yahoo.com, accounts=[721914, 817222, 973067, 260799, 87389], purchases=[Document{{account_id=87389, limit=10000, products=[CurrencyService, InvestmentStock]}}, Document{{account_id=260799, limit=10000, products=[Brokerage, InvestmentStock, Commodity, CurrencyService]}}]}}
