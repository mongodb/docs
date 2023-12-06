The backup process takes a snapshot of the data directory at its
:ref:`scheduled snapshot intervals <edit-snapshot-schedule>`.

This process copies the data files in a MongoDB deployment, sending
them over the network via |mms| to your existing snapshot storage.

Your deployment can still handle read and write operations during the
copying process.

With the new backup process, there are no longer initial syncs. As a
result of not having initial syncs, |mms| (using a |mongod| running
|fcv-link| 4.2) can support a wider array of customers such as those
heavily using :dbcommand:`renameCollection`.

