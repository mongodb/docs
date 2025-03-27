.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``sort-by-strings.js``. 

   .. step:: Copy and paste the following code into the ``sort-by-strings.js`` file.

      The code example performs the following tasks:

      - Imports ``mongodb``, MongoDB's Node.js driver.
      - Creates an instance of the ``MongoClient`` class to establish a 
        connection to your |service| cluster.
      - .. include:: /includes/fts/extracts/fts-sort-by-string-desc.rst
           
        .. include:: /includes/fts/extracts/fts-sort-by-string-stage.rst

      - Iterates over the cursor to print the documents that match the 
        query.

      .. literalinclude:: /includes/fts/sort/strings-query.js
         :language: javascript
         :linenos:
         :dedent:
         :emphasize-lines: 5

      .. note:: 
         
         .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst
            
   .. step:: Run the following command to query your collection: 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            node sort-by-strings.js

         .. output::
            :language: javascript
            :visible: true

            { title: 'Prancer', score: 1 }
            { title: 'Prancer Returns', score: 1 }
            { title: 'Prince', score: 1 }
            { title: 'Prince Avalanche', score: 1 }
            { title: 'Prince of Broadway', score: 1 }

      .. include:: /includes/fts/extracts/fts-sort-by-string-results.rst
