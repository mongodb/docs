- :pipeline:`$search` to search the ``title`` and ``plot`` fields
  using the ``autocomplete`` operator for words that begin with the
  characters ``pri``
- :pipeline:`$limit` stage to
  limit the output to 5 results
- :pipeline:`$project` stage
  to exclude all fields except ``title`` and ``plot``
