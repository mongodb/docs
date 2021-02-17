When using :binary:`~bin.mongorestore` to load data files created by
:binary:`~bin.mongodump`, be sure that you are restoring to the *same
major version* of the MongoDB Server that the files were created from.
For example, if your dump was created from a MongoDB Server running
version ``4.4.x``, be sure that the MongoDB Server you are restoring to
is also running version ``4.4.x``.

In addition, ensure that you are using the same version of 
:binary:`~bin.mongorestore` to load the data files as the version of
:binary:`~bin.mongodump` that you used to create them. For example, if
you used :binary:`~bin.mongodump` version ``{+release+}`` to create the
dump, use :binary:`~bin.mongorestore` version ``{+release+}`` to restore
it.
