MongoDB uses the *dot notation* to access the elements of an array and
to access the fields of an embedded document.

To access an element of an array by the zero-based index position,
concatenate the array name with the dot (``.``) and zero-based index
position, and enclose in quotes:

.. code-block:: javascript

   '<array>.<index>'

See also :update:`$` positional operator for update operations and
:projection:`$` projection operator when array index position is unknown.

To access a field of an embedded document with *dot-notation*, concatenate the
embedded document name with the dot (``.``) and the field name, and enclose
in quotes:

.. code-block:: javascript

   '<embedded document>.<field>'
