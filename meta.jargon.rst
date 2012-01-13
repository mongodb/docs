========================================
MongoDB Documentation Jargon Conventions
========================================

MongoDB
-------

Refer to MongoDB as "MongoDB" rather than mongo or Mongo when referring
to the entire database system, including possibly ``mongod`` and
``mongos``.

Refer to ``mongod`` or ``mongos`` to indicate the database process, or
server instance itself. Use "database process," rather than "node,"
"instance," or "host," to refer to the running database process.

Data Structures
---------------

Use the following convention when referring to specific parts of
MongoDB data:

- *document* refers to "rows," or records in a MongoDB
 database. Potential confusion with "JSON Documents."

- *field* refers to a "key" or "identifier" of data within a MongoDB
 document.

- *value* refers to the contents of a *field*.

Use "sub-document" as needed to describe nested documents.

Other Terms
-----------

- Use "**shard cluster**," to refer to a collection of ``mongod``
  instances that hold a sharded data set. Use the term "**replica
  set**," to refer to a collection of ``mongod`` instances that
  provide a replicated data set. Do not use the word "cluster" to
  refer to a replication only deployment.

- Use "``example.net``" (and ``.org`` or ``.com`` if needed) for all
  examples and samples.

The documentation project does not, as of early 2012, have a fixed set
of nomenclature for describing interface elements, architectural
components (daemons, databases, processes, drivers, hosts, mongos'
etc.) Similarly, there is no standard nomenclature or examples for
field names, values, variables, and other components of code examples.

At some point in the near future creating a more standardized the
nomenclature for examples of architectural elements and code
components may be necessary.
