Because :dbcommand:`currentOp` command and
:method:`db.currentOp()` helper returns the results in a single
document, the total size of the :dbcommand:`currentOp` result set
is subject to the maximum 16MB BSON size limit for documents.

Starting in version 3.6, MongoDB provides :pipeline:`$currentOp`
aggregation stage. The :pipeline:`$currentOp` stage returns a
cursor over a stream of documents, each of which reports a single
operation. Each operation document is subject to the 16MB BSON
limit, but unlike the :dbcommand:`currentOp` command, there is no
limit on the overall size of the result set.

For this reason, the :pipeline:`$currentOp` aggregation stage is
preferred over the :dbcommand:`currentOp` command and its
:binary:`~bin.mongosh` helper :method:`db.currentOp()`.