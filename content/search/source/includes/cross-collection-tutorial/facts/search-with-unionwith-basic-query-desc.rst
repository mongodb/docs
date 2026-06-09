This query uses the following stages:

- :pipeline:`$search` to search for companies that include
  ``mobile`` in the name.
- :pipeline:`$unionWith` to do the following:

  - Use :pipeline:`$search` stage in the sub-pipeline to search
    for inspections of companies that include ``mobile`` in the
    name.
  - Perform a union of documents from the ``companies`` and
    documents from the ``inspections`` collections.

- :pipeline:`$set` stage to add a new field named ``source`` that
  identifies the collection of the output documents.

  - :pipeline:`$limit` stage to limit the output to ``3`` results
    from each collection.

  - :pipeline:`$project` stage to:

    - Include only the specified fields in the results.
    - Add a field named ``score``.
