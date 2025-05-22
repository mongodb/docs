To define variables that you can access elsewhere in the command, use
the ``let`` option.

.. note::

   To filter results using a variable in a pipeline :pipeline:`$match`
   stage, you must access the variable within the :query:`$expr`
   operator.