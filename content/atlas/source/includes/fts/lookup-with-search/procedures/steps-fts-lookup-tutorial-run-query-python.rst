.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``lookup-with-search-query.py``.

   .. step:: Copy and paste the query into the ``lookup-with-search-query.py`` file.

      .. include:: /includes/fts/lookup-with-search/query-intro.rst

      .. literalinclude:: /includes/fts/lookup-with-search/query.py
         :language: go
         :linenos:
         :dedent:
         :emphasize-lines: 5

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Run the command to query your collection.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell
           
            python lookup-with-search-query.py

         .. output::
            :language: json
            :visible: true
            
            {'name': 'Elizabeth Ray', 'email': 'arroyocolton@gmail.com', 'active': True, 'accounts': [371138, 324287, 276528, 332179, 422649, 387979], 'purchases': [{'account_id': 422649, 'limit': 10000, 'products': ['CurrencyService', 'InvestmentStock']}, {'account_id': 324287, 'limit': 10000, 'products': ['Commodity', 'CurrencyService', 'Derivatives', 'InvestmentStock']}, {'account_id': 332179, 'limit': 10000, 'products': ['Commodity', 'CurrencyService', 'InvestmentFund', 'Brokerage', 'InvestmentStock']}]}
            {'name': 'Lindsay Cowan', 'email': 'cooperalexis@hotmail.com', 'accounts': [116508], 'purchases': []}
            {'name': 'Katherine David', 'email': 'timothy78@hotmail.com', 'accounts': [462501, 228290, 968786, 515844, 377292], 'purchases': [{'account_id': 228290, 'limit': 10000, 'products': ['CurrencyService', 'InvestmentStock', 'InvestmentFund', 'Brokerage']}, {'account_id': 515844, 'limit': 10000, 'products': ['Commodity', 'CurrencyService', 'InvestmentFund', 'Brokerage', 'InvestmentStock']}]}
            {'name': 'Leslie Martinez', 'email': 'tcrawford@gmail.com', 'accounts': [170945, 951849], 'purchases': []}
            {'name': 'Brad Cardenas', 'email': 'dustin37@yahoo.com', 'accounts': [721914, 817222, 973067, 260799, 87389], 'purchases': [{'account_id': 87389, 'limit': 10000, 'products': ['CurrencyService', 'InvestmentStock']}, {'account_id': 260799, 'limit': 10000, 'products': ['Brokerage', 'InvestmentStock', 'Commodity', 'CurrencyService']}]}
