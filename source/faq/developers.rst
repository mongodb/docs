=======================================
FAQ: MongoDB for Application Developers
=======================================

.. default-domain:: mongodb

This provides answers to common questions related to the application
development using MongoDB.

.. contents:: Frequently Asked Questions:
   :backlinks: none
   :local:

.. seealso:: The following FAQ documents may provide the answers to
   questions that are not addressed here.

   - :doc:`fundamentals`
   - :doc:`replica-sets`
   - :doc:`sharding`
   - :wiki:`Indexing FAQ <Indexing+Advice+and+FAQ>` wiki page

   - :doc:`indexing`

What is a "namespace?"
----------------------

The :term:`namespace` is the concatenation of the :term:`database`
name and the :term:`collection` name with a period character in
between.

Collections are logical grouping of similar documents that share one
or more indexes. Databases are groups of collections stored on disk
in a single collection of data files.

For an example "``acme.users``" namespace, "``acme``" is the database
name and "``users``" is the collection name. Period characters **can**
occur in collection names, so that the "``acme.user.history``" is a
valid namespace, with the "``acme``" database name, and the
"``user.history``" collection name.

How do you copy all objects from one collection to another?
-----------------------------------------------------------

In the :program:`mongo` shell, you can use the following operation to
duplicate the entire collection:

.. code-block:: javascript

   db.people.find().forEach( function(x){db.user.insert(x)} );

.. note::

   Because this process decodes :term:`BSON` documents to :term:`JSON`
   during the copy procedure, documents you may incur a loss of
   type-fidelity.

   Consider using :program:`mongodump` and :program:`mongorestore` to
   maintain type fidelity.

Also consider the :dbcommand:`cloneCollection` :term:`command
<database command>` that may provide some of this functionality.

If you remove an object attribute does MongoDB remove it from disk?
-------------------------------------------------------------------

Yes.

When you use :func:`remove`, the object will no longer exist in
MongoDB's on-disk data storage.

Does MongoDB permit null values?
--------------------------------



When does MongoDB write updates to disk?
----------------------------------------

MongoDB flushes writes to disk on a regular interval. In the default
configuration, MongoDB writes data to the main data files on disk
every 60 seconds and commits the :term:`journal` every 100
milliseconds. These values are configurable with the
:setting:`journalCommitInterval` and :setting:`syncdelay`.

These values represent the *maximum* amount of time between the
completion of a write operation and the point when the write is
durable in the journal, if enabled, and when MongoDB flushes data to
the disk. In many cases MongoDB and the operating system flush data to
disk more frequently, so that the above values resents a theoretical
maximum.

However, by default, MongoDB uses a "lazy" strategy to write to
disk. This is advantegous in situations where the database receives a
thousand increments to an object within one second, MongoDB only needs
to flush this data to disk once. In addition to the aforementioned
configuration options, you can also use :dbcommand:`fsync` and
:dbcommand:`getLastError` to modify this strategy.

How do I do transactions and locking in MongoDB?
------------------------------------------------

MongoDB does not have support for traditional locking or complex
transactions with rollback. MongoDB aims to be lightweight, fast, and
predictable in its performance. This is similar to the MySQL MyISAM
autocommit model. By keeping transaction support extremely simple,
MongoDB can provide greater performance especially for
:term:`partitioned <partition>` or :term:`replicated <replication>`
systems with a number of database server processes.

MongoDB *does* have support for atomic operations *within* a single
document. Given the possibilities provided by nested documents, this
feature provides support for a large number of use-cases.

.. seealso:: The :wiki:`Atomic Operations <Atomic+Operations>` wiki page.

How do you aggregate data with MongoDB?
---------------------------------------

