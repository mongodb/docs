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
to restore statistics after an unclean shutdown.

After an unclean shutdown:

- :dbcommand:`validate` updates the :ref:`count statistic
  <collstat-count>` in the :dbcommand:`collStats` :ref:`output
  <collStats-output>` with the latest value.

- Other statistics like the number of documents inserted or removed in
  the :dbcommand:`collStats` :ref:`output <collStats-output>` are
  estimates.
