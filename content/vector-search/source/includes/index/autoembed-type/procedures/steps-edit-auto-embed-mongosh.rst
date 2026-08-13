.. procedure:: 
   :style: normal 

   .. step:: Connect to the cluster using {+mongosh+}. 

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the database that contains the collection for which you want to update the index. 

   .. step:: Run the ``db.collection.updateSearchIndex()`` method. 

      The :method:`db.collection.updateSearchIndex()` method has the
      following syntax:   

      .. code-block:: shell 
         :copyable: true 
         :linenos: 

         db.<collectionName>.updateSearchIndex(
           "<index-name>",
           {
             fields: [
               {
                 "type": "autoEmbed",
                 "modality": "text",
                 "path": "<field-to-index>",
                 "model": "<embedding-model>",
                 "similarity": "<similarity-metric>",
                 "numDimensions": <number-of-dimensions>,
                 "indexingMethod": "<indexing-method>",
                 "hnswOptions": {
                   "maxEdges": <number-of-connected-neighbors>,
                   "numEdgeCandidates": <number-of-nearest-neighbors>
                 },
                 "quantization": "<quantization-type>"
               },
               {
                 "type": "filter",
                 "path": "<field-to-index>"
               },
               ...
             ]
           }
         );
