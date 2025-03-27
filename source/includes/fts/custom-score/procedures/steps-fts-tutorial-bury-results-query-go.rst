.. procedure::
   :style: normal 

   .. step:: Create a file named ``compound-bury-results.go``

   .. step:: Copy and paste the query into the ``compound-bury-results.go`` file.

      .. tabs:: 
            
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. include:: /includes/fts/extracts/fts-compound-bury-category-stages.rst

            .. literalinclude:: /includes/fts/custom-score/bury-category-query.go
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 25

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. include:: /includes/fts/extracts/fts-compound-bury-id-stages.rst

            .. literalinclude:: /includes/fts/custom-score/bury-documents-query.go
               :language: go
               :linenos:
               :dedent:
               :emphasize-lines: 26

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Run the command to query your collection.

      .. tabs:: 
            
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  go run compound-bury-results.go

               .. output:: /includes/fts/custom-score/bury-category-go-results.sh
                  :language: javascript

            .. include:: /includes/fts/extracts/fts-compound-bury-genre-results.rst 

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  go run compound-bury-results.go

               .. output:: /includes/fts/custom-score/bury-documents-go-results.sh
                  :language: javascript

            .. include:: /includes/fts/extracts/fts-compound-bury-id-results.rst 
