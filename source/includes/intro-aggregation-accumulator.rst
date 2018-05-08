Available for use in the :pipeline:`$group` stage, accumulators are
operators that maintain their state (e.g. totals, maximums, minimums,
and related data) as documents progress through the pipeline.

When used as accumulators in the :pipeline:`$group` stage, these
operators take as input a single expression, evaluating the expression
once for each input document, and maintain their stage for the group of
documents that share the same group key.