In version 2.1 and later, you can use the new ":doc:`aggregation
framework </applications/aggregation>`," with the
:dbcommand:`aggregate` command.

MongoDB also supports :term:`map-reduce` with the
:dbcommand:`mapReduce`, as well as basic aggregation with the
:dbcommand:`group`, :dbcommand:`count`, and
:dbcommand:`distinct`. commands.

.. seealso:: The :wiki:`Aggregation <Aggregation>` wiki page.

Why does MongoDB log so many "Connection Accepted" events?
----------------------------------------------------------

If you see a very large number connection and re-connection messages
in your MongoDB log, then clients are frequently connecting and
disconnecting to the MongoDB server. This is normal behavior for
applications that do not use request pooling, such as CGI. Consider
using FastCGI, an Apache Module, or some other kind of persistent
application server to decrease the connection overhead.

If these connections do not impact your performance you can use the
run-time :setting:`quiet` option or the command-line option
:option:`--quiet <mongod>` to suppress these messages from the log.

Does MongoDB run on Amazon EBS?
-------------------------------

Yes.

MongoDB users of all sizes have had a great deal of success using
MongoDB on the EC2 platform using EBS disks.

.. seealso:: The ":wiki:`MongoDB on the Amazon Platform <Amazon+EC2>`"
   wiki page.

Why are MongoDB's data files so large?
--------------------------------------

MongoDB aggressively preallocates data files to reserved space and
avoid file system fragmentation. You can use the :setting:`smallfiles`
to modify the file prealocation strategy.

.. seealso:: This wiki page that address :wiki:`MongoDB disk use <http://www.mongodb.org/display/DOCS/Excessive+Disk+Space>`.

How does MongoDB address SQL or Query injection?
------------------------------------------------

BSON
~~~~

As a client program assembles a query in MongoDB, it builds a BSON object, not a string. Thus
traditional SQL Injection attacks are not a problem. More details and some nuances are covered below.

MongoDB represents queries as :term:`BSON` objects. Typically
:doc:`client library </applications/drivers>` provides a convenient,
injection free, process to build these objects. Consider the following
C++ example:

.. code-block:: cpp

   BSONObj my_query = BSON( "name" << a_name );
   auto_ptr<DBClientCursor> cursor = c.query("tutorial.persons", my_query);

Here, ``my_query`` then will have a value such as ``{ name : "Joe"
}``. If ``my_query`` contained special characters (e.g. "``,``",
"``:``", "``{``" or others) then a malicious user cannot inject code.

JavaScript
~~~~~~~~~~

Developers should, as always, exercise care when using server-side
JavaScript with MongoDB. When using the :operator:`$where` statement
in a query, do not concatenate data from the user when building
Javascript code. Allowing user-submitted data to appear in JavaScript
code sent to the server is analogous to a SQL injection
vulnerability.

Fortunately, you can express most queries in MongoDB without
JavaScript and for queries that require JavaScript, you can mix
JavaScript and non-JavaScript in a single query. Place all the
user-supplied fields directly in a :term:`BSON` field and pass
JavaScript code to the :operator:`$where` field.

Consider the following alternatives:

- If you need to pass user-supplied values in a :operator:`$where`
  clause, you may escape these values with the ``CodeWScope``
  mechanism. When you set user-submitted values as variables in the
  scope document,  you can avoid evaluating them on the database
  server.

- If you need to use :func:`db.eval()` with user supplied values, you can
  either use a ``CodeWScope`` or you can supply extra arguments to your
  function. For instance:

  .. code-block:: sh

     db.eval(function(userVal){...},
             user_value);

  This will ensure that your application sends ``user_value`` to the
  dataase server as data rather than code.

Dollar Sign Operator Escaping
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Field names in MongoDB's query language has semantic meaning. The
dollar sign (i.e "``$``) is a reserved character used to represent
:doc:`operators </reference/operators>` (i.e. :operator:`$inc`.) Use
care to assure that your application's users can not inject operators
into their inputs.

In some cases, you may wish to build a BSON object with a
user-provided key.  In these situations, keys will need to substitute
the reserved ``$`` and ``.`` characters. Any character is sufficient,
but consider using the Unicode full width equivalents: ``U+FF04``
(i.e. "＄") and ``U+FFOE`` (i.e. "．").

Consider the following example:

.. code-block:: cpp

   BSONObj my_object = BSON( a_key << a_name );

The user may have supplied a ``$`` value in the ``a_key`` value. At
the same time, ``my_object`` might be "``{ $where : "things"
}``". Consider the following cases:

