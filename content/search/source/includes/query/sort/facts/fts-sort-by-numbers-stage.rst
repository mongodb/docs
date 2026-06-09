The query uses the following pipeline stages:

- :pipeline:`$search` stage to search the ``awards.wins`` field and
  sort the results in descending order.
- :pipeline:`$limit` stage to limit the output to ``5`` results.
- :pipeline:`$project` stage to exclude all fields except ``title``
  and ``awards.wins``.
