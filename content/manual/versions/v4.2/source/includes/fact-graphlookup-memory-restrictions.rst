The :pipeline:`$graphLookup` stage must stay within the 100 MiB memory
limit. If ``allowDiskUse: true`` is specified for the
:method:`~db.collection.aggregate()` operation, the
:pipeline:`$graphLookup` stage ignores the option. If there are other
stages that observe ``allowDiskUse: true`` in the
:method:`~db.collection.aggregate()` operation, ``allowDiskUse: true``
option is in effect for these other stages.
