=========================
FAQ: MongoDB Fundamentals
=========================

.. default-domain:: mongodb

This document addresses basic questions for anyone evaluating MongoDB
or considering MongoDB for a new project or system.

.. contents:: Frequently Asked Questions:
   :backlinks: none
   :local:

.. seealso:: The following FAQ documents may provide the answers to
   questions that are not addressed here.

   - :doc:`developers`
   - :doc:`replica-sets`
   - :doc:`sharding`
   - :wiki:`Indexing FAQ <Indexing+Advice+and+FAQ>` wiki page

What kind of Database is MongoDB?
---------------------------------

MongoDB is a document-oriented DBMS. Think of MySQL but with
:term:`JSON` as the data model, rather than a relational model. There
are no joins. If you have used object-relational mapping layers before
in your programs, you will find the Mongo interface similar to use,
but faster, more powerful, and less work to set up.

.. note::

   MongoDB uses :term:`BSON`, a binary object notation that resembles
   a rich binary :term:`JSON` format, as the foundation of the data
   model.

What languages can I use to work with the MongoDB?
--------------------------------------------------

MongoDB, by way of :term:`client drivers <driver>`, can communicate
is accessible from many different programming languages.

.. seealso:: ":doc:`/applications/drivers`."

Does MongoDB support SQL?
-------------------------

No.

MongoDB does support rich ad-hoc queries by way of a JSON-style query
language using :term:`operators <operator>`.

.. seealso:: ":doc:`/reference/operators`" document and the
   :wiki:`Query Overview <Advanced+Queries>` and the :wiki:`Tour
   <MongoDB+-+A+Developer's+Tour>` pages from the wiki.

What are typical use cases for MongoDB?
---------------------------------------

MongoDB has a general purpose design that is appropriate for a large
number of use cases. Example use cases include: content management
systems, mobile, gaming, e-commerce, real-time report statistics,
archiving, and logging.

Does MongoDB support transactions?
----------------------------------

MongoDB does not provide fully generalized transactions; however,
MongoDB does provide some transactional capabilities. Atomic
operations are possible within the scope of a single document: that
is, we can debit "``a``" and credit "``b``" as a transaction if they
are fields within the same document. Because documents can be rich,
some documents contain thousands of fields, with support for testing
fields in sub-documents. In may cases, this is quite powerful.

Additionally, all writes in MongoDB are durable, which is the 'D' in
ACID. Journaling, which is on by default in 64-bit builds, in
combination with the :command:`getLastError` command to ensure safe
writes and on-disk consistency.

Some users have built successful e-commerce systems using MongoDB. At
the same time, an application like a general ledger, would be
difficult to build with MongoDB because of the highly transactional
nature of that problem.

Does MongoDB require lots of RAM?
---------------------------------

No; in fact it is possible to run MongoDB on a machine with a small
amount of free RAM.

MongoDB automatically uses all free memory on the machine as its
cache. System resource monitors show that MongoDB uses a lot of
memory--and it is for the cache--but it's usage is dynamic: if another
process suddenly needed half the server's RAM, MongoDB will yield
cached memory to the other process.

How do I configure the cache size?
----------------------------------

MongoDB has no configurable cache. MongoDB uses all *free* memory on
the system automatically in the form of memory mapped files. Operating
systems use the same approach with their file system caches.

Are writes written to disk immediately, or lazily?
--------------------------------------------------

Writes are physically written to the journal within 100
milliseconds. At that point, the write is "durable" in the sense that
after a pull-plug-from-wall event, the data should still be there on
restart.

While the journal commit is nearly instant, MongoDB writes to the data
files lazily. MongoDB may wait to write data to the data files for as
much as one minute. This does not effect durability, as the journal
has enough information to protect against crash recovery.

Does MongoDB handle caching?
----------------------------

For simple queries (with an index) MongoDB is fast enough that you can
query the database directly without a dedicated caching layer. MongoDB
should provide an alternative to all layers of a typical
ORM/``memcached``/MySQL stack. However, some MongoDB users integrate
``memcached`` and MongoDB.

What language is MongoDB written in?
------------------------------------

MongoDB is implemented in C++.  :term:`Drivers <driver>` and client libraries
are typically written in their respective languages, although some
drivers use C extensions to provide speed.

What are the 32-bit limitations?
--------------------------------

MongoDB uses memory-mapped files.  When running a 32-bit build of
MongoDB, the total storage size for the server including data and
indexes is 2.5 gigabytes. If you are running on a 64-bit build of
MongoDB, there is virtually no limit to storage size.  For production
deployments, use 64-bit operating systems and MongoDB builds.

.. seealso:: "`Blog Post: 32-bit Limitations <http://blog.mongodb.org/post/137788967/32-bit-limitations>`_

.. note::

   32-bit builds disable :term:`journaling <journal>` by default
   because journaling further limits the maximum amount of data that
   database can store.
