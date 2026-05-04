String matching for |replace-operator| expressions is always case-sensitive
and diacritic-sensitive. Any :ref:`collation <collation>` configured is
ignored when performing string comparisons with |replace-operator|.

For example, create a sample collection with collation strength ``1``:

.. code-block:: javascript

   db.createCollection( "restaurants", { collation: { locale: "fr", strength: 1 } } )

A collation strength of ``1`` compares base character only and ignores
other differences such as case and diacritics.

Next, insert example documents:

.. code-block:: javascript

   db.restaurants.insertMany( [
      { _id: 1, name: "cafe" },
      { _id: 2, name: "Cafe" },
      { _id: 3, name: "café" }
   ] )
