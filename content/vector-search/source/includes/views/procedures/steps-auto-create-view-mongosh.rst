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

   .. step:: Create a {+avs+} index on the View.

      .. literalinclude:: /includes/views/code-snippets/create-auto-embed-index.js
         :language: javascript
         :copyable: true

   .. include:: /includes/views/procedures/steps-query-auto-embed-search-view.rst