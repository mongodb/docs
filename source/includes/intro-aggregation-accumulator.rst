.. versionchanged:: 3.2

   Some accumulators are now available in the :pipeline:`$project`
   stage. In previous versions of MongoDB , accumulators are available
   only for the :pipeline:`$group` stage.

Accumulators, when used in the :pipeline:`$group` stage, maintain their
state (e.g. totals, maximums, minimums, and related data) as documents
progress through the pipeline.

When used in the :pipeline:`$group` stage, accumulators take as input a
single expression, evaluating the expression once for each input
document, and maintain their stage for the group of documents that
share the same group key.

When used in the :pipeline:`$project` stage, the accumulators do not
maintain their state. When used in the :pipeline:`$project` stage,
accumulators take as input either a single argument or multiple
arguments.
