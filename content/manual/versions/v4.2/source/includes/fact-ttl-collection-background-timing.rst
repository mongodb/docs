The TTL index does not guarantee that expired data will be deleted
immediately upon expiration. There may be a delay between the time that a
document expires and the time that MongoDB removes the document from
the database.

The background task that removes expired documents runs *every 60
seconds*. As a result, documents may remain in a collection during the
period between the expiration of the document and the running of the
background task. MongoDB starts deleting documents 0 to 60 seconds after
the index completes.

Because the duration of the removal operation depends on the workload
of your :binary:`~bin.mongod` instance, expired data may exist for some
time *beyond* the 60 second period between runs of the background task.
