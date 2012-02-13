====================================
Importing and Exporting MongoDB Data
====================================

.. default-domain:: mongodb

Full :doc:`database instance backups </administration/backups>` are
useful for disaster recovery protection and routine database backup
operation; however, some cases require additional import and export
functionality.

This document provides an overview of the import and export tools
provided in distributions of MongoDB administrators. These utilities
are useful when you want to backup or export a portion of your
database without capturing the state of the entire database. For more
complex data migration tasks, you may want to write your own import
and export scripts using a client driver :term:`driver` to interact
with the database itself.

.. warning::

   Because these tools primarily operate by interacting with a running
   :program:`mongod` instance, they can impact the performance of your
   running database.

   :program:`mongoimport` and :program:`mongoexport` do not reliably
   preserve data types. As a result data exported or imported with
   these tools may loose some measure of fidelity. Use with care.

Using Database Imports and Exports for Backups
----------------------------------------------

For resilient and non-disruptive backups in most cases you'll want to
use a file system or block-level disk snapshot function, such as the
method described in the ":doc:`/administration/backups`" document. The
tools and operations discussed provide functionality that's useful in
the context of providing some kinds of backups.

By contrast, use import and export tools to backup a small subset of
your data. These backups may capture a small crucial set of data or a
frequently modified section of data, for extra insurance, or for ease
of access. No matter how you decide to import or export your data,
consider the following guidelines:

- Label files so that you can identify what point in time the
  export or backup reflects.

- Labeling should describe the contents of the backup, and reflect the
  subset of the data corpus, captured in the backup or export.

- Do not create or apply exports if the backup process itself will
  have an adverse effect on a production system.

- Make sure that the reflect a consistent data state. Export or backup
  processes can impact data integrity (i.e. type fidelity) and
  consistency if updates continue during the backup process.

- Test backups and exports by restoring and importing to ensure that
  the backups are useful.

Human Intelligible Import/Export Formats
----------------------------------------

This section describes a process for your database, or a portion
thereof, to a file in a JSON or CSV format.

.. seealso:: The :doc:`/reference/mongoimport` and
   :doc:`/reference/mongoexport` documents contain complete
   documentation of these tools. If you have questions about the
   function and parameters of these tools not covered here, please
   refer to these documents.

   If you want to simply copy a database or collection from one
   instance to another, consider using the :dbcommand:`copydb`,
   :dbcommand:`clone`, or :dbcommand:`cloneCollection` commands, which
   may be more suited to this task. The :program:`mongo` shell
   provides the :func:`db.copyDatabase()` method.

These tools may also be useful for importing data into a MongoDB data
from third party applications.

Database Export with mongoexport
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

With the :program:`mongoexport` utility you can create a backup
file. In the most simple invocation, the command takes the following
form:

.. code-block:: sh

   mongoexport --collection collection --out collection.json

This will export all documents in the collection named
"``collection``" into the file "``collection.json``". Without the
output specification (i.e. ":option:`--out collection.json
<mongoexport --out>`",) :program:`mongoexport` writes output to
standard output (i.e. "stdout.") You can further narrow the results by
supplying a query filter using the ":option:`--query <mongoexport
--query>`" and limit results to a single database using the
":option:`--db <mongoexport --db>`" option. For instance:

.. code-block:: sh

   mongoexport --db sales --collection contacts --query '{"field": 1}'

This command returns all documents in the "``sales``" database's
"``contacts``" collection, with a field named "``field``" with a value
of "``1``. Enclose the query in single quotes (e.g. "``'``") to ensure
that it does not interact with your shell environment. The resulting
documents will return on standard output.

By default, :program:`mongoexport` returns one :term:`JSON document`
per MongoDB document. Specify the ":option:`--jsonArray <mongoexport
--jsonArrray>`" argument to return the export as a single :term:`JSON`
array. Use the ":option:`--csv <mongoexport --csv>`" file to return
the result in CSV (comma separated values) format.

If your :program:`mongod` instance is not running, you can use the
":option:`--dbpath <mongoexport --dbpath>`" option to specify the
location to your MongoDB instance's database files. See the following
example:

.. code-block:: sh

   mongoexport --db sales --collection contacts --dbpath /srv/MongoDB/

This reads the data files directly. This locks the data directory to
prevent conflicting writes. The :program:`mongod` process must *not* be
running or attached to these data files when you run :program:`mongoexport`
in this configuration.

The ":option:`--host <mongoexport --host>`" and ":option:`--port
<mongoexport --port>`" options allow you to specify a non-local host
to connect to capture the export. Consider the following example:

.. code-block:: sh

   mongoexport --host mongodb1.example.net --port 37017 --username user --password pass --collection contacts --file mdb1-examplenet.json

On any :program:`mongoexport` command you may, as above specify username and
password credentials as above.

Database Import with mongoimport
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To restore a backup taken with :program:`mongoexport`. Most of the
arguments to :program:`mongoexport` also exist for
:program:`mongoimport`. Consider the following command:

.. code-block:: sh

   mongoimport --collection collection --file collection.json

This imports the contents of the file ``collection.json`` into the
collection named "``collection``". If you do not specify a file with
the ":option:`--file <mongoimport --file>`" option,
:program:`mongoimport` accepts input over standard input
(e.g. "stdin.")

If you specify the ":option:`--upsert <mongoimport --upsert>`" option,
all of :program:`mongoimport` operations will attempt to update
existing documents in the database and insert other documents. This
option will cause some performance impact depending on your
configuration.

You can specify the database option ":option:`--db <mongoimport
--db>`" to import these documents to a particular database. If your
MongoDB instance is not running, use the ":option:`--dbpath
<mongoimport --dbpath>`" option to specify the location of your
MongoDB instance's database files. Consider using the
":option:`--journal <mongoimport --journal>`" option to ensure that
:program:`mongoimport` records its operations in the journal. The
``mongod`` process must *not* be running or attached to these data
files when you run :program:`mongoimport` in this configuration.

Use the ":option:`--ignoreBlanks <mongoimport --ignoreBlanks>`" option
to ensure that blank fields are. For CSV and TSV imports, this option
provides the desired functionality in most cases: it avoids inserting
blank fields in MongoDB documents.

.. seealso:: See the ":doc:`/administration/backups`" document for
   more in depth information about backing up MongoDB
   instances. Additionally, consider the following references for
   commands addressed in this document:

   - :doc:`/reference/mongoexport`
   - :doc:`/reference/mongorestore`
