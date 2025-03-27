.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``sort-by-strings.go``. 

   .. step:: Copy and paste the following code into the ``sort-by-strings.go`` file.

      The code example performs the following tasks:

      - Imports ``mongodb`` packages and dependencies.
      - Establishes a connection to your |service| cluster.
      - .. include:: /includes/fts/extracts/fts-sort-by-string-desc.rst
           
        .. include:: /includes/fts/extracts/fts-sort-by-string-stage.rst

      - Iterates over the cursor to print the documents that match the 
        query.

      .. literalinclude:: /includes/fts/sort/strings-query.go
         :language: go
         :linenos:
         :dedent:
         :emphasize-lines: 14

      .. note::  
         
         .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst
            
   .. step::  Run the following command to query your collection: 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            go run sort-by-strings.go

         .. output::
            :language: none
            :visible: true

            [{title Prancer} {score 1}]
            [{title Prancer Returns} {score 1}]
            [{title Prince} {score 1}]
            [{title Prince Avalanche} {score 1}]
            [{title Prince of Broadway} {score 1}]

      .. include:: /includes/fts/extracts/fts-sort-by-string-results.rst
