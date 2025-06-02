Starting in version 4.4, :binary:`~bin.mongod` / :binary:`~bin.mongos`
logs a warning on connection if the presented X.509 certificate expires
within ``30`` days of the ``mongod/mongos`` host system time.
