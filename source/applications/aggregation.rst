=====================
Aggregation Framework
=====================

.. versionadded:: 2.1.0

.. default-domain:: mongodb

Overview
--------

The MongoDB aggregation framework provides a means to calculate
aggregate values without having to use :doc:`map/reduce
</core/map-reduce>`. While map/reduce is powerful, using map/reduce is
more difficult than necessary for many simple aggregation tasks, such as
totaling or averaging field values.

If you're familiar with :term:`SQL`, the aggregation framework
provides similar functionality to "``GROUP BY``" and related SQL
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

Conceptually, documents from a collection are passed through an
aggregation pipeline, and are transformed as they pass through it.
For those familiar with UNIX-like shells (e.g. bash,) the concept is
analogous to the pipe (i.e. "``|``") used to string text filters together.

In a shell environment the pipe redirects a stream of characters from
the output of one process to the input of the next. The MongoDB
aggregation pipeline streams MongoDB documents from one :doc:`pipeline
operator </reference/aggregation>` to the next to process the
documents.

All pipeline operators process a stream of documents, and the
pipeline behaves as if the operation scans a :term:`collection` and
passes all matching documents into the "top" of the pipeline.
Each operator in the pipleine transforms each document as it passes
through the pipeline.

.. note::

   Pipeline operators need not produce one output document for every
   input document: operators may also generate new documents or filter
   out documents.

.. seealso:: The ":doc:`/reference/aggregation`" reference includes
   documentation of the following pipeline operators:

   - :agg:pipeline:`$project`
   - :agg:pipeline:`$match`
   - :agg:pipeline:`$limit`
   - :agg:pipeline:`$skip`
   - :agg:pipeline:`$unwind`
   - :agg:pipeline:`$group`
   - :agg:pipeline:`$sort`
TODO I'd remove references to $out, since we don't have it yet
   - :agg:pipeline:`$out`

.. _aggregation-expressions:

Expressions
~~~~~~~~~~~

Expressions calculate values based on documents passing through the pipeline,
and contribute their results to documents flowing through the pipeline.
The aggregation framework defines expressions in :term:`JSON` using a prefix
format.

Often, expressions are stateless and are only evaluated when seen by
the aggregation process. Stateless expressions perform operations such
as adding the values of two fields together or extracting the year
from a date.

The :term:`accumulator` expressions *do* retain state, and the
:agg:pipeline:`$group` operator  maintains that state (e.g.
totals, maximums, minimums, and related data.) as documents progress
through the :term:`pipeline`.

.. seealso:: :ref:`Aggregation expressions
   <aggregation-expression-operators>` for additional examples of the
   expressions provided by the aggregation framework.

Use
---

Invocation
~~~~~~~~~~

Invoke an :term:`aggregation` operation with the :func:`aggregate`
wrapper in the :program:`mongo` shell or the :dbcommand:`aggregate`
:term:`database command`. Always call :func:`aggregate` on a
collection object, which will determine the documents that contribute
to the beginning of the aggregation :term:`pipeline`. The arguments to
the :func:`aggregate` function specify a sequence of :ref:`pipeline
operators <aggregation-pipeline-operator-reference>`, where each
:ref:`pipeline operator <aggregation-pipeline-operator-reference>` may
have a number of operands.

First, consider a :term:`collection` of documents named "``article``"
using the following format:

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

The following example aggregation operation pivots data to
create a set of author names grouped by tags applied to an
article. Call the aggregation framework by issuing the following
command:

.. code-block:: javascript

   db.article.aggregate(
     { $project : {
        author : 1,
        tags : 1,
     } },
     { $unwind : “$tags” },
     { $group : {
        _id : { tags : 1 },
        authors : { $addToSet : “$author” }
     } }
   );

This operation uses the :func:`aggregate` wrapper around the
:term:`database command` :dbcommand:`aggregate`. The aggregation
pipleine begins with the :term:`collection` "``article``" and selects
the ``author`` and ``tags`` fields using the :agg:pipeline:`$project`
aggregation operator, and runs the :agg:expression:`$unwind` and
:agg:expression:`$group` on these fields to pivot the data.

Result
~~~~~~

The aggregation operation in the previous section returns a
:term:`JSON document` with two fields:

- ``result`` which holds an array of documents returned by the :term:`pipeline`

- ``ok`` which holds the value ``1``, indicating success, or another value
  if there was an error

As a document, the result is subject to the current :ref:`BSON
Document size <limit-maximum-bson-document-size>`.

TODO $out is not going to be available in 2.2, so I'd eliminate this reference
 If you expect the
aggregation framework to return a larger result, consider using the
use the :agg:pipeline:`$out` pipeline operator to write the output to a
collection.

Optimizing Performance
----------------------

Early Filtering
~~~~~~~~~~~~~~~

Because you will always call :func:`aggregate` on a
:term:`collection` object, which logically inserts the *entire* collection into
the aggregation pipeline, you may want to optimize the operation
by avoiding scanning the entire collection whenever possible.

If your aggregation operation requires only a subset of the data in a
collection, use the :agg:pipeline:`$match` to restrict which items go in
to the top of the
pipeline, as in a query. When placed early in a pipeline, these
:agg:pipeline:`$match` operations will use
suitable indexes to scan only the matching documents in a collection.

TODO we don't do the following yet, but there's a ticket for it.  Should we
leave it out for now?
:term:`Aggregation` operations have an optimization phase, before
execution, which attempts to re-arrange the pipeline by moving
:agg:pipeline:`$match` operators towards the beginning to the greatest
extent possible. For example, if a :term:`pipeline` begins with a
:agg:pipeline:`$project` that renames fields, followed by a
:agg:pipeline:`$match`, the optimizer can improve performance without
affecting the result by moving the :agg:pipeline:`$match` operator in
front of the :agg:pipeline:`$project`.

In future versions there may be additional optimizations of this type;
however, to ensure ideal performance place :agg:pipeline:`$match`
operators at or near the beginning of the pipeline at when possible.

Memory for Cumulative Operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Certain pipeline operators require access to the entire input set
before they can produce any output. For example, :agg:pipeline:`$sort`
must receive all of the input from the preceding :term:`pipeline`
operator before it can produce its first output document. The current
implementation of :agg:pipeline:`$sort` does not go to disk in these
cases: in order to sort the contents of the pipeline, the entire input
must fit in memory.

:agg:pipeline:`$group` has similar characteristics: Before any
:agg:pipeline:`$group` passes its output along the pipeline, it must
receive the entirety of its input. For the case of :agg:pipeline:`$group`
this frequently does not require as much memory as
:agg:pipeline:`$sort`, because it only needs to retain one record for
each unique key in the grouping specification.

The current implementation of the aggregation framework logs a warning
if a cumulative operator consumes 5% or more of the physical memory on
the host. Cumulative operators produce an error if they consume 10% or
more of the physical memory on the host.

Sharded Operation
-----------------

The aggregation framework is compatible with sharded collections.

When operating on a sharded collection, the aggregation pipeline
splits the pipeline into two parts. The aggregation framework pushes all of the
operators up to and including the first :agg:pipeline:`$group` or
:agg:pipeline:`$sort` to each shard.
[#match-sharding]_ Then, a second pipeline on the
:program:`mongos` runs. This pipeline consists of the first
:agg:pipeline:`$group` or :agg:pipeline:`$sort` and any remaining pipeline
operators; this is run on the results received from the shards.

The :program:`mongos` pipeline merges :agg:pipeline:`$sort` operations
from the shards. The :agg:pipeline:`$group`, brings any “sub-totals”
from the shards and combines them: in some cases these may be
structures. For example, the :agg:expression:`$avg` expression maintains a
total and count for each shard; the :program:`mongos` combines these
values and then divides.

.. [#match-sharding] If an early :agg:pipeline:`$match` can exclude
   shards through the use of the shard key in the predicate, then
   these operators are only pushed to the relevant shards.
