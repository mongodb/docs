.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``compound-bury-results.py``.

   .. step:: Copy and paste the query into the ``compound-bury-results.py`` file.

      .. tabs:: 
            
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. include:: /includes/fts/extracts/fts-compound-bury-category-stages.rst

            .. literalinclude:: /includes/fts/custom-score/bury-category-query.py
               :language: python
               :linenos:
               :dedent:
               :emphasize-lines: 4

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. include:: /includes/fts/extracts/fts-compound-bury-id-stages.rst

            .. literalinclude:: /includes/fts/custom-score/bury-documents-query.py
               :language: python
               :linenos:
               :dedent:
               :emphasize-lines: 5

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Run the command to query your collection.

      .. tabs:: 
         :hidden:
            
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  python compound-bury-results.csproj

               .. output:: /includes/fts/custom-score/bury-category-py-results.sh
                  :language: javascript

            .. include:: /includes/fts/extracts/fts-compound-bury-genre-results.rst 

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  python compound-bury-results.csproj

               .. output:: /includes/fts/custom-score/bury-documents-py-results.sh
                  :language: javascript

            .. include:: /includes/fts/extracts/fts-compound-bury-id-results.rst 