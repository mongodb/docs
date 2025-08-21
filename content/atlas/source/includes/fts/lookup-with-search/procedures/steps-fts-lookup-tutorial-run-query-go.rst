.. procedure::
   :style: normal 

   .. step:: Create a file named ``lookup-with-search-query.go``

   .. step:: Copy and paste the query into the ``lookup-with-search-query.go`` file.

      .. include:: /includes/fts/lookup-with-search/query-intro.rst

      .. literalinclude:: /includes/fts/lookup-with-search/query.go
         :language: go
         :linenos:
         :dedent:
         :emphasize-lines: 17

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
            :language: none

            {"_id":{"$oid":"..."},"name":"Lindsay Cowan","email":"cooperalexis@hotmail.com","accounts":[{"$numberInt":"116508"}],"purchases":[]}
            {"_id":{"$oid":"..."},"name":"Dr. Angela Brown","email":"michaelespinoza@gmail.com","accounts":[{"$numberInt":"571880"}],"purchases":[]}
            {"_id":{"$oid":"..."},"name":"Brian Flores","email":"april04@gmail.com","accounts":[{"$numberInt":"550665"},{"$numberInt":"321695"}],"purchases":[{"account_id":{"$numberInt":"321695"},"limit":{"$numberInt":"10000"},"products":["Derivatives","Commodity","CurrencyService","Brokerage","InvestmentStock"]}]}
            {"_id":{"$oid":"..."},"name":"Shirley Rodriguez","email":"jonathan95@yahoo.com","accounts":[{"$numberInt":"784245"},{"$numberInt":"896066"},{"$numberInt":"991412"},{"$numberInt":"951840"}],"purchases":[{"account_id":{"$numberInt":"991412"},"limit":{"$numberInt":"10000"},"products":["CurrencyService","Commodity","InvestmentFund","InvestmentStock"]},{"account_id":{"$numberInt":"951840"},"limit":{"$numberInt":"10000"},"products":["InvestmentFund","Commodity","CurrencyService","InvestmentStock"]},{"account_id":{"$numberInt":"896066"},"limit":{"$numberInt":"10000"},"products":["Derivatives","InvestmentFund","Brokerage","CurrencyService","InvestmentStock"]}]}
            {"_id":{"$oid":"..."},"name":"Clinton Shelton","email":"acook@gmail.com","accounts":[{"$numberInt":"602560"},{"$numberInt":"986196"},{"$numberInt":"51080"},{"$numberInt":"690617"},{"$numberInt":"225602"}],"purchases":[]}
            