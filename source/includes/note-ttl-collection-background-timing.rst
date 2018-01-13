.. note::

   TTL indexes expire data by removing documents in a background task
   that runs *every 60 seconds*. As a result, the TTL index provides no
   guarantees that expired documents will not exist in the
   collection. Consider that:

   - Documents may remain in a collection *after* they expire and before
     the background process runs.

   - The duration of the removal operations depend on the workload of
     your :binary:`~bin.mongod` instance.
