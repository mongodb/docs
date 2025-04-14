Specifies a document with a list of variables. This allows you to
improve command readability by separating the variables from the query
text.

The document syntax is:

.. code-block:: javascript
   :copyable: false

   { <variable_name_1>: <expression_1>,
     ...,
     <variable_name_n>: <expression_n> }
  
The variable is set to the value returned by the expression, and cannot
be changed afterwards.

To access the value of a variable in the command, use the double
dollar sign prefix (``$$``) together with your variable name in the form
``$$<variable_name>``. For example: ``$$targetTotal``.