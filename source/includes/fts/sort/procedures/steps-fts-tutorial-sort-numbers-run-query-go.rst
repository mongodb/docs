.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``sort-by-numbers.go``. 

   .. step:: Copy and paste the following code into the ``sort-by-numbers.go`` file.

      The code example performs the following tasks:

      - Imports ``mongodb`` packages and dependencies.
      - Establishes a connection to your |service| cluster.
      - .. include:: /includes/fts/extracts/fts-sort-by-numbers-constant-desc.rst 

        .. include:: /includes/fts/extracts/fts-sort-by-numbers-stage.rst

      - Iterates over the cursor to print the documents that match the 
        query.

      .. literalinclude:: /includes/fts/sort/numbers-query.go
         :language: go
         :linenos:
         :dedent:
         :emphasize-lines: 14

      .. note:: 
      
         .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Run the following command to query your collection: 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            go run sort-by-numbers.go
     
         .. output::
            :language: none
            :visible: true

            [{title 12 Years a Slave} {awards [{wins 267}]}]
            [{title Gravity} {awards [{wins 231}]}]
            [{title Gravity} {awards [{wins 231}]}]
            [{title Birdman: Or (The Unexpected Virtue of Ignorance)} {awards [{wins 210}]}]
            [{title Boyhood} {awards [{wins 185}]}]
