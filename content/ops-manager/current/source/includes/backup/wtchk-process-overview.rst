The backup process takes a snapshot of the data directory at its
:ref:`scheduled snapshot intervals <edit-snapshot-schedule>`. This
process copies the data files in a MongoDB deployment, sending them
over the network through |onprem| to your existing snapshot storage. Your
deployment can still handle read and write operations during the
copying process.

The backup process works in this manner regardless of how snapshots are
stored.

.. note::

   The Backup process no longer uses initial syncs. Without initial
   syncs, |onprem| supports a wider array of customers, such as those
   that heavily use
   :manual:`renameCollection </reference/command/renameCollection>`.

