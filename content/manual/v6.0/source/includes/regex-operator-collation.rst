String matching for |regex-operator| is always case-sensitive and
diacritic-sensitive. |regex-operator| ignores the collation specified
for the collection, :method:`db.collection.aggregate()`, and the index,
if used.

For example, create a collection with collation strength
``1``, meaning the collation only compares base characters and ignores
differences such as case and diacritics:

.. code-block:: javascript

   db.createCollection( "restaurants", { collation: { locale: "fr", strength: 1 } } )

Insert the following documents:

.. code-block:: javascript

   db.restaurants.insertMany( [
      { _id: 1, category: "café", status: "Open" },
      { _id: 2, category: "cafe", status: "open" },
      { _id: 3, category: "cafE", status: "open" }
   ] )

The following uses the collection's collation to perform a
case-insensitive and diacritic-insensitive match:

.. io-code-block::
   :copyable: true

   .. input::
      :language: javascript

      db.restaurants.aggregate( [ { $match: { category: "cafe" } } ] )

   .. output::
      :language: javascript

      [
         { _id: 1, category: 'café', status: 'Open' },
         { _id: 2, category: 'cafe', status: 'open' },
         { _id: 3, category: 'cafE', status: 'open' }
      ]

However, |regex-operator| ignores collation. The following regular
expression pattern matching examples are case-sensitive and diacritic
sensitive:
