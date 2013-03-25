.. eval-param-function

A JavaScript function.

The function need not take any arguments, as in the first example,
or may take arguments as in the second:

.. code-block:: javascript

   function () {
     // ...
   }

.. code-block:: javascript

   function (arg1, arg2) {
      // ...
   }

.. eval-param-argument

|list| of corresponding arguments to pass to the specified
JavaScript function if the function accepts arguments. Omit if the
function does not take arguments.

.. eval-param-nolock

Optional.

.. |object| replace:: :dbcommand:`eval`
.. |nolockobject| replace:: :dbcommand:`eval` command
.. include:: /includes/fact-eval-lock.rst
