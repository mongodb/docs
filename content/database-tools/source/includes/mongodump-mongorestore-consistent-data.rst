To create a consistent ``mongodump`` backup file using :term:`oplog`
entries, use the :option:`mongodump --oplog` option. To restore data
from the backup file, use the :option:`mongorestore --oplogReplay`
option.

The :term:`oplog` contains the history of database write operations.

``mongodump`` outputs:

- Collection documents, metadata, and options.
- Index definitions.
- Writes that occur during the ``mongodump`` run, if ``--oplog`` is
  specified.

Use mongodump with oplog Option
```````````````````````````````

``mongodump --oplog`` creates a file named :file:`oplog.bson` in the top
level of the ``mongodump`` output directory. The file contains write
operations that occur during the ``mongodump`` run. Writes that occur
after ``mongodump`` completes aren't recorded in the file.

To back up sharded clusters with ``mongodump``, see
:ref:`backup-sharded-dumps`.

Use mongorestore with oplogReplay Option
````````````````````````````````````````

To restore oplog entries from the ``oplog.bson`` file, use
``mongorestore --oplogReplay``. Use ``mongodump --oplog`` together with
``mongorestore --oplogReplay`` to ensure the database is current and has
all writes that occurred during the ``mongodump`` run.
