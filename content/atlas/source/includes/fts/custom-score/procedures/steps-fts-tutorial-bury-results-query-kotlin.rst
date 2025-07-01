.. procedure:: 
   :style: normal 

   .. step:: Ensure that you add the following dependency to your project.

      .. list-table::
         :widths: 30 70 

         * - ``mongodb-driver-kotlin-coroutine``
           - 4.10.0 or higher version

   .. step:: Create a file named ``CompoundBuryQuery.kt``.

   .. step:: Copy and paste the following code into the ``CompoundBuryQuery.kt`` file.

      .. tabs:: 
            
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. include:: /includes/fts/extracts/fts-compound-bury-category-stages.rst

            .. literalinclude:: /includes/fts/custom-score/bury-category-query.kt
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 39

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. include:: /includes/fts/extracts/fts-compound-bury-id-stages.rst

            .. literalinclude:: /includes/fts/custom-score/bury-documents-query.kt
               :language: java
               :linenos:
               :dedent:
               :emphasize-lines: 43

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Run the ``CompoundBuryQuery.kt`` file.

      When you run the ``CompoundBuryQuery.kt`` program in your IDE, it prints
      the following documents:

      .. tabs:: 
         :hidden:
            
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  dotnet run compound-bury-results.csproj

               .. output:: /includes/fts/custom-score/bury-category-kotlin-results.js
                  :language: json

            .. include:: /includes/fts/extracts/fts-compound-bury-genre-results.rst 

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  dotnet run compound-bury-results.csproj

               .. output:: /includes/fts/custom-score/bury-documents-kotlin-results.js
                  :language: json

            .. include:: /includes/fts/extracts/fts-compound-bury-id-results.rst 
