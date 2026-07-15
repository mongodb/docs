.. procedure::
   :style: normal

   .. step:: Navigate to the collection in |compass|.

      On the :guilabel:`Database` screen, click the ``sample_airbnb``
      database, then click the ``listingsAndReviews`` collection.

   .. step:: Run the query.
            
      To run this query in |compass|:

      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`</> Text` to switch to |json| view.
      #. Copy and paste to run the following query:

         .. io-code-block::
            :copyable: true 

            .. input:: /includes/quick-start/code-snippets/auto-embed/json/compass-query.json
               :language: javascript
               :linenos:

            .. output:: /includes/quick-start/code-snippets/output/compass-query-output.js
               :language: javascript
               :visible: false 
               :linenos:

         For details on all the {+avs+} query settings for Automated Embedding, see 
         :ref:`$vectorSearch syntax <vectorSearch-agg-pipeline-syntax>`.
