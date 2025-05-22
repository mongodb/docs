After an unclean shutdown of a :binary:`~bin.mongod` using the :doc:`Wired Tiger
</core/wiredtiger>` storage engine, |opt| statistics reported by
|cmd| may be inaccurate.

The amount of drift depends on the number of insert, update, or delete
operations performed between the last :ref:`checkpoint
<storage-wiredtiger-checkpoints>` and the unclean shutdown. Checkpoints
usually occur every 60 seconds. However, :binary:`~bin.mongod` instances running
with non-default :option:`--syncdelay <mongod --syncdelay>` settings may have more or less frequent
checkpoints.

Run :dbcommand:`validate` on each collection on the :binary:`~bin.mongod`
to restore the correct statistics after an unclean shutdown.
