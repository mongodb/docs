In a ``$group`` stage, |operatorName| is an accumulator and calculates
a value for all documents in the window. 

In a ``$project`` stage, |operatorName| is an aggregation expression and
calculates values for each document.

In ``$setWindowFields`` stages, |operatorName| returns a result
for each document like an aggregation expression, but the results are
computed over groups of documents like an accumulator.
