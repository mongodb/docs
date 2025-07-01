.. procedure:: 
   :style: normal 

   .. step:: Define the query.

      a. Create a new file named ``sort-by-date.go`` 
         and paste the following code:

         .. literalinclude:: /includes/fts/sort/date-tutorial.go
            :language: go
            :linenos:
            :emphasize-lines: 15

      #. Specify the ``<connection-string>``.

   .. step:: Run the query.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            go run sort-by-date.go
     
         .. output::
            :language: json
            :visible: false

            [{title Summer Nights} {released 1422403200000} {score 0.348105788230896}]
            [{title Summertime} {released 1406851200000} {score 0.5917375683784485}]
            [{title Summer of Blood} {released 1397692800000} {score 0.9934720396995544}]
            [{title Summer Games} {released 1328659200000} {score 0.15982933342456818}]
            [{title Summer of Goliath} {released 1310083200000} {score 0.13038821518421173}]
