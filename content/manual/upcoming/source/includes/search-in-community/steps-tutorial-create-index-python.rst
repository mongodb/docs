.. procedure::
   :style: normal      
   
   .. step:: Define your index in a new file. 
      
      This example uses a file named ``create_index.py`` with the following index definition:

      .. literalinclude:: /includes/search-in-community/create-index-tutorial.py
         :caption: create_index.py
         :language: python
         :copyable:
         :emphasize-lines: 5
      
   .. step:: Specify your ``<connection-string>`` and save the file.

      .. _step-specify-conn-string-py:

      Ensure that your index configuration file specifies your connection string.
      
      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

      To learn more, see :ref:`connect-via-driver` and :urioption:`directConnection`.

   .. step:: Create your index.

      To create the index, run the following command:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            python create_index.py

         .. output::

            default

   .. step:: Define your query in a new file.

      This example uses a file named ``lookup-with-search-query.py``. 

      .. include:: /includes/search-in-community/query-intro.rst

      .. literalinclude:: /includes/search-in-community/query.py
         :language: go
         :linenos:
         :dedent:
         :emphasize-lines: 4

   .. step:: Specify your ``<connection-string>`` and save the file.

      To use this example, replace ``<connection-string>`` with the connection 
      string :ref:`you created above <step-specify-conn-string-py>` and then save the file.

   .. step:: Run your query.
      
      The following command runs the query from the query definition file. 

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
