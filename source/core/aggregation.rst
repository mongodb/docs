=====================
Aggregating Framework
=====================

.. versionadded:: 2.1.0

.. default-domain:: mongodb

Overview
--------

The MongoDB aggregation framework provides a means to calculate
aggregate values without having to use :doc:`map/reduce
</core/map-reduce>`. While map/reduce is powerful, using map/reduce is
more difficult than necessary for simple aggregation tasks, such as
totaling or averaging field values.

If you're familiar with :term:`SQL`, the aggregation framework
provides similar functionality as "``GROUPBY``" and related SQL
operators as well as simple forms of "self joins." Additionally, the
aggregation framework provides projection capabilities to reshape the
returned data. Using projections and aggregation, you can add computed
fields, create new virtual sub-objects, and extract sub-fields into
the top-level of results.

.. seealso:: A presentation from MongoSV 2011: `MongoDB's New
   Aggregation Framework <http://www.10gen.com/presentations/mongosv-2011/mongodbs-new-aggregation-framework>`_

Framework Components
--------------------

This section provides an introduction to the two concepts that
underpin the aggregation framework: :term:`pipelines <pipeline>` and
:term:`expressions <expression>`.

.. _aggregation-pipelines:

Pipelines
~~~~~~~~~

A pipeline is process that applies a sequence of documents when using
the aggregation framework. For those familiar with UNIX-like shells
(e.g. bash,) the concept is analogous to the pipe (i.e. "``|``") used
to string operations together.

In a shell environment the pipe redirects a stream of characters from
the output of one process to the input of the next. The MongoDB
aggregation pipeline streams MongoDB documents from one :doc:`pipeline
operator </reference/aggregation>` to the next to process the
documents.

All pipeline operators processes a stream of documents, and the
pipeline behaves as if the operation scans a :term:`collection` and
passes all matching documents into the "top" of the pipeline. Then,
each operator in the pipleine transforms each document as it passes
through the pipeline. At the end of the pipeline, the aggregation
framework returns documents in the same manner as all other queries.

.. note::

   Pipeline operators need not produce one output document for every
   input document: operators may also generate new documents or filter
   out documents.

.. seealso:: :doc:`/reference/aggregation`

.. _aggregation-expressions:

Expressions
~~~~~~~~~~~

Expressions calculate values based on inputs from the pipeline, and
return their results to the pipeline. The aggregation framework
defines expressions in :term:`JSON` using a prefix format.

Often, expressions are stateless and are only evaluated when seen by
the aggregation process. Stateless expressions perform operations such
as: adding the values of two fields together, or extracting the year
from a date.

The :term:`accumulator` expressions *do* retain state, and the
:aggregator:`$group` operator uses maintains state (e.g. counts,
totals, maximums, minimums, and related data.) as documents progress
through the :term:`pipeline`.

.. seealso:: :ref:`Aggregation expressions
   <aggregation-expression-operators>` for additional examples of the
   expressions provided by the aggregation framework.

Use
---

Invocation
~~~~~~~~~~

Invoke an :term:`aggregation` operation with the :command:`aggregate`
and :command:`pipeline`. :command:`aggregate` specifies the name of
the collection to use at the head of the :term:`pipeline`. The
:command:`pipeline` command specifies an array of :ref:`pipeline
operators <aggregation-pipeline-operators>`, where each :ref:`pipeline
operator <aggregation-pipeline-operators>` may have a number of
operands.

Because the :term:`aggregation framework` is accessible by way of the
:term:`database commands <database command>` the interface is the same
across all drivers/interfaces. Create a database object that resembles
the following example and submit that object as a command to the
database.

First, consider a :term:`collection` of documents named "``article``"
using the following schema or and format:

.. code-block:: javascript

   {
    title : “this is my title” ,
    author : “bob” ,
    posted : new Date () ,
    pageViews : 5 ,
    tags : [ “fun” , “good” , “fun” ] ,
    comments : [
                { author :“joe” , text : “this is cool” } ,
                { author :“sam” , text : “this is bad” }
    ],
    other : { foo : 5 }
   }

The following example :term:`pipelines <pipeline>` pivots data to
create a set of author names grouped by tags applied to an
article. Call the aggregation framework by issuing the following
command:

.. code-block:: javascript

   db.runCommand(
   { aggregate : “article”, pipeline : [
     { $project : {
        author : 1,
        tags : 1,
     } },
     { $unwind : “$tags” },
     { $group : {
        _id : { tags : 1 },
        authors : { $addToSet : “$author” }
     } }
    ] }
   );

This command calls the :command:`aggregate` on the :term:`collection`
"``article``", selects the fields ``author`` and ``tags`` using the
:aggregator:`$project`, and runs the :expression:`$unwind` and
:expression:`$group` on these fields to pivot the data.

Result
~~~~~~

The aggregation operation in the previous section returns a
:term:`JSON document` with two fields:

- ``result`` which holds an array of documents returned by the :term:`pipeline`

- ``ok`` which holds the value ``1``, indicating success, or another value
  if there was an error

As a document, the result is subject to the current :ref:`BSON
Document size <limit-maximum-bson-document-size>`. If you expect the
aggregation framework to return a larger result, consider using the
use the :aggregator:`$out` pipeline operator to write the output to a
collection.

Optimizing Performance
----------------------

Early Filtering
~~~~~~~~~~~~~~~

Because the :command:`aggregate` uses a :term:`collection` as the
beginning of a pipeline, it may be more efficient in some situations
to avoid scanning an entire collection.

If your aggregation operation requires only a subset of the data in a
collection, use the :aggregator:`$match` to limit the items in the
pipeline, as in a query. These :aggregator:`$match` operations will use
suitable indexes to access the matching element or elements in a
collection.

When :aggregator:`$match` appears first in the :term:`pipeline`, the
:command:`pipeline` begins with results of a :term:`query` rather than
the entire contents of a collection.

:term:`Aggregation` operations have an optimization phase, before
execution, attempts to re-arrange the pipeline by moving
:aggregator:`$match` operators towards the beginning to the greatest
extent possible. For example, if a :term:`pipeline` begins with a
:aggregator:`$project` that renames fields, followed by a
:aggregator:`$match`, the optimizer can improve performance without
affecting the result by moving the :aggregator:`$match` operator in
front of the :aggregator:`$project`.

In future versions there may be additional optimizations of this type;
however, to ensure ideal performance place :aggregator:`$match`
operators at or near the beginning of the pipeline at when possible.

Memory for Cumulative Operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Certain pipeline operators need to see their entire input set before
they can produce any output. For example, :aggregator:`$sort` must see
all of its input before producing its first output document. The
current implementation does not go to disk in such cases, and all of
the input must fit in memory to be sorted.

:aggregator:`$group` has similar characteristics, and must also see
all of its input before anything can be produced. However, this
usually doesn’t require as much memory as sorting, because only one
record needs to be kept for each unique key in the grouping
specification.

The current implementation will log a warning if a cumulative operator
consumes 5% or more of the physical memory on the host. Cumulative
operators will signal an error if they consume 10% or more of the
physical memory on the host.

Sharded Operation
-----------------

The aggregation framework can be used on sharded collections.

When the source collection is sharded, the aggregation pipeline will
be split into two parts. All of the operators up to and including the
first :aggregator:`$group` or :aggregator:`$sort` are pushed to each
shard. (If an early :aggregator:`$match` can exclude shards through
the use of the shard key in the predicate, then these operators are
only pushed to the relevant shards.) A second pipeline, consisting of
the first :aggregator:`$group` or :aggregator:`$sort` and any
remaining pipeline operators, is executed in mongos, using the results
received from the shards.

For :aggregator:`$sort`, the results are merged. For
:aggregator:`$group`, any “sub-totals” are brought in and combined; in
some cases these may be structures. For example, the
:expression:`$avg` expression maintains a total and count for each
shard; these are combined in mongos and then divided.
