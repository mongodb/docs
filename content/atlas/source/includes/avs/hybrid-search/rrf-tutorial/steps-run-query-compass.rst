.. procedure::
   :style: normal

   .. step:: Navigate to the collection in |compass|.

      On the :guilabel:`Database` screen, click the ``sample_mflix``
      database, then click the ``embedded_movies`` collection.

   .. step:: Run a basic query.
      
      .. include:: /includes/avs/hybrid-search/rrf-tutorial/fact-run-query-intro.rst
      
      To run this query in |compass|:

      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`</> Text` to switch to |json| view.
      #. Copy and paste to run the following query:

         .. io-code-block::
            :copyable: true 

            .. input:: /includes/avs/hybrid-search/rrf-tutorial/query-compass.json
               :language: javascript
               :linenos:

            .. output:: /includes/avs/hybrid-search/rrf-tutorial/compass-query-output.js
               :language: javascript
               :visible: false 
               :linenos:
