The vector search index definition takes the following fields:

.. code-block:: javascript

   {
     "fields": [ 
       {
         "type": "vector" | "filter",
         "path": "<field-to-index>",
         "numDimensions": <number-of-dimensions>,
         "similarity": "euclidean" | "cosine" | "dotProduct"
       }
     ]
   }

For explanations of vector search index definition fields, see
:ref:`avs-types-vector-search`.
