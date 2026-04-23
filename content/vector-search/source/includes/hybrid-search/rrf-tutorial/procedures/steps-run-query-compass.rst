.. procedure::
   :style: normal

   .. step:: Navigate to the collection in |compass|.

      On the :guilabel:`Database` screen, click the ``sample_mflix``
      database, then click the ``embedded_movies`` collection.

   .. step:: Run a basic query.
      
      .. include:: /includes/hybrid-search/rrf-tutorial/facts/fact-run-query-intro.rst
      
      To run this query in |compass|:

      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`</> Text` to switch to |json| view.
      #. Copy and paste to run the following query:

         .. io-code-block::
            :copyable: true 

            .. input:: /includes/hybrid-search/rrf-tutorial/code-snippets/query-compass.json
               :language: javascript
               :linenos:

            .. output:: /includes/hybrid-search/rrf-tutorial/code-snippets/compass-query-output.js
               :language: javascript
               :visible: false 
               :linenos:
