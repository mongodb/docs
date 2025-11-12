.. note:: 
   
   Starting in ``mongosync`` 1.7.3, ``mongosync`` can take at least two minutes 
   to respond when you resume or restart a sync operation. During this time, 
   any calls to the :ref:`c2c-api-progress` endpoint might fail. If a 
   ``progress`` call fails, it is safe to retry.
