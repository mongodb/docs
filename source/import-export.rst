=========================================
Importing and Exporting Data From MongoDB
=========================================

Full :doc:`database instance backups <backups>` are useful for
disaster recovery protection; however, there are situations where
other backup approaches are indicated. Systems without convenient
access to block level snapshot tools, and in situations where it's
necessary to export or backup a portion of data are not good candidates
block-level backups systems.

This document provides an overview of the import, export, and
"database dump" tools available to MongoDB administrators. These
methods are also useful when you want to backup or export a portion of
your database without restoring all of the database. Because they
operate by interacting with a running ``mongod`` instance, they can
impact the performance of your running database.

Using Database Imports and Exports to Backups
---------------------------------------------

For resilient and non-disruptive backups in most cases you'll want to
use some sort of file system of block-level disk snapshot function,
such as the method described in the ":doc:`backups`" document. The
tools and operations discussed provide functionality that's useful in
the context of providing some kinds of backups.

For instance Use import and export tools to backup a small subset of
your data. These backups may capture a small crucial set of data or a
frequently modified section of data, for extra insurance, or for ease
of access. No matter how you decide to back up your data make sure
that your backups and exports:

- are labeled such that you can identify when the backup was created
  and what subset of the data corpus is included in the capture, if
  applicable.

- are captured when any performance impact from the backup operation
  operation will not adversely effect a production deployment.

- reflect a consistent data state.

- capture data that can be quickly restored, or referenced when
  needed.

Human Intelligible Import/Export Formats
----------------------------------------

This section describes the process for exporting portions of the
contents of your MongoDB instance, or a portion thereof, to a file in
a JSON or CSV format.

.. seealso::

   The :doc:`<mongoimport>` and :doc:`<mongoexport>` documents contain
   complete documentation of these tools. If you have questions about
   the function and parameters of these tools not covered here, please
   refer to these documents.

   If you want to simply copy a database or collection from one
   instance to another, consider using the :command:`copydb`,
   :command:`clone`, or :command:`clonecollection` commands, which may
   be more suited to this task.

These these tools may also be useful for importing data into a MongoDB
data from third party applications.

Database Export with mongoexport
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With the ``mongoexport`` utility you can create a backup file. In the
most simple invocation, the command takes the following form: ::

     mongoexport --collection collection --out collection.jsohehn

This will export all documents in the collection named
"``collection``" into the file "``collection.json``". Without the
output specification (i.e. "``--out collection.json``") the output
would be sent to standard out (i.e. "stdout.") You can further narrow
the results by supplying a query filter using the  "``--query``" and
limit results to a single database using the "``--db``" option. For
instance: ::

     mongoexport --db sales --collection contacts --query '{"field": 1}'

This command returns all documents in the "``sales``" database's
"``contacts``" collection, with a field named "``field``" with a value
of "``1``. Enclose the query in single quotes (e.g. "``'``") to ensure
that it does not interact with your shell environment. The resulting
documents will return on standard output.

By default, ``mongoexport`` returns one JSON document per MongoDB
document. Specify the "``--jsonArray``" argument to return the export
as a single JSON array. Use the "``--csv``" file to return the result
in CSV (comma separated values) format.

If your MongoDB instance is not running, you can use the
"``--dbpath``" option to specify the location to your MongoDB
instance's database files. See the following example: ::

     mongoexport --db sales --collection contacts --dbpath /srv/MongoDB/

This reads the data files directly. This locks the data directory to
prevent conflicting writes. The ``mongod`` process must *not* be
running or attached to these data files when you run ``mongoexport``
in this configuration.

The "``--host``" and "``--port``" options allow you to specify a
non-local host to connect to capture the export. Consider the
following example: ::

     mongoexport --host mongodb1.example.net --port 3017 --username user --password pass --collection contacts -file mdb1-examplenet.json

On any ``mongoexport`` command you may, as above specify username and
password credentials as above.

Database Import with mongoimport
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To restore a backup taken with ``mongoexport``. Most of the arguments
to ``mongoexport`` are mirrored in ``mongoimport``. Consider the
following command: ::

     mongoimport --collection collection --file collection.json

This imports the contents of the file ``collection.json`` into the
collection named "``collection``". If you do not specify a file with
the "``--file``" option, ``mongoimport`` accepts input over  standard
input (e.g. "stdin.")

If you specify the "``--upsert``" option, all of ``mongoimport``
operations will attempt to update existing documents in the database
and insert other documents. This option will cause some performance
impact depending on your configuration.

You can specify the database option "``--db``" to import these
documents to a particular database. If your MongoDB instance is not
running, you can use the "``--dbpath``" option to specify the location
to your MongoDB instance's database files. Consider using the
"``--journal``" option to ensure that the operations of
``mongoimport`` are recorded in the journal. The ``mongod`` process
must *not* be running or attached to these data files when you run ``mongoimport`` in
this configuration.

