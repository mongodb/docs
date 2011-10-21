=========================================
Importing and Exporting Data From MongoDB
=========================================

Full :doc:`database instance backups <backups>` are useful for
disaster recovery protection; however, there are situations where
other backup approaches are indicated. Systems without convenient
access to block level snapshot tools, and in situations where it's
necessary to export or backup a portion of data are not good candidates
block-level backups systems.

This document provides an overview of the import, export, and "database
dump" tools available to MongoDB administrators.

These methods are also useful when you want to backup or export a
portion of your database without restoring all of the
database. However, because they operate by interacting with a running
``mongod`` instance, they can impact the performance of your running
database.


Human Intelligible Import/Export Formats
----------------------------------------

This section describes the process for exporting the entire contents
of your MongoDB instance, or a portion thereof, to a file in a JSON,
CSV, or TSV format.

.. seealso::

   The :doc:`<mongoimport>` and :doc:`<mongoexport>` documents contain
   complete documentation of these tools. If you have questions
   about the function and parameters of these tools not covered here,
   please refer to these documents.

   If you want to simply copy a database or collection from one
   instance to another, consider using the :command:`copydb`,
   :command:`clone`, or :command:`clonecollection` commands, which may
   be more suited to this task.

Database Export with mongoexport
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Database Import with mongoimport
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To restore a backup taken with ``mongoexport``...


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
   the backup methods described in the ":doc:`<backups>`" document.

Database Export with mongodump
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Mongodump can be used to do live backup of your data, or can work
against an inactive set of database files. The mongodump utility may
be used to dump an entire server/database/collection (or part of a
collection with a query), even when the database is running and
active.

To restore a backup taken with ``mongodump``...


Database Import with mongorestore
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Further Reading
---------------

