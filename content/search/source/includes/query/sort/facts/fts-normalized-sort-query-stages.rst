The query specifies a :pipeline:`$limit` stage to limit the documents
in the results to ``5`` and a :pipeline:`$project` stage to do the
following:

- Include only the ``_id``, ``title``, and ``awards`` fields in the
  results.
- Add a field named :ref:`score <scoring-ref>` in the results.
