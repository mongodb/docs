- The :pipeline:`$match` stage that includes a :query:`$text` must be
  the **first** stage in the pipeline.

- A :query:`text` operator can only occur once in the stage.

- The :query:`text` operator expression cannot appear in
  :expression:`$or` or :expression:`$not` expressions.

- The text search, by default, does not return the matching documents
  in order of matching scores. Use the :expression:`$meta` aggregation
  expression in the :pipeline:`$sort` stage.
