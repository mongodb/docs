.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``sort-by-date.go``. 
   .. step:: Copy and paste the following code into the ``sort-by-date.go`` file.

      The code example performs the following tasks:

      - Imports ``mongodb`` packages and dependencies.
      - Establishes a connection to your |service| cluster.
      - .. include:: /includes/fts/extracts/fts-sort-by-date-constant-desc.rst 

        .. include:: /includes/fts/extracts/fts-sort-by-date-stage.rst

      - Iterates over the cursor to print the documents that match the query.

      .. literalinclude:: /includes/fts/sort/date-tutorial.go
         :language: go
         :linenos:
         :dedent:
         :emphasize-lines: 15

      .. note:: 
         
         .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Run the following command to query your collection: 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            go run sort-by-date.go
     
         .. output::
            :language: none
            :visible: true

            [{title Summer Nights} {released 1422403200000} {score 0.348105788230896}]
            [{title Summertime} {released 1406851200000} {score 0.5917375683784485}]
            [{title Summer of Blood} {released 1397692800000} {score 0.9934720396995544}]
            [{title Summer Games} {released 1328659200000} {score 0.15982933342456818}]
            [{title Summer of Goliath} {released 1310083200000} {score 0.13038821518421173}]
