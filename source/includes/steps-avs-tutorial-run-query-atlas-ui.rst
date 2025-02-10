.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-data-explorer.rst
  
   .. step:: Go to the :guilabel:`Aggregation` tab for the collection.

      a. Expand ``sample_mflix`` under the list of databases and select
         ``embedded_movies`` from the list of collections in that
         database.  
         
      #. Click the :guilabel:`Aggregation` tab for the
         ``sample_mflix.embedded_movies`` collection.

   .. step:: Run the {+avs+} queries against the indexed field.

      a. Click :guilabel:`</> Text`.
      #. Replace :guilabel:`[ ]` in the left pane with the query for the
         pre-filter operator that you want to try. 

      .. include:: /includes/extracts/fts-vector-search-tutorial-queries-desc.rst

      .. tabs:: 

         .. tab:: Pre-Filter by AND Operator 
            :tabid: basic

            .. include:: /includes/extracts/fts-vector-search-tutorial-simple-query-desc.rst

            .. io-code-block::
               :copyable: true
   
               .. input:: /includes/avs-examples/tutorial/filter-by-and-query-ui.js 
                  :language: json
                  :linenos:

               .. output:: /includes/avs-examples/tutorial/filter-by-and-query-ui-output.js
                  :language: javascript
                  :linenos:

         .. tab:: Pre-Filter by OR or AND Operator
            :tabid: advanced

            .. include:: /includes/extracts/fts-vector-search-tutorial-advanced-query-desc.rst

            .. io-code-block::
               :copyable: true
   
               .. input:: /includes/avs-examples/tutorial/filter-by-or-and-query-ui.js
                  :language: json
                  :linenos:

               .. output:: /includes/avs-examples/tutorial/filter-by-or-and-query-ui-output.js
                  :language: javascript
                  :linenos:

      .. note:: 

         The :guilabel:`Pipeline Output` pane displays the results of
         your query.

   .. step:: Expand your query results.

      The {+atlas-ui+} might not display all the values in the 
      documents it returns. To view all the values for the fields that
      you searched in the :ref:`query path <ref-path>`, expand the
      fields in the documents.
