==========================
mongoexport Utility Manual
==========================

Synopsis
--------

``mongoexport`` is a utility that produces a JSON or CSV export of
data stored in a MongoDB instance. See the
":doc:`/administration/import-export`" document for a more in depth
usage overview, and the ":doc:`mongoimport`" document for more
information regarding the :command:`mongoimport` utility, which
provides the inverse "importing" capability.

.. note::

   ``mongoimport`` and ``mongoexport`` should not be used for
   full-scale backups because they may not reliably capture data type
   information. Use :command:`mongodump` and :command:`mongorestore``
   as described in ":doc:`/administration/backups`" for this kind of
   functionality.

Options
-------

.. program:: mongoexport

.. option:: --help

   Returns a basic help and usage text.

.. option:: --verbose, -v

   Increases the amount of internal reporting returned on the command
   line. Increase the verbosity with the ``-v`` form by including
   the option multiple times, (e.g. ``-vvvvv``.)

.. option:: --version

   Returns the version of the ``mongoexport`` utility.

.. option:: --host <hostname><:port>

   Specifies a resolvable hostname for the ``mongod`` from which you
   want to export data. By default ``mongoexport`` attempts to connect
   to a MongoDB process ruining on the localhost port number 27017.

   Optionally, specify a port number to connect a MongboDB instance
   running on a port other than 27017.

.. option:: --port <port>

   Specifies the port number, if the MongoDB instance is not running on
   the standard port. (i.e. ``27017``) You may also specify a port
   number using the :command:`mongoexport --host` command.

.. option:: --ipv6

   Enables IPv6 support to allow ``mongoexport`` to connect to the
   MongoDB instance using IPv6 connectivity. IPv6 support is disabled
   by default in the ``mongoexport`` utility.

.. option:: --username <username>, -u <username>

   Specifies a username to authenticate to the MongoDB instance, if your
   database requires authentication. Use in conjunction with the
   :option:`mongoexport --password` option to supply a password.

.. option:: --password [password]

   Specifies a password to authenticate to the MongoDB instance. Use
   in conjunction with the :option:`mongoexport --username` option to
   supply a username.

.. option:: --dbpath [path]

   Specifies the directory of the MongoDB data files. If used, the
   ``--dbpath`` option enables ``mongoexport`` to attach directly to
   local data files and insert the data without the ``mongod``. To run
   with ``--dbpath``, ``mongoexport`` needs to lock access to the
   data directory: as a result, no ``mongod`` can access the same
   path while the process runs.

.. option:: --directoryperdb

   The ``--directoryperdb`` controls the output of ``mongoexport`` so
   that the contents of only one database is located in a
   directory. Use only in conjunction with the :command:`mongoexport
   --dbpath`` option.

.. option:: --journal

   Enables journaling for all ``mongoexport`` operations.

.. option:: --db [db], -d [db]

   Use the ``--db`` option to specify a database for ``mongoexport``
   to export data from. If you do not specify a DB, all databases in
   this instance will be exported. Use this option to create a copy of a
   smaller subset of your data.

TODO factcheck

.. option:: --collection [collection], -c [collection]

   Use the ``--collection`` option to specify a collection for
   ``mongorestore`` to restore. If you do not specify a
   "``[collection]``", all collections will exported.

TODO factcheck

TODO help section says "(some commands)" limitations otherwise unclear.

.. option:: --fields [field1[,field2]], -f [field1[,field2]]

   Specify a field or number fields to *include* in the export. All
   other fields will be *excluded* from the export. Comma separate a
   list of fields to limit the fields exported.

.. option:: --fieldFile [file]

   As an alternative to ":command:`mongoexport --fields`" the
   ``--fieldFile`` option allows you to specify a file
   (e.g. ``[file]```) to hold a list of field names to specify a list
   of fields to *include* in the export. All other fields will be
   *excluded* from the export. Place one field per line.

.. option:: --query [JSON]

   Provides a :term:`JSON` query to limit (optionally) the documents
   returned that will be exported.

.. option:: --csv

   Changes the export format to a comma separated values (CSV)
   format. By default ``mongoexport`` writes data using one
   :term:`JSON` document for every MongoDB document.

.. option:: --jsonArray

   Modifies the output of ``mongoexport`` so that, the entire contents
   of the export is written as a single :term:`JSON` array. By default
   ``mongoexport`` writes data using one JSON document for every
   MongoDB document.

.. option:: --slaveOk, -k

   Forces ``mongoexport`` to read data from secondary or slave nodes
   if ``mongoexport`` is issued against a replica set. This option is
   only available if connected to a ``mongod`` or ``mongos`` and is
   not available when used with the ":command:`mongoexport --dbpath`"
   option.

   This is the default behavior.

TODO determine what "arg (=1)" in help text means.

.. option:: --out [file], -o [file]

   Specify a file to write the export to. If no file name is
   specified, the export will be written to standard out
   (e.g. ``stdout``).

Usage Examples
--------------

In the following example, the collection "``contacts``" from the
"``users``" database is exported from the MongoDB instance running on
the localhost port number 27017. This export is provided in CSV format
into a file located at "``/opt/backups/contacts.csv``". ::

     mongoexport --db users --collection contacts --csv --file /opt/backups/contacts.csv

In the next example, the collection "``contacts``" is exported from
the MongoDB instance running on the localhost port number 27017, with
journaling explicitly enabled. The export is written to the
``contacts.json`` file in JSON format. ::

     mongoexport --collection contacts --file contacts.json --journal

In the next example, the collection "``contacts``" from the
"``sales``" database is exported from the MongoDB datafiles located at
``/srv/mongodb/``. The export is written to standard output in JSON
format. ::

     mongoexport --db sales --collection contacts --dbpath /srv/mongodb/

In the final example, the collection "``contacts``" from the database
"``marketing``" is exported. This data resides on the MongoDB instance
located on the host ``mongodb1.example.net``" running on port
``37017``", which requires the username "``user``" and the password
"``pass``". ::

     mongoexport --host mongodb1.example.net --port 37017 --username user --password pass --collection contacts --db marketing --file mdb1-examplenet.json
