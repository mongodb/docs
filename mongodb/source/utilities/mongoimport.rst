==========================
mongoimport Utility Manual
==========================

Synopsis
--------

The ``mongoimport`` utility provides a route to import content from a
JSON, CSV, or TSV export created by :command:`mongoexport`, or
potentially, another third-party export tool. See the
":doc:`/administration/import-export`" document for a more in depth
usage overview, and the ":doc:`mongoexport`" document for more
information regarding the :command:`mongoexport` utility, which
provides the inverse "importing" capability.

.. note::

   ``mongoimport`` and ``mongoexport`` should not be used for
   full-scale backups because they may not reliably capture data type
   information. Use :command:`mongodump` and :command:`mongorestore``
   as described in ":doc:`/administration/backups`" for this kind of
   functionality.

Options
-------

.. program:: mongoimport

.. option:: --help

   Returns a basic help and usage text.

.. option:: --verbose, -v

   Increases the amount of internal reporting returned on the command
   line. Increase the verbosity with the ``-v`` form by including
   the option multiple times, (e.g. ``-vvvvv``.)

.. option:: --version

   Returns the version of the ``mongoimport`` utility.

.. option:: --host <hostname><:port>

   Specifies a resolvable hostname for the ``mongod`` to which you
   want to restore the database. By default ``mongoimport`` will
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
   number using the :command:`mongoimport --host` command.

.. option:: --ipv6

   Enables IPv6 support to allow ``mongoimport`` to connect to the
   MongoDB instance using IPv6 connectivity. IPv6 support is disabled
   by default in the ``mongoimport`` utility.

.. option:: --username <username>, -u <username>

   Specifies a username to authenticate to the MongoDB instance, if your
   database requires authentication. Use in conjunction with the
   :option:`mongoimport --password` option to supply a password.

.. option:: --password [password]

   Specifies a password to authenticate to the MongoDB instance. Use
   in conjunction with the :option:`mongoimport --username` option to
   supply a username.

.. option:: --dbpath [path]

   Specifies the directory of the MongoDB data files. If used, the
   ``--dbpath`` option enables ``mongoimport`` to attach directly to
   local data files and insert the data without the ``mongod``. To run
   with ``--dbpath``, ``mongorestore`` needs to lock access to the
   data directory: as a result, no ``mongod`` can access the same
   path while the process runs.

.. option:: --directoryperdb

   The ``--directoryperdb`` controls the operation of ``mongoimport``
   to mirror the operation of the ":command:`mongoexport
   --directoryperdb``" command which places the contents of only one
   database in a single directory. Use only in conjunction with the
   :command:`mongoimport --dbpath`` option.

.. option:: --journal

   Enables journaling for all ``mongoimport`` operations.

.. option:: --db [db], -d [db]

   Use the ``--db`` option to specify a database for ``mongoimport``
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

.. option:: --fields [field1[,filed2]], -f [field1[,filed2]]

   Specify a field or number fields to *import* from the data
   export. All other fields present in the export will be *excluded*
   during importation. Comma separate a list of fields to limit the
   fields imported.

.. option:: --fieldFile [filename]

   As an alternative to ":command:`mongoimport --fields`" the
   ``--fieldFile`` option allows you to specify a file
   (e.g. ``[file]```) to hold a list of field names to specify a list
   of fields to *include* in the export. All other fields will be
   *excluded* from the export. Place one field per line.

.. option:: --ignoreBlanks

   In :term:`csv` and :term:`tsv` exports, ignore empty fields. If not
   specified, fields without values will be created in imported
   documents.

.. option:: --type [json|csv|tsv]

   Declare the type of export format to be processed and imported. The
   default format is :term:`JSON`, but it's possible to import
   :term:`csv` and :term:`tsv` files.

.. option:: --file [filename]

   Specify the location of a file containing the data to import. If
   not file is specified, then data is read from standard input
   (e.g. "stdin.")

.. option:: --drop

   Modifies the importation procedure so that every collection is
   dropped from the target database before restoring the collection
   from the dumped backup.

.. option:: --headerline

   If using ":command:`mongoimport --type csv`" or
   ":command:`mongoimport --type tsv`," use the first line as field
   names. Otherwise, the first line will be imported as a distinct
   document.

.. option:: --upsert

   Modifies the import process so that existing objects in the
   database are updated if they match the imported objects and all
   other objects are inserted.

.. option:: --upsertFields [field1[,filed2]]

   Specifies a list of fields for the query portion of the
   :term:`upsert`.

   Ensure that these fields are indexed.

.. option:: --stopOnError

   Forces ``mongoimport`` to cease operation following after
   encountering the first error rather than continuing to import
   despite errors.

.. option:: --jsonArray

   Accept import of data expressed with multiple MongoDB document
   within a single :term:`JSON` array.

   Use in conjunction with :command:`mongoexport --jsonArray` to
   import data written as a single :term:`JSON` array. Limited to
   imports of 4 MB or smaller.

Usage
-----

In this example, the :term:`csv` formatted data in the
"``/opt/backups/contacts.csv``" is imported into the collection
"``contacts``" in the "``users``" database on the MongoDB instance
running on the localhost port numbered 27017. ::

     mongoexport --db users --collection contacts --type csv --file /opt/backups/contacts.csv

In the following example, the data in the :term:`JSON` formatted file
"``contacts.json`` is imported into the collection "``contacts``" on
the MongoDB instance running on the localhost port
number 27017. Journaling is explicitly enabled. ::

     mongoexport --collection contacts --file contacts.json --journal

In the next example, data passed to ``mongoimport`` on standard input
(i.e. with a "``|``" pipe.) is imported into the collection
"``contacts``" in the "``sales``" database is the the MongoDB
datafiles located at ``/srv/mongodb/``. if the import process
encounters an error, the ``mongoimport`` will halt. ::

     mongoexport --db sales --collection contacts --stopOnError --dbpath /srv/mongodb/

In the final example, data from the file
"``/opt/backups/mdb1-examplenet.json``" is import into the collection
"``contacts``" within the database "``marketing``" on a remote MongoDB
database. This instance is located on the host
``mongodb1.example.net``" running on port ``37017``", which requires
the username "``user``" and the password "``pass``". ::

     mongoexport --host mongodb1.example.net --port 37017 --username user --password pass --collection contacts --db marketing --file /opt/backups/mdb1-examplenet.json
