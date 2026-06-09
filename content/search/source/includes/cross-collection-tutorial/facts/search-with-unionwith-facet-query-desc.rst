This query uses the following stages:

- :pipeline:`$search` to search for companies that include
  ``mobile`` in the name.
- :pipeline:`$project` stage to:

  - Include only the specified fields in the results.
  - Add a field named ``score``.

- :pipeline:`$addFields` stage to add the following new fields:

  - A new field named ``source`` that identifies the collection of
    the output documents.
  - A field name ``source_count`` that shows a count of the output
    documents.

- :pipeline:`$unionWith` to do the following:

  - Use :pipeline:`$search` stage in the sub-pipeline to search
    for inspections of companies that include ``mobile`` in the
    name.
  - Perform a union of documents from the ``companies`` and
    documents from the ``inspections`` collections.

- :pipeline:`$project` stage to:

  - Include only the specified fields in the results.
  - Add a field named ``score``.

- :pipeline:`$limit` stage to limit the output to ``3`` results
  from each collection.

- :pipeline:`$set` stage to add the following new fields:

  - A new field named ``source`` that identifies the collection of
    the output documents.
  - A new field named ``source_count`` that shows a count of the
    output documents.
