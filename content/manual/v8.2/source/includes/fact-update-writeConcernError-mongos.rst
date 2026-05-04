.. versionchanged:: 8.1.2

When |cmd| executes on :program:`mongos` in a sharded cluster, a ``writeConcernError`` is 
always reported in the response, even when one or more other errors occur. 
In previous releases, other errors sometimes caused |cmd| to not report write concern errors.

For example, if a document fails validation, triggering a ``DocumentValidationFailed`` error,
and a write concern error also occurs, both the ``DocumentValidationFailed`` error and the 
``writeConcernError`` are returned in the top-level field of the response.