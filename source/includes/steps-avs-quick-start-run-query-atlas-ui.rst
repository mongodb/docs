.. procedure:: 
   :style: normal 

   .. step:: Go to the :guilabel:`Collections` page.

      a. Click the {+cluster+} name to view the {+cluster+} details.
  
      #. Click the :guilabel:`Collections` tab.
  
   .. step:: Go to the :guilabel:`Data Explorer` tab for the collection.

      a. Expand ``sample_mflix`` under the list of databases and select
         ``embedded_movies`` from the list of collections in that
         database.  
         
      #. Click the :guilabel:`Aggregation` tab for the
         ``sample_mflix.embedded_movies`` collection.

   .. step:: Construct and run your vector search query.

      .. include:: /includes/fact-avs-quick-start-intro.rst

      a. Click :guilabel:`</> Text`.

      #. Copy the following sample query.

      #. Replace :guilabel:`[ ]` in the left pane with the following 
         sample query:
      
      .. io-code-block::
         :copyable: true
      
         .. input:: /includes/avs-examples/tutorial/quick-start-ui.js 
            :language: json
            :linenos:

         .. output:: /includes/avs-examples/tutorial/quick-start-ui-output.js
            :language: javascript
            :linenos:

      The :guilabel:`Pipeline Output` pane displays the results of
      your query.

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Expand your query results.

      The :guilabel:`Data Explorer` might not display all the values in 
      the documents it returns. To view all the values for the fields 
      that you searched in the :ref:`query path <ref-path>`, expand the
      fields in the documents.
