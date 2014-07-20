Accumulators, available only for the :pipeline:`$group` stage, compute
values by combining documents that share the same group key.
Accumulators take as input a single expression, evaluating the
expression once for each input document, and maintain their state for
the group of documents.
