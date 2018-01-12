When running :binary:`~bin.mongod` on a
:doc:`replica set </core/replica-set-members>` with the
WiredTiger :doc:`storage engine </core/storage-engines>`, if you
turn off journaling with the :option:`--nojournal <mongod --nojournal>` option, you
should also set the replica set configuration option
:rsconf:`writeConcernMajorityJournalDefault` to ``false``.