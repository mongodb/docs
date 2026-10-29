.. Shared cluster-wide concurrency limit across the resharding-based
.. collection operations: moveCollection, reshardCollection, and
.. unshardCollection. See DOCSP-65621. The rewriteCollection command
.. was added in MongoDB 8.3, so it is not listed in this version's
.. copy of this include.

Only one of the following operations can run at a time on the cluster:
:dbcommand:`moveCollection`, :dbcommand:`reshardCollection`, and
:dbcommand:`unshardCollection`.
