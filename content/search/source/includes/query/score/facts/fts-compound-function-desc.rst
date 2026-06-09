- ``must`` clause with the :ref:`range <range-ref>` operator to search
  for movies between the years ``2013`` to ``2015``.
- ``should`` clause with the :ref:`text <text-ref>` operator to query
  for the term ``snow`` in the ``title`` field and alter the
  ``score`` with the ``function`` option. The ``function`` option
  adds the following using an arithmetic expression:

  - The relevance score of the query for the search term
  - The value of the numeric field named ``imdb.rating`` or the
    number ``2`` for those documents that do not have the
    ``imdb.rating`` field.
