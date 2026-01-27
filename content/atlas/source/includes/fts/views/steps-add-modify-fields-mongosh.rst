.. procedure::
   :style: normal

   .. step:: Connect to your MongoDB deployment using {+mongosh+}.

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_airbnb`` database.

      .. code-block:: sh

         use sample_airbnb

   .. step:: Create a ``listingsAndReviews_totalPrice`` View.

      .. literalinclude:: /includes/fts/views/add-modify-fields-create-view.sh
         :language: sh

   .. step:: Create a |fts| index on the View.

      .. literalinclude:: /includes/fts/views/add-modify-fields-create-index.sh
         :language: sh

   .. include:: /includes/fts/views/step-run-query-view-add-modify-mongosh.rst
