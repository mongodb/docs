To force :binary:`~bin.mongod` to commit to the journal more frequently,
you can specify ``j:true``. When a write operation with ``j:true``
is pending, :binary:`~bin.mongod` will reduce
:setting:`journalCommitInterval` to a third of the set value.
