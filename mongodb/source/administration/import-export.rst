====================================
Importing and Exporting MongoDB Data
====================================

Full :doc:`database instance backups </administration/backups>` are
useful for disaster recovery protection and routine database backup
operation; however, in some cases additional import and export
functionality is required.

This document provides an overview of the import and export tools
available to MongoDB administrators. These utilities are useful when
you want to backup or export a portion of your database without
capturing the state of the entire. Because they operate by interacting
with a running ``mongod`` instance, they can impact the performance of
your running database.

.. note::

   ``mongoimport`` and ``mongoexport`` do not reliably preserve
   data types in some situations. Use with care.

Using Database Imports and Exports for Backups
----------------------------------------------

For resilient and non-disruptive backups in most cases you'll want to
use some sort of file system of block-level disk snapshot function,
such as the method described in the ":doc:`/administration/backups`"
document. The tools and operations discussed provide functionality
that's useful in the context of providing some kinds of backups.

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

   The :doc:`/utilities/mongoimport` and :doc:`/utilities/mongoexport`
   documents contain complete documentation of these tools. If you
   have questions about the function and parameters of these tools not
   covered here, please refer to these documents.

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

     mongoexport --collection collection --out collection.json

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

     mongoexport --host mongodb1.example.net --port 37017 --username user --password pass --collection contacts --file mdb1-examplenet.json

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

Further Reading
---------------

See the ":doc:`/administration/backups`" document for more in depth
information about backing up MongoDB instances. Additionally, consider
the following documents regarding specific commands addressed in this
document:

- :doc:`/utilities/mongoexport`
- :doc:`/utilities/mongorestore`
