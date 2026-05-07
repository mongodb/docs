Your index definition's ``autoEmbed`` field must contain only text. 
You must index the text field as the ``autoEmbed`` type inside the 
fields array. In the index definition for the ``autoEmbed`` type, 
you must configure the fields highlighted below:

.. code-block:: json
   :copyable: true 
   :linenos:
   :emphasize-lines: 4-7

   {
     "fields":[ 
       {
         "type": "autoEmbed",
         "modality": "text",
         "path": "<fieldToIndex>",
         "model": "voyage-4 | voyage-4-large | voyage-4-lite | voyage-code-3"
       }
     ]
   }

Values for the ``autoEmbed`` type fields like ``quantization``, 
``numDimensions``,  ``indexingMethod`` and ``similarity`` are set 
by default if you omit them when you define the index. 

Optionally, you can configure the values for these fields in your 
index definition.

.. code-block:: json
   :copyable: true 
   :linenos:
   :emphasize-lines: 8-11

   {
     "fields":[ 
       {
         "type": "autoEmbed",
         "modality": "text",
         "path": "<fieldToIndex>",
         "model": "<embeddingModel>",
         "quantization": "float | scalar | binary | binaryNoRescore",
         "numDimensions": 256 | 512 | 1024 | 2048,
         "indexingMethod": "flat | hnsw",
         "similarity": "cosine | dotProduct | euclidean",
         "hnswOptions": {
           "maxEdges": <number-of-connected-neighbors>,
           "numEdgeCandidates": <number-of-nearest-neighbors>
         }
       }
     ]
   }
