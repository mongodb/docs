The ``vectorTracing`` array contains list of objects, one per
document, which has the following details about the vectors in the
document:  

.. list-table:: 
   :header-rows: 1
   :widths: 15 15 10 60

   * - Field 
     - Type 
     - Necessity 
     - Purpose

   * - ``visited``
     - Boolean
     - Required 
     - Flag that specifies whether the traced vector was visited
       during query execution.

   * - ``dropReason``
     - String
     - Conditional
     - Reason for dropping the vector. This is present only if vector
       was visited and dropped from the results. Value can be:

       - ``Merge``
       - ``NonCompetitiveScore``
       - ``Filter``
       - ``Rescoring``

   * - ``vectorSearchScore``
     - Double
     - Conditional
     - Score associated with the vector. This is present only if vector
       was visited

   * - ``luceneSegment``
     - Integer
     - Required
     - Lucene segment number to which the vector belongs. To learn
       more, see :ref:`avs-explain-lucene-vector-segment-stats`.

   * - ``unreachable``
     - Boolean
     - Conditional
     - Flag that specifies whether the vector is unreachable. This is
       present only if the vector is unreachable.
