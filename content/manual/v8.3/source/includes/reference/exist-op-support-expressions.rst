.. note::

   :ref:`Expressions <aggregation-expressions>` do not support 
   the :query:`$exists` operator. To check for the existence of a field in an 
   expression, you can use the :expression:`$type` aggregation
   operator to check if a field has a type of ``missing``.

   For more information, see :ref:`$type Existence Check <missing-type-existence-check>`.