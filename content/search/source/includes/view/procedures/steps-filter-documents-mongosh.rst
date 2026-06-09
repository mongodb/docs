.. procedure::
   :style: normal

   .. step:: Connect to your MongoDB Deployment using {+mongosh+}.

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_mflix`` database.

      .. code-block:: sh

         use sample_mflix

   .. step:: Create a ``movies_ReleasedAfter2000`` View.

      .. literalinclude:: /includes/view/code-snippets/shell/filter-documents-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/view/code-snippets/shell/filter-documents-create-index.sh
         :language: sh

   .. include:: /includes/view/procedures/step-run-query-view-filter-mongosh.rst
