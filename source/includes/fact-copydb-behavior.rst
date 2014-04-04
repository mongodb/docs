Be aware of the following properties of |copydb|:

- |copydb| runs on the destination :program:`mongod`
  instance, i.e. the host receiving the copied data.

- |copydb| creates the target database if it does not exist.

- |copydb| requires enough free disk space on the host
  instance for the copied database. Use the :method:`db.stats()`
  operation to check the size of the database on the source
  :program:`mongod` instance.

- |copydb| and :dbcommand:`clone` do not produce
  point-in-time snapshots of the source database. Write traffic to
  the source or destination database during the copy process will
  result in divergent data sets.

- |copydb| does not lock the destination server during
  its operation, so the copy will occasionally yield to allow other
  operations to complete.
