.. procedure::
   :style: normal 

   .. step:: Create a file named ``lookup-with-search-query.go``

   .. step:: Copy and paste the query into the ``lookup-with-search-query.go`` file.

      .. include:: /includes/fts-tutorial/lookup-with-search/query-intro.rst

      .. literalinclude:: /includes/fts-tutorial/lookup-with-search/query.go
         :language: go
         :linenos:
         :dedent:
         :emphasize-lines: 16

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Run the command to query your collection.

      .. io-code-block::
         :copyable: true
      
         .. input:: 
            :language: shell
            
            go run lookup-with-search-query.go
      
         .. output:: 
            :language: javascript

            [{_id ObjectID("5ca4bbcea2dd94ee58162a68")} {name Elizabeth Ray} {email arroyocolton@gmail.com} {active true} {accounts [371138 324287 276528 332179 422649 387979]} {purchases [[{account_id 422649} {limit 10000} {products [CurrencyService InvestmentStock]}] [{account_id 324287} {limit 10000} {products [Commodity CurrencyService Derivatives InvestmentStock]}] [{account_id 332179} {limit 10000} {products [Commodity CurrencyService InvestmentFund Brokerage InvestmentStock]}]]}]
            [{_id ObjectID("5ca4bbcea2dd94ee58162a69")} {name Lindsay Cowan} {email cooperalexis@hotmail.com} {accounts [116508]} {purchases []}]
            [{_id ObjectID("5ca4bbcea2dd94ee58162a6a")} {name Katherine David} {email timothy78@hotmail.com} {accounts [462501 228290 968786 515844 377292]} {purchases [[{account_id 228290} {limit 10000} {products [CurrencyService InvestmentStock InvestmentFund Brokerage]}] [{account_id 515844} {limit 10000} {products [Commodity CurrencyService InvestmentFund Brokerage InvestmentStock]}]]}]
            [{_id ObjectID("5ca4bbcea2dd94ee58162a6b")} {name Leslie Martinez} {email tcrawford@gmail.com} {accounts [170945 951849]} {purchases []}]
            [{_id ObjectID("5ca4bbcea2dd94ee58162a6c")} {name Brad Cardenas} {email dustin37@yahoo.com} {accounts [721914 817222 973067 260799 87389]} {purchases [[{account_id 87389} {limit 10000} {products [CurrencyService InvestmentStock]}] [{account_id 260799} {limit 10000} {products [Brokerage InvestmentStock Commodity CurrencyService]}]]}]
