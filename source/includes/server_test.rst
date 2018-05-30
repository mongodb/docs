title: "Shut down the secondary member."
ref: change-wt-repl-sync-shutdown-secondary
pre: |
  In the :binary:`~bin.mongo` shell, shut down the secondary :binary:`~bin.mongod`
  instance you wish to upgrade.
action:
  language: sh
  code: |
    db.shutdownServer()
---
title: "Prepare a data directory for the new ``mongod`` running with WiredTiger."
ref: change-wt-repl-sync-wiredtiger-dir
pre: |
  Prepare a data directory for the new :binary:`~bin.mongod` instance that
  will run with the WiredTiger storage engine. ``mongod`` must have read
  and write permissions for this directory. You can either delete the
  contents of the stopped secondary member's current data directory or
  create a new directory entirely.

  ``mongod`` with WiredTiger will not start with data files created with
  a different storage engine.
---
title: "Start ``mongod`` with WiredTiger."
ref: change-wt-repl-sync-start-mongod-w-wiredtiger
pre: |
   Start :binary:`~bin.mongod`, specifying ``wiredTiger`` as the
   :option:`--storageEngine <mongod --storageEngine>` and the prepared data directory for
   WiredTiger as the :option:`--dbpath <mongod --dbpath>`. Specify additional options,
   such as :option:`--bind_ip <mongod --bind_ip>`, as appropriate for this replica set
   member.

   .. include:: /includes/warning-bind-ip-security-considerations.rst

action:
  language: sh
  code: |
    mongod --storageEngine wiredTiger --dbpath <newWiredTigerDBPath> --replSet <replSetName> --bind_ip localhost,<ipaddresses>
post: |
  Since no data exists in the ``--dbpath``, the ``mongod`` will perform an
  :doc:`initial sync </tutorial/resync-replica-set-member>`. The length of the
  initial sync process depends on the size of the database and network
  connection between members of the replica set.

  .. include:: /includes/fact-storage-engine-configuration-file-setting.rst
---
title: "Repeat the procedure for other replica set secondaries you wish to upgrade."
ref: change-wt-repl-sync-repeat
pre: |
  Perform this procedure again for the rest of the :term:`secondary
  members <secondary>` of the replica set you wish to use the WiredTiger
  storage engine.
...
