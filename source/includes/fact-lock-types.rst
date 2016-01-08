- ``Global`` represents global lock.

- ``MMAPV1Journal`` represents MMAPv1 storage engine specific lock
  to synchronize journal writes; for non-MMAPv1 storage engines, the
  mode for ``MMAPV1Journal`` is empty.

- ``Database`` represents database lock.

- ``Collection`` represents collection lock.

- ``Metadata`` represents metadata lock.

- ``oplog`` represents lock on the :term:`oplog`.
