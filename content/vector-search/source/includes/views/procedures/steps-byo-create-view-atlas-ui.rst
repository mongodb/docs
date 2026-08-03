.. procedure::
   :style: normal

   .. step:: Connect to your cluster using {+mongosh+}. 

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_mflix`` database.

      .. code-block:: sh

         use sample_mflix

   .. step:: Create a ``moviesWithEmbeddings`` View.

      .. literalinclude:: /includes/views/code-snippets/create-view.js
         :language: javascript
         :copyable: true

   .. include:: /includes/shared/procedures/steps-db-deployments-page.rst

   .. include:: /includes/shared/procedures/steps-atlas-search.rst

   .. step:: Click :guilabel:`Create Search Index`.

   .. step:: Start your index configuration.

      Make the following selections on the page and then click
      :guilabel:`Next`.

      .. |database-name| replace:: ``sample_mflix``
      .. |collection-name| replace:: ``movies``
      .. |search-type| replace:: {+avs+}
      .. |embeddings| replace:: :guilabel:`Bring your own embeddings`
     
      .. include:: /includes/shared/list-tables/list-table-configure-index.rst

      Choose :guilabel:`JSON Editor`.
         
   .. step:: Specify an index definition.
      
      a. Specify the following index definition:
      
         .. literalinclude:: /includes/views/code-snippets/create-index.json
            :copyable: true
            :language: json
            :linenos:
                        
      #. Click :guilabel:`Next`.
      
   .. include:: /includes/shared/procedures/steps-avs-finish-index-creation.rst

   .. include:: /includes/views/procedures/steps-query-vector-search-view-ui.rst