- **Inserting**. Inserting this into the database does no harm. The
  insert process does not evaluate the object as a query.

  .. note::

     MongoDB client drivers, if properly implemented, check for
     reserved characters in keys on inserts.

- **Update**.  The :func:`update()` operation permits ``$`` operators
  in the second field. The :func:`update()` does not support the
  :operator:`$where` operator in update. At the same time, some users
  may be able to inject operators that can manipulate a single
  document only. Therefore your application should escape keys, as
  mentioned above, if reserved characters are possible.

- **Querying.** Generally this is not a problem for queries that
  resemble "``{ x : user_obj }``": dollar signs are not top level and
  have no effect. Theoretically it may be possible for the user to
  build a query themselves. Checking the user submitted content for
  "``$``" characters in key names may help protect against this kind
  of injection. These query injections are, nonetheless, highly
  unusual.

Additionally, if you refrain from placing user-generated keys in the
top-level, and restrict them to the sub-objects, you may be able to
protect against these kinds of attacks.

Driver Specific Issues
~~~~~~~~~~~~~~~~~~~~~~

See the "`PHP MongoDB Driver Security Notes
<http://us.php.net/manual/en/mongo.security.php>`_" page in the PHP
driver documentation for more information

How does MongoDB provide concurrency?
-------------------------------------

What is the compare Order for BSON types?
-----------------------------------------

MongoDB permits documents within a single collection to have common
values that hold data of different :term:`BSON` types. For instance,
the following documents may exist within a single document.

.. code-block:: javascript

   { x: "string" }
   { x: 42 }

When comparing values of different :term:`BSON` types, the following
convention determines order:

- Null
- Numbers (ints, longs, doubles)
- Symbol, String
- Object
- Array
- BinData
- ObjectID
- Boolean
- Date, Timestamp
- Regular Expression

.. note::

   MongoDB treats some types as equivalent for comparison purposes:
   for instance, numeric types undergo conversion before comparison.

Consider the following :program:`mongo` example:

.. code-block:: javascript

   db.test.insert({x:3});
   db.test.insert( {x : 2.9} );
   db.test.insert( {x : new Date()} );
   db.test.insert( {x : true } );

   db.test.find().sort({x:1});
   { "_id" : ObjectId("4b03155dce8de6586fb002c7"), "x" : 2.9 }
   { "_id" : ObjectId("4b03154cce8de6586fb002c6"), "x" : 3 }
   { "_id" : ObjectId("4b031566ce8de6586fb002c9"), "x" : true }
   { "_id" : ObjectId("4b031563ce8de6586fb002c8"), "x" : "Tue Nov 17 2009 16:28:03 GMT-0500 (EST)" }

MinKey and MaxKey
~~~~~~~~~~~~~~~~~

MongoDB provides two special types: ``MinKey`` and ``MaxKey`` are less
than and greater than all other possible :term:`BSON` element values
respectively.

To continue the example from above:

.. code-block:: javascript

   db.test.insert( { x : MaxKey } )
   db.test.insert( { x : MinKey } )
   db.test.find().sort({x:1})
   { "_id" : ObjectId("4b04094b7c65b846e2090112"), "x" : { $minKey : 1 } }
   { "_id" : ObjectId("4b03155dce8de6586fb002c7"), "x" : 2.9 }
   { "_id" : ObjectId("4b03154cce8de6586fb002c6"), "x" : 3 }
   { "_id" : ObjectId("4b031566ce8de6586fb002c9"), "x" : true }
   { "_id" : ObjectId("4b031563ce8de6586fb002c8"), "x" : "Tue Nov 17 2009 16:28:03 GMT-0500 (EST)" }
   { "_id" : ObjectId("4b0409487c65b846e2090111"), "x" : { $maxKey : 1 } }

.. seealso::

   - The :wiki:`Tailable Cursors <Taliable+Cursors>` wiki page for an
     example of a C++ use of ``MinKey``.
   - The :source:`jsobj.h </db/jsobj.h>` source file for the
     definition of ``MinKey`` and ``MaxKey``.

BSON Type Comparison
~~~~~~~~~~~~~~~~~~~~

A Boolean comparison of different :term:`BSON` types always returns
false.
