The following example appends each element of ``[ 90, 92, 85 ]`` to
the ``scores`` array for the document where the ``name`` field
equals ``joe``:

.. code-block:: javascript

   db.students.update(
      { name: "joe" },
      { $push: { scores: { $each: [ 90, 92, 85 ] } } }
   )
