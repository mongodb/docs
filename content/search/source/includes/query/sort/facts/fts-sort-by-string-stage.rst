The query uses the following pipeline stages:

- :pipeline:`$search` to search the ``title`` field
  using the ``should`` clause with the :ref:`wildcard <wildcard-ref>` operator to
  search for titles that begin with ``Prance`` and ``Prince``.
  The query also specifies that results must be sorted by the ``title``
  field in ascending order.
- :pipeline:`$limit` stage to limit the output to ``5`` results.
- :pipeline:`$project` stage to:

  - Exclude all fields except ``title``.
  - Add a field named ``score``.
