The TTL index does not guarantee that expired data will be deleted
immediately. There may be a delay between the time a document expires
and the time that MongoDB removes the document from the database.

The background task that removes expired documents runs *every 60
seconds*. As a result, documents may remain in a collection *after*
they expire but *before* the background task runs or completes.

The duration of the removal operation depends on the workload of
your :program:`mongod` instance. Therefore, expired data may exist
for some time *beyond* the 60 second period between runs of the
background task.
