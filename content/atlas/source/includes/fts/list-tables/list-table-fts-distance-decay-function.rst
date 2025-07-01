.. list-table:: 
   :widths: 10 90 
   :stub-columns: 1
   
   * - ``origin`` 
     - Value to search near. This is the origin point from which the
       proximity of the results are measured. 

   * - ``fieldValue`` 
     - Value of the field that you are querying in the document. The
       closer the ``fieldValue`` is to ``origin``, the higher the score
       of the near query.

   * - ``pivot``
     - Value specified as a reference point to make the score equal to
       ``0.5`` if the distance between ``fieldValue`` and ``origin`` is
       equal to it. This defines how quickly the score decays as the
       distance between ``fieldValue`` and ``origin`` grows. For a given
       distance between ``fieldValue`` and ``origin``, if ``pivot``
       decreases, the score also decreases.
