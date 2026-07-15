If the collection has an index that includes the sort fields, MongoDB
can use that index to obtain the results of a sort operation. In
:query:`$or` queries, MongoDB may use multiple indexes to support a
single sort operation, because each clause of the ``$or`` expression can
use its own index.
