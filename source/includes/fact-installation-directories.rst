The MongoDB instance stores its data files in |mongod-datadir|
and its log files in ``/var/log/mongodb`` by default,
and runs using the |mongod-user|
user account. You can specify alternate log and data file
directories in ``/etc/mongod.conf``. See :setting:`systemLog.path`
and :setting:`storage.dbPath` for additional information.

If you change the user that runs the MongoDB process, you
**must** modify the access control rights to the |mongod-datadir| and
``/var/log/mongodb`` directories to give this user access to these
directories.
