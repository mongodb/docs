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

            .. input:: /includes/avs/create-embeddings/automated/compass-query.json
               :language: javascript
               :linenos:

            .. output:: /includes/avs/create-embeddings/automated/compass-query-output.js
               :language: javascript
               :visible: false 
               :linenos: