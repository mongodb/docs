- :pipeline:`$search` to search the ``title`` field using the
  ``autocomplete`` operator for words that begin with the characters
  ``ger``
- :pipeline:`$limit` stage to
  limit the output to 20 results
- :pipeline:`$project` stage
  to exclude all fields except ``title``
