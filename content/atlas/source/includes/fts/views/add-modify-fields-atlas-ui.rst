.. procedure::
   :style: normal

   .. step:: Connect to the |service| {+cluster+} using {+mongosh+}.

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_airbnb`` database.

      .. code-block:: sh

         use sample_airbnb

   .. step:: Create a ``listingsAndReviews_totalPrice`` View.

      .. literalinclude:: /includes/fts/views/add-modify-fields-create-view.sh
         :language: sh

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst
      
   .. include:: /includes/fts/search-index-management/procedures/steps-fts-finish-index-creation.rst

   .. include:: /includes/fts/views/step-run-query-view-add-modify.rst
