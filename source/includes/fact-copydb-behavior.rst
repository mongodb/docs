Be aware of the following properties of |copydb|:

- |copydb| runs on the destination :binary:`~bin.mongod`
  instance, i.e. the host receiving the copied data.

- If the destination :binary:`~bin.mongod` has
  :setting:`~security.authorization`
  enabled, |copydb| *must* specify the credentials of a user present
  in the *source* database who has the privileges described in
  :ref:`copyDatabases-requiredAccess`.

- |copydb| creates the target database if it does not exist.

- |copydb| requires enough free disk space on the host
  instance for the copied database. Use the :method:`db.stats()`
  operation to check the size of the database on the source
  :binary:`~bin.mongod` instance.

- |copydb| and :dbcommand:`clone` do not produce
  point-in-time snapshots of the source database. Write traffic to
  the source or destination database during the copy process will
  result in divergent data sets.

- |copydb| does not lock the destination server during
  its operation, so the copy will occasionally yield to allow other
  operations to complete.
