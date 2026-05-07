{+avs+} supports the following similarity functions: 

- ``euclidean`` - measures the distance between ends of vectors. This
  value allows you to measure similarity based on varying dimensions. To
  learn more, see :wikipedia:`Euclidean <Euclidean_distance>`.  
- ``cosine`` - measures similarity based on the angle between  vectors.
  This value allows you to measure similarity that isn't scaled by
  magnitude.  
- ``dotProduct`` - measures similarity like ``cosine``, but takes into
  account the magnitude of the vector. The output of the embedding models 
  used for Automated Embedding are normalized to unit length. Therefore, 
  ``cosine`` and ``dotProduct`` are identical in measuring similarity. 

The formula for each similarity function is as follows: 

.. tabs::

   .. tab:: Cosine
      :tabid: cosine

      For ``cosine``, {+avs+} uses the following algorithm to normalize
      the score: 

      .. code-block:: shell 
         :copyable: false 

         score = (1 + cosine(v1,v2)) / 2

      - This algorithm normalizes the score by considering the similarity
        score of the document vector (``v1``) and the query vector
        (``v2``), which has the range [``-1``, ``1``]. {+avs+} adds ``1``
        to the similarity score to normalize the score to a range [``0``,
        ``2``] and then divides by ``2`` to ensure a value between ``0``
        and ``1``.

   .. tab:: Dot Product
      :tabid: dotProduct
     
      For ``dotProduct``, {+avs+} uses the following algorithm to normalize
      the score:  

      .. code-block:: shell 
         :copyable: false 

         score = (1 + dotProduct(v1,v2)) / 2

      - This algorithm normalizes the score by considering the similarity score of the 
        document vector (``v1``) and the query vector (``v2``), which has the range 
        [``-1``, ``1``]. {+avs+} adds ``1`` to the similarity score to normalize 
        the score to a range [``0``, ``2``] and then divides by ``2`` to ensure a 
        value between ``0`` and ``1``.

   .. tab:: Euclidean 
      :tabid: euclidean
     
      For ``euclidean`` similarity, {+avs+} uses the following algorithm to
      normalize the score to ensure a value between ``0`` and ``1``: 

      .. code-block:: shell 
         :copyable: false 

         score = 1 / (1 + euclidean(v1,v2))

      - This algorithm normalizes the score by calculating the euclidean distance,
        which is the distance between the document vector (``v1``) and the query 
        vector (``v2``), which has the range [``0``, ``∞``]. {+avs+} then transforms 
        the distance to a similarity score by adding ``1`` to the distance and then 
        divides ``1`` by the result to ensure a value between ``0`` and ``1``.

To get started, we recommend using ``scalar`` quantization and setting 
``fields.similarity`` to the ``dotProduct`` value. ``dotProduct`` consumes 
less computational resources than ``cosine`` and is efficient when vectors 
are of unit length. When using ``binary`` or ``binaryNoRescore`` quantization, 
we recommend using ``euclidean`` similarity.