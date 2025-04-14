Starting in MongoDB 4.4, :pipeline:`$merge` can output to the same
collection that is being aggregated. You can also output to a
collection which appears in other stages of the pipeline, such as
:pipeline:`$lookup`.

Versions of MongoDB prior to 4.4 did not allow :pipeline:`$merge` to
output to the same collection as the collection being aggregated.
