Starting in MongoDB 5.0, for an uncorrelated subquery in a
:pipeline:`$lookup` pipeline stage containing a :pipeline:`$sample`
stage, the :expression:`$sampleRate` operator, or the
:expression:`$rand` operator, the subquery is always run again if
repeated. Previously, depending on the subquery output size, either the
subquery output was cached or the subquery was run again.