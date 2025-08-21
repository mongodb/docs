.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``lookup-with-search-query.js`` in your project directory.

   .. step:: Copy and paste the sample query into the ``lookup-with-search-query.js`` file.

      .. include:: /includes/fts/lookup-with-search/query-intro.rst

      .. literalinclude:: /includes/fts/lookup-with-search/query.js
         :language: go
         :linenos:
         :dedent:
         :emphasize-lines: 55

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Query your collection.

      Run the following command to query your collection: 
  
      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
     
            node lookup-with-search-query.js
        
         .. output::
            :language: js
            :visible: true

            {
              name: 'Lindsay Cowan',
              email: 'cooperalexis@hotmail.com',
              accounts: [ 116508 ],
              purchases: []
            }
            {
              name: 'Dr. Angela Brown',
              email: 'michaelespinoza@gmail.com',
              accounts: [ 571880 ],
              purchases: []
            }
            {
              name: 'Brian Flores',
              email: 'april04@gmail.com',
              accounts: [ 550665, 321695 ],
              purchases: [
                { account_id: 321695, limit: 10000, products: [Array] }
              ]
            }
            {
              name: 'Shirley Rodriguez',
              email: 'jonathan95@yahoo.com',
              accounts: [ 784245, 896066, 991412, 951840 ],
              purchases: [
                { account_id: 991412, limit: 10000, products: [Array] },
                { account_id: 951840, limit: 10000, products: [Array] },
                { account_id: 896066, limit: 10000, products: [Array] }
              ]
            }
            {
              name: 'Clinton Shelton',
              email: 'acook@gmail.com',
              accounts: [ 602560, 986196, 51080, 690617, 225602 ],
              purchases: []
            }
