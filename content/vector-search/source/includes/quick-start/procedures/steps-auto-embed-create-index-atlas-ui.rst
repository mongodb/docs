.. procedure::
   :style: normal

   .. step:: When the sample data finishes loading, click :guilabel:`Create Search Index`.

   .. step:: Select the namespace and search type on the page and then click :guilabel:`Next`.

      .. |database-name| replace:: ``sample_mflix``
      .. |collection-name| replace:: ``movies``
      .. |search-type| replace:: {+avs+}
      .. |embeddings| replace:: :guilabel:`Automated Embedding`

      .. include:: /includes/shared/list-tables/list-table-configure-index.rst

   .. step:: Define the index.

      .. include:: /includes/quick-start/facts/avs-quick-start-auto-embed-index-description.rst

      .. tabs:: 

         .. tab:: Visual Editor 
            :tabid: vib 

            Select the following from the dropdowns: 
            
            .. list-table:: 
               :header-rows: 1

               * - Field
                 - Value
               * - :guilabel:`Path`
                 - ``fullplot`` 
               * - :guilabel:`Embedding Model`
                 - ``voyage-4``
      
         .. tab:: JSON Editor 
            :tabid: jsoneditor

            Copy and paste the following :ref:`vector search index definition <vector-search-quickstart-vector-index-definition>` 
            into the JSON Editor. 

            .. literalinclude:: /includes/quick-start/code-snippets/auto-embed/json/create-index.json
               :language: json
               :copyable: true 
               :linenos: 

      For details on all the {+avs+} index settings for Automated Embedding, see 
      :ref:`avs-types-vector-search-options`.

   .. step:: Click :guilabel:`Next`.

   .. step:: Click :guilabel:`Create Vector Search Index`. 

      The index should take about one minute to build. When your vector index is 
      finished building, the :guilabel:`Status` column reads :guilabel:`Active`.
