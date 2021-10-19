Use the :query:`$text` query operator to perform text searches on a
collection with a :ref:`text index <index-feature-text>`.

:query:`$text` will tokenize the search string using whitespace and most
punctuation as delimiters, and perform a logical ``OR`` of all such
tokens in the search string.

For example, you could use the following query to find all stores
containing any terms from the list "coffee", "shop", and "java" in 
the ``stores`` :ref:`collection <text-index-eg>`:

.. code-block:: javascript

   db.stores.find( { $text: { $search: "java coffee shop" } } )
