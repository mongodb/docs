.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``LookupWithSearchQuery.kt`` in your project directory.

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

      Compile and run your application in your IDE or your shell. 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            kotlinc LookupWithSearchQuery.kt -include-runtime -d LookupWithSearchQuery.jar
            java -jar LookupWithSearchQuery.jar

         .. output::
            :visible: false

            Document{{name=Lindsay Cowan, email=cooperalexis@hotmail.com, accounts=[116508], purchases=[]}}
            Document{{name=Dr. Angela Brown, email=michaelespinoza@gmail.com, accounts=[571880], purchases=[]}}
            Document{{name=Brian Flores, email=april04@gmail.com, accounts=[550665, 321695], purchases=[Document{{account_id=321695, limit=10000, products=[Derivatives, Commodity, CurrencyService, Brokerage, InvestmentStock]}}]}}
            Document{{name=Shirley Rodriguez, email=jonathan95@yahoo.com, accounts=[784245, 896066, 991412, 951840], purchases=[Document{{account_id=991412, limit=10000, products=[CurrencyService, Commodity, InvestmentFund, InvestmentStock]}}, Document{{account_id=951840, limit=10000, products=[InvestmentFund, Commodity, CurrencyService, InvestmentStock]}}, Document{{account_id=896066, limit=10000, products=[Derivatives, InvestmentFund, Brokerage, CurrencyService, InvestmentStock]}}]}}
            Document{{name=Clinton Shelton, email=acook@gmail.com, accounts=[602560, 986196, 51080, 690617, 225602], purchases=[]}}