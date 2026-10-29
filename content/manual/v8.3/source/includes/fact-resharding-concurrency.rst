.. Shared cluster-wide concurrency limit across the resharding-based
.. collection operations: moveCollection, reshardCollection,
.. rewriteCollection, and unshardCollection. See DOCSP-65621.

Only one of the following operations can run at a time on the cluster:
:dbcommand:`moveCollection`, :dbcommand:`reshardCollection`,
:dbcommand:`rewriteCollection`, and :dbcommand:`unshardCollection`.
