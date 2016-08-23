After an unclean shutdown of a :program:`mongod` using the :doc:`Wired Tiger
</core/wiredtiger>` storage engine, |opt| statistics reported by
|cmd| may be inaccurate.

The amount of drift depends on the number of insert, update, or delete
operations performed between the last :ref:`checkpoint
<storage-wiredtiger-checkpoints>` and the unclean shutdown. Checkpoints
usually occur every 60 seconds. However, :program:`mongod` instances running
with non-default :option:`--syncdelay` settings may have more or less frequent
checkpoints.

Run :dbcommand:`validate` on each collection on the :program:`mongod` to
to restore the correct statistics after an unclean shutdown.
