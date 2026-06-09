.. list-table:: 
   :widths: 20 80 
   :header-rows: 1
   
   * - Factor
     - Description

   * - ``pivot``
     - Value specified as a reference point to make the score equal to
       ``0.5`` if the distance between ``fieldValue`` and ``origin`` is
       equal to it. This defines how quickly the score decays as the
       distance between ``fieldValue`` and ``origin`` grows. For a given
       distance between ``fieldValue`` and ``origin``, if ``pivot``
       decreases, the score also decreases.

   * - ``distance``
     - Absolute distance between ``fieldValue`` and ``origin``. |fts|
       computes this value using the following formula: 
       
       .. code-block:: 
          :copyable: false
          
          abs(fieldValue - origin)
       
       where:

       - ``fieldValue`` is the value of the field that you are querying
         in the document.
       - ``origin`` is the number, date, or geographic point to search
         near.
