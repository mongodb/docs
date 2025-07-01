.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``compound-bury-results.js``.

   .. step:: Copy and paste the sample query into the ``compound-bury-results.js`` file.

      .. tabs:: 
            
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. include:: /includes/fts/extracts/fts-compound-bury-category-stages.rst

            .. literalinclude:: /includes/fts/custom-score/bury-category-query.js
               :language: js
               :linenos:
               :dedent:
               :emphasize-lines: 4

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. include:: /includes/fts/extracts/fts-compound-bury-id-stages.rst

            .. literalinclude:: /includes/fts/custom-score/bury-documents-query.js
               :language: js
               :linenos:
               :dedent:
               :emphasize-lines: 5

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Query your collection.

      Run the following command to query your collection: 

      .. tabs:: 
         :hidden:
            
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  node compound-bury-results.js

               .. output:: /includes/fts/custom-score/bury-category-nodejs-results.sh
                  :language: javascript

            .. include:: /includes/fts/extracts/fts-compound-bury-genre-results.rst 

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  node compound-bury-results.js

               .. output:: /includes/fts/custom-score/bury-documents-nodejs-results.sh
                  :language: javascript

            .. include:: /includes/fts/extracts/fts-compound-bury-id-results.rst 
