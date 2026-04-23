Your index definition's ``vector`` type field must contain an array of 
numbers of *one* of the following types: 

- |bson| ``double`` 
- |bson| :manual:`BinData </reference/method/BinData/>` ``vector``
  subtype ``float32``  
- |bson| :manual:`BinData </reference/method/BinData/>` ``vector``
  subtype ``int1`` 
- |bson| :manual:`BinData </reference/method/BinData/>` ``vector``
  subtype ``int8`` 

.. note:: 

   To learn more about generating |bson| :manual:`BinData
   </reference/method/BinData/>` vectors with subtype ``float32``
   ``int1`` or ``int8`` for your data, see 
   :ref:`avs-bindata-vector-subtype`.

You must index the vector field as the ``vector`` type inside the
``fields`` array. In the index definition for the ``vector`` type, 
you configure some additional required and optional parameters 
(highlighted below) to index the field:

.. code-block:: json
   :copyable: true 
   :linenos:
   :emphasize-lines: 6-13

   {
     "fields":[ 
       {
         "type": "vector",
         "path": <field-to-index>,
         "numDimensions": <number-of-dimensions>,
         "similarity": "euclidean | cosine | dotProduct",
         "quantization": "none | scalar | binary",
         "indexingMethod": "flat | hnsw",
         "hnswOptions": {
           "maxEdges": <number-of-connected-neighbors>,
           "numEdgeCandidates": <number-of-nearest-neighbors>
         }
       },
       ...
     ]
   }