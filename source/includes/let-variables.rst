Specifies a document with a list of variables and values that can be
used elsewhere in the command. This supports tasks that could otherwise
only be performed using the :dbcommand:`mapReduce` command, and reduces
the risk of MQL injection attacks. The document syntax is:

.. code-block:: javascript
   :copyable: false

   { <variable_1>: <value_1>,
     ...,
     <variable_n>: <value_n> }
  
For example: ``{ targetTotal: 3000 }``

To view the variable naming convention, see :ref:`agg-user-variables`.

To access a variable elsewhere in the command, use the double dollar
sign prefix (``$$``) together with your variable name in the form
``$$<variablename>``. For example: ``$$targetTotal``

.. versionadded:: 5.0