If the :parameter:`initialSyncMethod` parameter for the cluster is
``fileCopyBased``, then there is no impact on change stream listeners.

If ``initialSyncMethod`` is ``logical`` and a change stream is opened on
a newly synchronized node and reads events from a point in time earlier
than the completion of the logical initial sync, the pre- and
post-images may be missing.
