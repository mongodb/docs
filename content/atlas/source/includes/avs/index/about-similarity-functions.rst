{+avs+} supports the following similarity functions: 

- ``euclidean`` - measures the distance between ends of vectors. This
  value allows you to measure similarity based on varying dimensions. To
  learn more, see :wikipedia:`Euclidean <Euclidean_distance>`.  
- ``cosine`` - measures similarity based on the angle between  vectors.
  This value allows you to measure similarity that isn't scaled by
  magnitude. You can't use zero magnitude vectors with ``cosine``. To
  measure cosine similarity, we recommend that you normalize your
  vectors and use ``dotProduct`` instead.  
- ``dotProduct`` - measures similarity like ``cosine``, but takes into
  account the magnitude of the vector. If you normalize the magnitude,
  ``cosine`` and ``dotProduct`` are almost identical in measuring
  similarity.   
         
  To use ``dotProduct``, you must normalize the vector to unit length at
  index-time and query-time.  

The following table shows the similarity functions for the various types:

.. list-table:: 
   :widths: 25 25 25 25 
   :header-rows: 1 

   * - Vector Embeddings Type
     - ``euclidean``
     - ``cosine``  
     - ``dotProduct``

   * - ``binData(int1)`` :icon-fa5:`star`
     - √
     - 
     - 

   * - ``binData(int8)`` :icon-fa5:`star`
     - √
     - √
     - √

   * - ``binData(float32)`` :icon-fa5:`asterisk`
     - √
     - √
     - √

   * - ``array(float32)`` :icon-fa5:`asterisk`
     - √
     - √
     - √

:icon-fa5:`star` For vector ingestion.

:icon-fa5:`asterisk` For automatic scalar or binary quantization.

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

For best performance, check your embedding model to determine which
similarity function aligns with your embedding model's training
process. If you don't have any guidance, start with ``dotProduct``.
Setting ``fields.similarity`` to the ``dotProduct`` value allows you
to efficiently measure similarity based on both angle and magnitude.
``dotProduct`` consumes less computational resources than ``cosine``
and is efficient when vectors are of unit length. However, if your
vectors aren't normalized, evaluate the similarity scores in the
results of a sample query for ``euclidean`` distance and ``cosine``
similarity to determine which corresponds to reasonable results. 