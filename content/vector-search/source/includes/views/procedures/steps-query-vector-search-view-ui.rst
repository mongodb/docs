.. step:: Navigate to the view in the {+atlas-ui+}.

   a. Click the :guilabel:`Browse Collections` button for your cluster.
   #. Expand the :guilabel:`sample_mflix` database and click the :guilabel:`moviesWithEmbeddings` view.

.. step:: Query the view.

   a. Go to :guilabel:`Aggregation` for the view.
   #. Click :guilabel:`</> Text` to switch to |json| view.
   #. Copy and paste the following query into the :guilabel:`Query Editor` 

      .. io-code-block:: 
         :copyable: true
         
         .. input:: /includes/views/code-snippets/ui-vector-query.json
            :language: json
            :linenos:

         .. output:: /includes/views/output/ui-vector-query.js
            :language: javascript
            :visible: false