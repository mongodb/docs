Operator expressions are similar to functions that take arguments.
In general, these expressions take an array of arguments
and have the following form:

.. code-block:: javascript

   { <operator>: [ <argument1>, <argument2> ... ] }

If operator accepts a single argument, you can omit the outer array
designating the argument list:

.. code-block:: javascript

   { <operator>: <argument> }

To avoid parsing ambiguity if the argument is a literal array, you must
wrap the literal array in a :expression:`$literal` expression or keep
the outer array that designates the argument list.
