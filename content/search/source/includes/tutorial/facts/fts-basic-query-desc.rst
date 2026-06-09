This query has the following search criteria:

- The ``plot`` field must contain the word ``baseball``.

- :pipeline:`$limit` and
  :pipeline:`$project` stages
  to return only 3 documents and the ``title`` and ``plot`` fields.
