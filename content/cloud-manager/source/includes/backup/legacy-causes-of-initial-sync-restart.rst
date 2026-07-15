.. note:: Conditions or Actions that Restart Initial Sync

   During the initial sync process, certain actions or conditions
   can restart the initial sync process. Avoid the following actions
   and conditions:

   **Actions to Avoid during Initial Sync:**

   - Restarting, shutting down, or changing the version or
     |fcv| value of the source database.
   - :dbcommand:`Renaming the collection <renameCollection>`
     of the source database.
   - Changing the :ref:`$out <agg-out>`
     value in the Aggregation Pipeline of the source database.
   - Restarting or shutting down |application| or Backup Daemon.
   - Restarting, shutting down, or upgrading the
     :doc:`{+mdbagent+} </tutorial/nav/mongodb-agent>`.

   **Conditions to Avoid during Initial Sync:**

   - :term:`Head Directory <head directory>` is full.
   - Network connectivity between Ops Manager components is
     unstable.
