.. procedure:: 
   :style: normal 

   .. step:: Click the `Collections <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Fmetrics%2FreplicaSet%2F%3Creplset%3E%2Fexplorer%2Fsample_mflix%2Fcomments%2Ffind>`__ tab in the {+atlas-ui+}.
  
   .. step:: Go to the :guilabel:`Aggregation` tab for the collection.

      a. Expand ``sample_mflix`` under the list of databases and select
         ``embedded_movies`` from the list of collections in that
         database.  
         
      #. Click the :guilabel:`Aggregation` tab for the
         ``sample_mflix.embedded_movies`` collection.

   .. step:: Construct and run your vector search query.

      a. In the aggregation pipeline pane, click the :guilabel:`</> Text` 
         toggle to enable text mode for pipeline editing.
      
      #. Copy and paste the following sample query into the text editor.

         .. include:: /includes/avs/facts/fact-avs-quick-start-intro.rst
      
      .. io-code-block::
         :copyable: true
      
         .. input:: /includes/avs/tutorial/quick-start-ui.js 
            :language: json
            :linenos:

         .. output:: /includes/avs/tutorial/quick-start-ui-output.js
            :language: javascript
            :linenos:

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro-II.rst

      The :guilabel:`Pipeline Output` pane displays the results of
      your query.

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.
