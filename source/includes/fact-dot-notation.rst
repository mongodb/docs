MongoDB uses the *dot notation* to access the elements of an array and
to access the fields of a subdocument.

To access an element of an array by the zero-based index position, you
concatenate the array name with the dot (``.``) and zero-based index
position:

.. code-block:: javascript

   '<array>.<index>'

To access a field of a subdocument with *dot-notation*, you concatenate
the subdocument name with the dot (``.``) and the field name:

.. code-block:: javascript

   '<subdocument>.<field>'
