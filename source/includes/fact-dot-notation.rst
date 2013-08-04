MongoDB uses the *dot notation* to access the elements of an array and
to access the fields of a subdocument.

For example, to access an element of an array by the index position,
you concatenate the array name with the dot (``.``) and zero-based
index position and enclose in quotes:

.. code-block:: javascript

   '<array>.<index>'

To access a field of a subdocument with *dot-notation*, you concatenate
the subdocument name with the dot (``.``) and the field name and
enclose in quotes:

.. code-block:: javascript

   '<subdocument>.<field>'
