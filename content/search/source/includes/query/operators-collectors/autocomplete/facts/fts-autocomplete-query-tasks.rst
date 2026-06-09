- Imports ``mongodb`` packages and dependencies.
- Establishes a connection to your cluster.
- Uses the following pipeline stages:

  .. include:: /includes/query/operators-collectors/autocomplete/facts/fts-autocomplete-stages.rst

- Iterates over the cursor to print the documents that match the
  query.