Use the "``--ignoreBlanks``" option to ensure that blank fields
are. For CSV and TSV imports, this option provides the desired
functionality in most cases: it avoids inserting blank fields in
MongoDB documents.

Binary Import/Export Formats
----------------------------

This section describes the process for exporting the entire contents
of your MongoDB instance, to a file in a binary format. This command
provides the best option for full system database backups if
disk-level snapshots are not available.

.. seealso::

   The :doc:`<mongodump>` and :doc:`<mongorestore>` documents contain
   complete documentation of these tools. If you have questions
   about the function and parameters of these tools not covered here,
   please refer to these documents.

   If your system has disk level snapshot capabilities, consider the
   backup methods described in the ":doc:`<backups>`" document.

Database Export with mongodump
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``mongodump`` utility performs a live backup the data, or can work
against an inactive set of database files. ``mongodump`` utility can
create a dump for an entire server/database/collection (or part of a
collection with a query,) even when the database is running and
active. If you run ``mongodump`` without any arguments the command
will connect to the local database instance (e.g. ``127.0.0.1`` or
``localhost``) and create a database backup in a in the current
directory named "``dump/``".

You can specify  database and collection as options to the
``mongodump`` command to limit the amount of data included in the
database dump. For example: ::

     mongodump --collection collection --database test

This command creates a dump in of the database in the "``dump``"
directory of only the collection named "``collection``" in the
database named "``test``". ``mongodump`` provides the "``--oplog``"
option which forces the dump operation to use the operation log to
take a point-in-time snapshot of the database.

If your MongoDB instance is not running, you can use the
"``--dbpath``" option to specify the location to your MongoDB
instance's database files. ``mongodump`` reads the data files directly
with this operation. This locks the data directory to prevent
conflicting writes. The ``mongod`` process must *not* be running or
attached to these data files when you run ``mongodump`` in this
configuration. Consider the following example: ::

     mongodump --dbpath /srv/mongodb

Additionally, the "``--host``" and "``--port``" options allow you to
specify a non-local host to connect to capture the export. Consider
the following example: ::

     mongodump --host mongodb1.example.net --port 3017 --username user --password pass /opt/backup/mongodumpm-2011-10-24

On any ``mongodump`` command you may, as above specify username and
password credentials to specify database authentication.

Database Import with mongorestore
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``mongorestore`` tool is used to restore a binary backup
taken with the ``mongodump`` utility. Consider the following example
command: ::

     mongorestore dump-2011-10-25/

Here, the database backup located in the ``dump-2011-10-25`` directory
is imported to the ``mongod`` instance running on the localhost
interface. By default, ``mongorestore`` will look for a database dump
in the "``dump/``" directory and restore that. If you wish to restore
to a non-default host, the "``--host``" and "``--port``" options allow
you to specify a non-local host to connect to capture the
export. Consider the following example: ::

     mongorestore --host mongodb1.example.net --port 3017 --username user --password pass /opt/backup/mongodumpm-2011-10-24

On any ``mongorestore`` command you may, as above specify username and
password credentials as above.

If you created your database dump using the ``--oplog`` option to
ensure a point-in-time snapshot, call ``mongorestore`` with the
"``--oplogReplay``" option as in the following example: ::

     mongorestore --oplogRestore

You may also consider using the ``--objcheck`` option to check the
integrity of objects as they are inserted into the database, or the
``--drop`` option to drop each collection from the database before
restoring from backups. ``mongorestore`` also includes the ability to
a filter to all input before it is inserted into the new
database. Consider the following example: ::

     mongorestore --filter '{"field": 1}'

Here, the only documents added to the database running on the local
system are added from the database dump located in the "``dump/``"
folder *if* the documents have a field name "``field``" that holds a
value of "``1``". Enclose the filter in single quotes (e.g. "``'``")
to ensure that it does not interact with your shell environment.

If your MongoDB instance is not running, you can use the
"``--dbpath``" option to specify the location to your MongoDB
instance's database files. ``mongorestore`` inserts data into the data
files directly with this operation. While the command runs, the data
directory is locked to prevent conflicting writes. The ``mongod``
process must *not* be running or attached to these data files when you
run ``mongodump`` in this configuration. Consider the following
example: ::

     mognorestore --dbpath /srv/mongodb

If your MongoDB instance is not running, you can use the
"``--dbpath``" option to specify the location to your MongoDB
instance's database files. Consider using the "``--journal``" option
to ensure that the operations of ``mon`` are recorded in the
journal.

Further Reading
---------------

See the ":doc:`backups`" document for more in depth information about
backing up MongoDB instances. Additionally, consider the following
documents regarding specific commands addressed in this document:

- :doc:`mongoexport`
- :doc:`mongoimport`
- :doc:`mongodump`
- :doc:`mongorestore`
