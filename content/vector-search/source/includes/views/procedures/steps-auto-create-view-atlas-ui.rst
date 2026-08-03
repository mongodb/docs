.. procedure::
   :style: normal

   .. step:: Connect to your MongoDB deployment using {+mongosh+}.

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_mflix`` database.

      .. code-block:: sh

         use sample_mflix

   .. step:: Create a ``moviesWithAutomatedEmbedding`` View.

      .. literalinclude:: /includes/views/code-snippets/create-auto-embed-view.js
         :language: javascript
         :copyable: true

   .. include:: /includes/shared/procedures/steps-db-deployments-page.rst

   .. include:: /includes/shared/procedures/steps-atlas-search.rst

   .. step:: Click :guilabel:`Create Search Index`.

   .. step:: Start your index configuration.

      Make the following selections on the page and then click
      :guilabel:`Next`.

      .. |search-type| replace:: :guilabel:`MongoDB Vector Search`
      .. |index-name| replace:: ``embeddingsIndex``
      .. |database-name| replace:: ``sample_mflix``
      .. |collection-name| replace:: ``moviesWithEmbeddings``
      .. |source-collection| replace:: ``embedded_movies``
      .. |embeddings| replace:: :guilabel:`Automated Embedding`

      .. include:: /includes/shared/list-tables/list-table-configure-index.rst

      Choose :guilabel:`JSON Editor`.

   .. step:: Create a {+avs+} index on the View.

      a. Specify the following index definition:

         .. literalinclude:: /includes/views/code-snippets/create-auto-embed-index.json
            :language: javascript
            :copyable: true

      #. Click :guilabel:`Next`.
      
   .. include:: /includes/shared/procedures/steps-avs-finish-index-creation.rst

   .. include:: /includes/views/procedures/steps-query-auto-embed-search-view-ui.rst