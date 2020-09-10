Throughout the lifecycle of a backup, {+mdbagent-ba+} tails the
:term:`oplog` of each :term:`replica set` and sends new oplog entries
to |onprem|. The Agent sends the oplog entries in compressed bundles of
approximately 10 MB in size called :term:`oplog slices <oplog slice>`.
These oplog slices are stored in one or more MongoDB databases called
:term:`oplog stores <Oplog Store Database>`. Every |onprem| deployment
needs at least one oplog store.

When you enable backups, |mms| prompts you to create your first oplog
store. This can be a local oplog store or an |s3os|. Once you create
the first oplog store, you manage it separately from your snapshot
stores. You can create additional oplog stores.
