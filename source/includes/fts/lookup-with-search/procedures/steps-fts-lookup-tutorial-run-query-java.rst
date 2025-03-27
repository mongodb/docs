.. procedure:: 
   :style: normal 

   .. step:: Ensure that your ``CLASSPATH`` contains the following libraries.

      .. list-table::
         :widths: 30 70 

         * - ``junit``
           - 4.11 or higher version 

         * - ``mongodb-driver-sync``
           - 4.3.0 or higher version

         * - ``slf4j-log4j12``
           - 1.7.30 or higher version

   .. step:: Create a file named ``LookupWithSearchQuery.java``.

   .. step:: Copy and paste the query into the ``LookupWithSearchQuery.java`` file.

      .. include:: /includes/fts/lookup-with-search/query-intro.rst

      .. literalinclude:: /includes/fts/lookup-with-search/query.java
         :language: java
         :linenos:
         :dedent:
         :emphasize-lines: 13

      .. note:: 

         To run the sample code in your Maven environment, add the 
         following code above the import statements in your file.

         .. code-block:: 

            package com.mongodb.drivers;

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Compile and run the ``LookupWithSearchQuery.java`` file.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            javac LookupWithSearchQuery.java
            java LookupWithSearchQuery
        
         .. output::
            :language: json
            :visible: true

            {"name": "Elizabeth Ray", "email": "arroyocolton@gmail.com", "active": true, "accounts": [371138, 324287, 276528, 332179, 422649, 387979], "purchases": [{"account_id": 422649, "limit": 10000, "products": ["CurrencyService", "InvestmentStock"]}, {"account_id": 324287, "limit": 10000, "products": ["Commodity", "CurrencyService", "Derivatives", "InvestmentStock"]}, {"account_id": 332179, "limit": 10000, "products": ["Commodity", "CurrencyService", "InvestmentFund", "Brokerage", "InvestmentStock"]}]}
            {"name": "Lindsay Cowan", "email": "cooperalexis@hotmail.com", "accounts": [116508], "purchases": []}
            {"name": "Katherine David", "email": "timothy78@hotmail.com", "accounts": [462501, 228290, 968786, 515844, 377292], "purchases": [{"account_id": 228290, "limit": 10000, "products": ["CurrencyService", "InvestmentStock", "InvestmentFund", "Brokerage"]}, {"account_id": 515844, "limit": 10000, "products": ["Commodity", "CurrencyService", "InvestmentFund", "Brokerage", "InvestmentStock"]}]}
            {"name": "Leslie Martinez", "email": "tcrawford@gmail.com", "accounts": [170945, 951849], "purchases": []}
            {"name": "Brad Cardenas", "email": "dustin37@yahoo.com", "accounts": [721914, 817222, 973067, 260799, 87389], "purchases": [{"account_id": 87389, "limit": 10000, "products": ["CurrencyService", "InvestmentStock"]}, {"account_id": 260799, "limit": 10000, "products": ["Brokerage", "InvestmentStock", "Commodity", "CurrencyService"]}]}


