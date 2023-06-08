You can use |operatorName| in:

- :pipeline:`$group <$group>` stages as an accumulator 
- :pipeline:`$setWindowFields` stages as an accumulator
- :pipeline:`$project <$project>` stages as an aggregation expression

|operatorName| has the following characteristics as an accumulator, it:

- Calculates a single result for all the documents in the stage.
- Uses the `t-digest <https://arxiv.org/abs/1902.04023>`__ algorithm to
  calculate approximate, percentile based metrics.
- Uses approximate methods to scale to large volumes of data.

|operatorName| has the following characteristics as an aggregation
expression, it:

- Accepts an array as input
- Calculates a separate result for each input document

