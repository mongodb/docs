.. procedure::
   :style: normal

   .. step:: Navigate to the collection in |compass|.

      On the :guilabel:`Database` screen, click the ``sample_airbnb``
      database, then click the ``listingsAndReviews`` collection.

   .. step:: Run the query.
            
      To run this query in |compass|:

      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`</> Text` to switch to |json| view.
      #. Copy and paste to run the following queries:

         .. tabs::

            .. tab:: Similar Terms, Same Field
               :tabid: similar-terms-same-field

               Perform a comprehensive search of the dataset for semantically similar
               terms to determine which query term returns the best results.

               .. io-code-block::
                  :copyable: true 

                  .. input:: /includes/unionwith/code-snippets/auto-embed/json/multiple-vectors-query.json
                     :language: javascript
                     :linenos:

                  .. output:: /includes/unionwith/code-snippets/output/auto-embed/json/multiple-vectors.json
                     :language: javascript
                     :visible: false 
                     :linenos:

            .. tab:: Same Term, Multiple Fields
               :tabid: same-term-multiple-fields

               Search multiple fields in the dataset to determine which fields return
               the best results for the same query.

               .. io-code-block::
                  :copyable: true 

                  .. input:: /includes/unionwith/code-snippets/auto-embed/json/same-term-vectors-query.json
                     :language: javascript
                     :linenos:

                  .. output:: /includes/unionwith/code-snippets/output/auto-embed/json/same-term-vectors.json
                     :language: javascript
                     :visible: false 
                     :linenos:

            .. tab:: Same Term, Multiple Models
               :tabid: same-term-multiple-models

               Search embeddings from different embedding models for the same query 
               term to determine the semantic interpretation differences between the 
               different models.

               .. io-code-block::
                  :copyable: true 

                  .. input:: /includes/unionwith/code-snippets/auto-embed/json/same-term-multiple-models-query.json
                     :language: javascript
                     :linenos:

                  .. output:: /includes/unionwith/code-snippets/output/auto-embed/json/same-term-multiple-models.json
                     :language: javascript
                     :visible: false 
                     :linenos:
