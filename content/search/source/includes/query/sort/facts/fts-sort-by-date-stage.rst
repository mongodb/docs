The query uses the following pipeline stages:

- :pipeline:`$search` stage to search the ``title`` and ``released``
  fields and then sort the results by the ``released`` field in
  descending order.
- :pipeline:`$limit` stage to limit the output to ``5`` results.
- :pipeline:`$project` stage to:

  - Exclude all fields except ``title`` and ``released``.
  - Add a field named ``score``.
