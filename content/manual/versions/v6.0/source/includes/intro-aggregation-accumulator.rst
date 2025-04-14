Aggregation accumulator operators:

- Maintain their state as documents progress through the aggregation
  pipeline.

- Return totals, maxima, minima, and other values.

- Can be used in these aggregation pipeline stages:

  - :pipeline:`$bucket`

  - :pipeline:`$bucketAuto`

  - :pipeline:`$group`

  - :pipeline:`$setWindowFields` starting in MongoDB 5.0 (except when
    you are using the :group:`$accumulator` or
    :expression:`$mergeObjects` operators, which cannot be used with
    :pipeline:`$setWindowFields`)