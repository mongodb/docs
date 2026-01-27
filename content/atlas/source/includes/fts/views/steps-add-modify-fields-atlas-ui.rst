.. procedure::
   :style: normal

   .. step:: Connect to the cluster using {+mongosh+}.

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_airbnb`` database.

      .. code-block:: sh

         use sample_airbnb

   .. step:: Create a ``listingsAndReviews_totalPrice`` View.

      .. literalinclude:: /includes/fts/views/add-modify-fields-create-view.sh
         :language: sh

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. step:: Click :guilabel:`Create Search Index` to start your index configuration.

      Make the following selections on the page and then click
      :guilabel:`Next`.

      .. list-table:: 
         :widths: 25 75

         * - :guilabel:`Search Type`
           - Select the |search-type| index type.

         * - :guilabel:`Index Name and Data Source`
           - Specify the following information:
            
             - :guilabel:`Index Name`: |index-name|   
             - :guilabel:`Database and Collection`:
               
               - |database-name|
               - |collection-name|

         * - :guilabel:`Configuration Method`
           - Select :guilabel:`JSON Editor` to edit the raw index definition.

   .. step:: Edit the index definition.

      Copy and paste the following index definition to replace the
      default index definition in the UI:

      .. literalinclude:: /includes/fts/views/add-modify-fields-create-index-ui.json
         :language: json
      
   .. include:: /includes/fts/search-index-management/procedures/steps-fts-finish-index-creation.rst

   .. include:: /includes/fts/views/step-run-query-view-add-modify-ui.rst
