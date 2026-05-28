.. procedure::
   :style: normal

   .. step:: Connect to your cluster using {+mongosh+}.

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_airbnb`` database.

      .. code-block:: sh

         use sample_airbnb

   .. step:: Create a View named ``listings_SearchableTypes``.

      .. literalinclude:: /includes/fts/views/facet-fields-create-view.sh
         :language: sh
         :linenos:

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

      .. literalinclude:: /includes/fts/views/facet-fields-index-atlas-ui.json
         :language: json
         :copyable: true

      The preceding index definition indexes the ``idString`` and ``superHostString`` 
      fields as the ``token`` type to support faceting on these fields.

   .. include:: /includes/fts/search-index-management/procedures/steps-fts-finish-index-creation.rst

   .. step:: Go to the :guilabel:`Search Tester`.
      
      Click the :guilabel:`Query` button to the right of the index to 
      query.
      
   .. step:: View and edit the query syntax.
      
      Click :guilabel:`Edit Query` to view a default query syntax 
      sample in |json| format.

   .. step:: Query the ``listingsAndReviews`` Source Collection. 

      The following query searches the ``summary`` field for ``ocean view`` in the ``listings_SearchableTypes`` index. The 
      query retrieves the count of the number of properties that belong to each distinct  ``_id``  and ``host.host_is_superhost``. To run this query, copy and paste 
      the query, and click :guilabel:`Search`:

      .. io-code-block::
         :copyable: true
        
         .. input:: /includes/fts/views/facet-fields-atlas-ui-query.js 
            :language: javascript

         .. output:: /includes/fts/views/facet-fields-atlas-ui-query-output.js
            :language: javascript
