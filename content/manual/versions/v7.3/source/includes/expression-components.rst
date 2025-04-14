In the MongoDB Query Language, you can build expressions from the
following components:

.. list-table::
   :header-rows: 1
   :widths: 10 10

   * - Component
     - Example
   * - Constants
     - ``3``
   * - Operators
     - :expression:`$add`
   * - Field path expressions
     - ``"$<path.to.field>"``

For example, ``{ $add: [ 3, "$inventory.total" ] }`` is an expression
consisting of the ``$add`` operator and two input expressions:

- The constant ``3``
- The :ref:`field path expression <agg-quick-ref-field-paths>`
  ``"$inventory.total"``

The expression returns the result of adding 3 to the value at path
``inventory.total`` of the input document.
