.. procedure::
   :style: normal 

   .. step:: Create a file named ``lookup-with-search-query.go``

   .. step:: Copy and paste the query into the ``lookup-with-search-query.go`` file.

      .. include:: /includes/fts-tutorial/lookup-with-search/query-intro.rst

      .. literalinclude:: /includes/fts-tutorial/lookup-with-search/query.go
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

            {"_id":...,"name":"Gary Nichols","email":"laura34@yahoo.com","accounts":[{"$numberInt":"385397"},{"$numberInt":"337979"},{"$numberInt":"325377"},{"$numberInt":"440243"},{"$numberInt":"586395"},{"$numberInt":"86702"}],"purchases":[{"account_id":{"$numberInt":"337979"},"limit":{"$numberInt":"10000"},"products":["Brokerage","Derivatives","InvestmentStock","CurrencyService"]}]}
            {"_id":...,"name":"Ashley Lopez","email":"michael16@hotmail.com","accounts":[{"$numberInt":"662207"},{"$numberInt":"816481"}],"purchases":[]}
            {"_id":...,"name":"John Parks","email":"zmelton@gmail.com","accounts":[{"$numberInt":"702610"},{"$numberInt":"240640"}],"purchases":[{"account_id":{"$numberInt":"702610"},"limit":{"$numberInt":"10000"},"products":["Commodity","CurrencyService","InvestmentStock"]}]}
            {"_id":...,"name":"Jennifer Lawrence","email":"scott50@yahoo.com","accounts":[{"$numberInt":"344885"},{"$numberInt":"839927"},{"$numberInt":"853542"}],"purchases":[{"account_id":{"$numberInt":"853542"},"limit":{"$numberInt":"10000"},"products":["CurrencyService","InvestmentStock"]},{"account_id":{"$numberInt":"344885"},"limit":{"$numberInt":"10000"},"products":["Commodity","InvestmentFund","CurrencyService","InvestmentStock"]},{"account_id":{"$numberInt":"839927"},"limit":{"$numberInt":"10000"},"products":["InvestmentFund","CurrencyService","Brokerage","Commodity","InvestmentStock"]}]}
            {"_id":...,"name":"Jacqueline Haynes","email":"virginia36@hotmail.com","accounts":[{"$numberInt":"631901"},{"$numberInt":"814687"}],"purchases":[]}
            