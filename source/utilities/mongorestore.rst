===========================
mongorestore Utility Manual
===========================

Synopsis
--------

The ``mongorestore`` utility provides the ability to import content
from binary database dump into a specific database. This is the
inverse functionality of :doc:`mongodump <mongodump>`.

Options
-------

.. program:: mongorestore

.. option:: --help

   Returns a basic help and usage text.

.. option:: --verbose, -v

   Increases the amount of internal reporting returned on the command
   line. Increase the verbosity with the ``-v`` form by including
   the option multiple times, (e.g. ``-vvvvv``.)

.. option:: --version

   Returns the version of the ``mongorestore`` utility.

.. option:: --host <hostname><:port>

   Specifies a resolvable hostname for the ``mongod`` to which you
   want to restore the database. By default ``mongorestore`` will
   attempt to connect to a MongoDB process ruining on the localhost
   port number 27017.

   Optionally, specify a port number to connect a MongboDB instance
   running on a port other than 27017.

   To connect to a replica set, use the ``--host`` argument with a
   setname, followed by a slash and a comma separated list of host and
   port names. The ``mongo`` utility will, given the seed of at least
   one connected set member, connect to primary node of that set. this
   option would resemble: ::

        --host repl0 mongo0.example.net,mongo0.example.net,27018,mongo1.example.net,mongo2.example.net

   You can always connect directly to a single MongoDB instance by
   specifying the host and port number directly.

.. option:: --port <port>

   Specifies the port number, if the MongoDB instance is not running on
   the standard port. (i.e. ``27017``) You may also specify a port
   number using the :command:`mongorestore --host` command.

.. option:: --ipv6

   Enables IPv6 support to allow ``mongorestore`` to connect to the
   MongoDB instance using IPv6 connectivity. IPv6 support is disabled
   by default in the ``mongorestore`` utility.

.. option:: --username <username>, -u <username>

   Specifies a username to authenticate to the MongoDB instance, if your
   database requires authentication. Use in conjunction with the
   :option:`mongorestore --password` option to supply a password.

.. option:: --password [password]

   Specifies a password to authenticate to the MongoDB instance. Use
   in conjunction with the :option:`mongorestore --username` option to
   supply a username.

.. option:: --dbpath [path]

   Specifies the directory of the MongoDB data files. If used, the
   ``--dbpath`` option enables ``mongorestore`` to attach directly to
   local data files and insert the data without the ``mongod``. To run
   with ``--dbpath``, ``mongorestore`` needs to lock access to the
   data directory: as a result, no ``mongod`` can access the same
   path while the process runs.

.. option:: --directoryperdb

   The ``--directoryperdb`` controls the operation of ``mongorestore``
   to mirror the operation of the ":command:`mongodump
   --directoryperdb``" command which places the contents of only one
   database in a single directory. Use only in conjunction with the
   :command:`mongorestore --dbpath`` option.

.. option:: --journal

   Enables journaling for all ``mongorestore`` operations.

.. option:: --db [db], -d [db]

   Use the ``--db`` option to specify a database for ``mongorestore``
   to restore data. If you do not specify a "``[db]``", new databases will be
   created corresponding to the databases where the data originated
   and data may be overwritten. Use this option to restore data into a
   MongoDB instance that already has data, or to restore only some
   data in the specified backup.

TODO factcheck

.. option:: --collection [collection], -c [collection]

   Use the ``--collection`` option to specify a collection for
   ``mongorestore`` to restore. If you do not specify a
   "``[collection]``", all collections will be restored or created and
   data may be overwritten. Use this option to restore data into a
   MongoDB instance that already has data, or to restore only some
   data in the specified backup.

TODO factcheck

TODO help section says "(some commands)" limitations otherwise unclear.

.. option:: --objcheck

   Forces ``mongorestore`` to validate every object before inserting
   it in the target database.

.. option:: --filter '<JSON>'

   Limits the documents that ``mongorestore`` imports to only those
   documents that match the JSON document specified as
   ``'<JSON>'``. Be sure to include the document in single quotes to
   avoid a poor interaction with your shell.

.. option:: --drop

   Modifies the restoration procedure so that every collection is
   dropped from the target database before restoring the collection
   from the dumped backup.

.. option:: --oplogReplay

   Replays the oplog to create to ensure that the current state of
   the database reflects the point-in-time backup captured with the
   ":command:`mongodump --oplog`" command.

.. option:: --keepIndexVersion

   Prevents ``mongorestore`` from upgrading the index to the latest
   version durring the restoration process.

.. option::  [path]

   The final argument of the ``mongorestore`` command is a directory
   path that specifies the location of the database dump from which to
   restore.

Usage
-----

See the ":ref:`backup guide section on database dumps
<database-dumps>`" for a larger overview of ``mongorestore``
usage. Also see the ":doc:`mongodump`" document for an overview of the
:command:`mongodump`, which provides the related inverse
functionality.

In the following command, the collection named "``collection``" and
the database named "``test``" in the instance running on the localhost
interface on port 27017 is restored with the dump located in the
"``dump/``" directory. ::

     mongorestore --collection collection --database test

In the next example, ``mongorestore`` restores a backup of the
database instance located in "``dump``" to a database instance stored
in the ``/srv/mongodb`` on the local machine. This requires that no
``mongod`` instance is connected to the ``/srv/mongodb`` directory. ::

     mongorestore --dbpath /srv/mongodb

In the final example, ``mongodrestore`` restores a database dump
located at ``/opt/backup/mongodumpm-2011-10-24``, from a database
running on port "``37017``" on the host "``mongodb1.example.net`` and
authenticating using the username "``user``" and the password
"``pass``", as follows: ::

     mongorestore --host mongodb1.example.net --port 37017 --username user --password pass /opt/backup/mongodumpm-2011-10-24
