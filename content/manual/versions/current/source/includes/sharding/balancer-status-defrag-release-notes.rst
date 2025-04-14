Starting in MongoDB 5.3, the :dbcommand:`balancerCollectionStatus`
command returns detailed information when run on a namespace going
through chunk defragmentation. The output includes the current phase of
the defragmentation and how many chunks are left to process.

To see example output, see
:ref:`balancer-collection-status-defrag-output-command`.
