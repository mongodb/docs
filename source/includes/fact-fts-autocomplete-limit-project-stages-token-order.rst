Each query includes a:

- :pipeline:`$limit` stage to limit the output to 4 results.
- :pipeline:`$project` stage to exclude all fields except ``title``.
