.. procedure:: 
   :style: normal 

   .. step:: Ensure that you add the following dependencies to your project.

      - MongoDB 
      
        .. code-block:: 

           mongodb-driver-kotlin-coroutine

        To learn more, see :driver:`Add MongoDB as a Dependency
        </kotlin/coroutine/current/quick-start/#add-mongodb-as-a-dependency>`.
        
      - Serialization Library 

        .. code-block:: 

           bson-kotlinx

        To learn more, see :driver:`Add Serialization Library Dependencies
        </kotlin/coroutine/current/quick-start/#add-serialization-library-dependencies>`.

   .. step:: Create a file named ``EmbeddedDocumentsFacetQuery.kt``.

   .. step:: Copy and paste the query into the ``EmbeddedDocumentsFacetQuery.kt`` file.

      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-intro.rst

      .. literalinclude:: /includes/fts/embedded-document/facet-query.kt 
         :language: kotlin
         :linenos:
         :dedent:
         :emphasize-lines: 7

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Run the ``EmbeddedDocumentsFacetQuery.kt`` file.

      When you run the ``EmbeddedDocumentsFacetQuery.kt`` program in your IDE, it prints
      the following documents:

      .. code-block:: javascript 
         :copyable: false

         Document{{
           count=Document{{lowerBound=3}}, 
           facet=Document{{
             gradeFacet=Document{{
               buckets=[
                 Document{{_id=12th, count=3}}, 
                 Document{{_id=9th, count=3}}, 
                 Document{{_id=10th, count=2}}, 
                 Document{{_id=11th, count=1}}
               ]
             }}
           }}
         }}
         
      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-results.rst
