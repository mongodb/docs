.. procedure::
   :style: normal

   .. step:: Connect to your cluster using {+mongosh+}.

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_mflix`` database.

      .. code-block:: sh

         use sample_mflix

   .. step:: Create a ``movies_ReleasedAfter2000`` View.

      .. literalinclude:: /includes/fts/views/filter-documents-create-view.sh
         :language: sh

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst
      
   .. include:: /includes/fts/search-index-management/procedures/steps-fts-finish-index-creation.rst

   .. include:: /includes/fts/views/step-run-query-view-filter-ui.rst
