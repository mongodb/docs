The backup process takes a snapshot of the data directory at its
:ref:`scheduled snapshot intervals <edit-snapshot-schedule>`. This
process copies the data files in a MongoDB deployment, sending them
over the network via |onprem| to your existing snapshot storage. Your
deployment can still handle read and write operations during the
copying process.

With the new Backup process, there are no longer initial syncs. As a
result of not having initial syncs, |onprem| can support a wider
array of customers such as those heavily using
:manual:`renameCollection </reference/command/renameCollection>`.

