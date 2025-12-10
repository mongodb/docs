If you are connected to your self-hosted MongoDB deployment, run
:method:`db.getMongo()` method to return the connection string.

If you are not connected to your deployment, you can determine your
connection string based on the connection string format and options you
want to use.

The following replica set connection string includes these elements:

- The hostnames of the :binary:`~bin.mongod` instance(s) as listed in
  the replica set configuration.
- Authentication as user ``myDatabaseUser`` with the password
  ``D1fficultP%40ssw0rd``.
