This query has the following search criteria:

- The ``plot`` field must contain the word ``baseball``.
- The ``genres`` field must not contain either ``Comedy`` or
  ``Romance``.
- :pipeline:`$limit` and
  :pipeline:`$project` stages
  to return only 3 documents and the ``title``, ``plot``, and
  ``genres`` fields.
