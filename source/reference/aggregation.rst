===============================
Aggregation Framework Operators
===============================

.. versionadded:: 2.1.0

.. default-domain:: mongodb

The aggregation framework provides the ability to project, process,
and/or control the output of the query, without using ":term:`map
reduce`." Aggregation uses a syntax that closely resembles the same
syntax and form as "regular" MongoDB database queries.

This documentation provides an overview of all aggregation operators,
their use, and their behavior.

.. seealso:: ":doc:`/core/aggregation`" and
   ":ref:`aggregation-framework`" for more information on the
   aggregation functionality.

.. _aggregation-pipeline-operator-reference:

Pipeline
--------

Pipeline operators appear in an array and documents pass through these
operators in a sequence. All examples in this section, assume that the
aggregation pipeline beings with a collection named "``article`` that
contains documents that resemble the following:

.. code-block:: javascript

   {
    title : "this is my title" ,
    author : "bob" ,
    posted : new Date() ,
    pageViews : 5 ,
    tags : [ "fun" , "good" , "fun" ] ,
    comments : [
        { author :"joe" , text : "this is cool" } ,
        { author :"sam" , text : "this is bad" }
    ],
    other : { foo : 5 }
   }

The current pipeline operators are:

.. aggregator:: $project

   Reshapes a document stream by renaming, adding, or removing
   fields. Also use :aggregator:`$project` to create computed values
   or sub-objects. Use :aggregator:`$project` to:

   - Include fields from the original document.
   - Exclude fields from the original document.
   - Insert computed fields.
   - Rename fields.
   - Create and populate fields that hold sub-documents.

   Use :aggregator:`$project` to quickly select the fields that you
   want to include or exclude from the response. Consider the
   following aggregation framework operation.

   .. code-block:: javascript

      db.runCommand(
      { aggregate : "article", pipeline : [
          { $project : {
              title : 1 ,
              author : 1 ,
          }}
       ]});

   This operation includes the ``title`` field and the ``author``
   field in the document that is returned from the aggregation
   :term:`pipeline`. Because the first field specification is an
   inclusion, :aggregator:`$project` is in "inclusive" mode, and will
   return only the fields explicitly included (and the ``_id`` field.)

   .. note::

      The ``_id`` field is always included by default in the inclusive
      mode. You may explicitly exclude ``_id`` as follows:

      .. code-block:: javascript

         db.runCommand(
         { aggregate : "article", pipeline : [
             { $project : {
                 _id : 0 ,
                 title : 1 ,
                 author : 1
             }}
         ]});

      Here, the projection excludes the ``_id`` field but includes the
      ``title`` and ``author`` fields.

   .. warning::

      In the inclusive mode, *no* fields other than the ``_id`` field
      may be excluded.

      A field inclusion in a projection will not create a field that
      does not exist in a document from the collection.

   In the exclusion mode, all fields *except* the ones that are
   specifically excluded are returned. Consider the following example:

   .. code-block:: javascript

      db.runCommand(
      { aggregate : "article", pipeline : [
          { $project : {
              comments : 0 ,
              other : 0
          }}
      ]});

:aggregator:`$match`:aggregator:`$match`   Here, the projection includes all fields except for the
   "``comments``" and "``other``" field are retained and passed along
   the pipeline.

   The :aggregator:`$project` is placed in **exclusive** mode when the
   first field in the projection is an exclusion. When the first field
   is an **inclusion** the projection is inclusive.

   .. note::

      In exclusive mode, no fields may be explicitly included by
      declaring them with a "``: 1``" in the projection statement.

   Projections can also add computed fields to the document stream
   passing through the pipeline. A computed field can use any of the
   :ref:`expression operators <aggregation-expression-operators>`.
   Consider the following example:

   .. code-block:: javascript

      db.runCommand(
      { aggregate : "article", pipeline : [
          { $project : {
              title : 1,
              doctoredPageViews : { $add:["$pageViews", 10] }
          }}
      ]});

   Here, the field "``doctoredPageViews``" represents the value of the
   ``pageViews`` field after adding 10 to the original field using the
   :expression:`$add`.

   .. note::

      The expression that defines the computed field must be enclosed
      in braces, so that it resembles an object and conforms to
      JavaScript syntax.

   You may also use :aggregator:`$project` to rename fields. Consider
   the following example:

   .. code-block:: javascript

      db.runCommand(
      { aggregate : "article", pipeline : [
          { $project : {
              title : 1 ,
              page_views : "$pageViews" ,
              florble : "$other.foo"
          }}
      ]});


   This operation renames the "``pageViews``" field "``page_views``",
   and renames the "``foo``" field in the "``other``" sub-document as
   the top-level field "``florable``". The field references used for
   renaming fields are a direct expression and do not use an operator
   or surrounding braces. All aggregation field references can use
   dotted paths to refer to fields in nested documents.

   Finally, you can use the :aggregator:`$project` to create and
   populates new sub-documents. Consider the following example that
   creates a new field named ``stats`` that holds a number of values:

   .. code-block:: javascript

      db.runCommand(
      { aggregate : "article", pipeline : [
          { $project : {
              title : 1 ,
              stats : {
                  pv : "$pageViews",
                  foo : "$other.foo",
                  dpv : { $add:["$pageViews", 10] }
              }
          }}
      ]});

   This projection selects the ``title`` field and places
   :aggregator:`$project` into "inclusive" mode. Then, it creates the
   ``stats`` documents with the following fields:

   - "``pv``" which includes and renames the "``pageViews``" from the
     top level of the original documents.
   - "``foo``" which includes the "``foo``" document from the
     "``other``" sub-document of the original documents.
   - "``dpv``" which is a computed field that adds 10 to the value of
     the "``pageViews``" field in the original document using the
     :expression:`$add` aggregation expression.

   .. note::

      Because of the :term:`BSON` requirement to preserve field order,
      projections output fields in the same order that they were
      input. Furthermore, when computed values are added to a
      document, they will follow all fields from the original and
      appear in the order that they appeared in the
      :aggregator:`$project` statement.

.. aggregator:: $match

   Provides a query-like interface to filter documents out of the
   aggregation :term:`pipeline`. Documents that do not match the
   statement are dropped, and documents that do match are passed along
   the pipeline unaltered.

   The syntax passed to the :aggregator:`$match` is always identical
   to the :term:`query` syntax. Consider the following prototype form:

   .. code-block:: javascript

      db.runCommand(
      { aggregate : "article", pipeline : [
          { $match : <match-predicate> }
      ]});

   The following example performs a simple field equality test:

   .. code-block:: javascript

      db.runCommand(
      { aggregate : "article", pipeline : [
          { $match : { author : "dave" } }
      ]});

   This operation only returns documents where the "``author``" field
   holds the value "``dave``". Consider the following example,
   which performs a range test:

   .. code-block:: javascript

      db.runCommand(
      { aggregate : "article", pipeline : [
          { $match : { score  : { $gt : 50, $lte : 90 } } }
      ]});

   Here, all documents return when the ``score`` field holds a value
   that is greater than 50, but less than or equal to 90.

   .. seealso:: :operator:`$gt` and :operator:`$lte`.

   .. note::

      Place the :aggregator:`$match` as early in the aggregation
      :term:`pipeline` as possible. Because :aggregator:`$match`
      limits the total number of documents in the aggregation
      pipeline, earlier :aggregator:`$match` operations minimize the
      amount of later processing. If you place a :aggregator:`$match`
      at the very beginning of a pipeline, the query can take
      advantage of :term:`indexes` like any other :js:func:`find()` or
      :js:func:`findOne()`.

.. aggregator:: $limit

   Restricts the number of :term:`JSON documents <json document>` that
   pass through the :aggregator:`$limit` in the :term:`pipeline`.

   :aggregator:`$limit` takes a single numeric (positive whole number)
   value as a parameter. Once the specified number of documents pass
   through the pipeline operator, no more will. Consider the following
   example:

   .. code-block:: javascript

      db.runCommand(
      { aggregate : "article", pipeline : [
          { $limit : 5 }
      ]});

   This operation returns only the first 5 documents passed to it from
   by the pipeline. :aggregator:`$limit` has no effect on the content
   of the documents it passes.

.. aggregator:: $skip

   Skips over a number of :term:`JSON document <json document>` that
   pass through the :aggregator:`$limit` in the
   :term:`pipeline`. before passing all of the remaining input.

   :aggregator:`$skip` takes a single numeric (positive whole number)
   value as a parameter. Once the operation has skipped the specified
   number of documents, all remaining documents are passed along the
   :term:`pipeline` without alteration. Consider the following
   example:

   .. code-block:: javascript

      db.runCommand(
      { aggregate : "article", pipeline : [
          { $skip : 5 }
      ]});

   This operation skips the first 5 documents passed to it by the
   pipeline. :aggregator:`$skip` has no effect on the content of the
   documents it passes along the pipeline.

.. aggregator:: $unwind

   Peels off the elements of an array individually, and returns a
   stream of documents. :aggregator:`$unwind` returns one document for
   every member of the unwound array, within every source
   document. Take the following aggregation command:

   .. code-block:: javascript

      db.runCommand(
      { aggregate : "article", pipeline : [
          { $project : {
              author : 1 ,
              title : 1 ,
              tags : 1
          }},
          { $unwind : "$tags" }
      ]});

   .. note::

      The dollar sign (i.e. "``$``") must proceed the field
      specification handed to the :aggregator:`$unwind` operator.

   In the above aggregation :aggregator:`$project`, and selects
   (inclusively) the ``author``, ``title``, and ``tags`` fields, as
   well as the ``_id`` field implicitly. Then the pipeline passes the
   results of the projection to the :aggregator:`$unwind` operator,
   which will unwind the "``tags`` field. This operation may return
   a sequence of documents that resemble the following for a
   collection that contains one document holding a "``tags``" field
   with an array of 3 items.

   .. code-block:: javascript

      {
           "result" : [
                   {
                           "_id" : ObjectId("4e6e4ef557b77501a49233f6"),
                           "title" : "this is my title",
                           "author" : "bob",
                           "tags" : "fun"
                   },
                   {
                           "_id" : ObjectId("4e6e4ef557b77501a49233f6"),
                           "title" : "this is my title",
                           "author" : "bob",
                           "tags" : "good"
                   },
                   {
                           "_id" : ObjectId("4e6e4ef557b77501a49233f6"),
                           "title" : "this is my title",
                           "author" : "bob",
                           "tags" : "fun"
                   }
           ],
           "OK" : 1
      }

   A single document becomes 3 documents: each document is identical
   except for the value of the ``tags`` field. Each value of ``tags``
   is one of the values in the original "tags" array.

   .. note::

      The following behaviors are present in :aggregator:`$unwind`:

      - :aggregator:`$unwind` is most useful in combination
        with :aggregator:`$group`.

      - The effects of an unwind can be undone with the
        :aggregator:`$push` or :aggregator:`$group` pipeline
        operators.

      - If you specify a target field for :aggregator:`$unwind` that
        does not exist in an input document, the document passes
        through :aggregator:`$unwind` unchanged.

      - If you specify a target field for :aggregator:`$unwind` that
        is not an array, the :dbcommand:`aggregate` generates an error.

      - If you specify a target field for :aggregator:`$unwind` that
        holds an empty array ("``[]``"), then the document passes
        through unchanged.

.. aggregator:: $group

   Groups documents together for the purpose of calculating aggregate
   values based on a collection of documents. Practically, you may use
   this functionality to calculate the average number of page views
   for each page in a website on a daily basis.



   - [$group\|Aggregation Framework - $group] \\- group documents by
     key and calculate aggregate values for the group



   .. group:: $addToSet

   .. group:: $first

   .. group:: $last

   .. group:: $max

   .. group:: $min

   .. group:: $push

   .. group:: $sum

.. aggregator:: $sort

-  [$sort\|Aggregation Framework - $sort] \\- sort documents by key

.. aggregator:: $out

-  [$out\|Aggregation Framework - $out] \\- save documents to a
   collection and pass them on like a tee

.. _aggregation-expression-operators:

Expressions
-----------

These operators perform transformations within the :term:`aggregation
framework`.

Boolean Operators
~~~~~~~~~~~~~~~~~

All boolean operators take booleans as their arguments and return
booleans. Non-boolean values passed as input are converted to booleans
as per BSON standards. So numeric values that are not zero treated as
true, as a strings, dates, objects, arrays, etc. However, Null,
undefined, and zero are treated as false.

.. expression:: $and

**$and** takes an array and returns true if all of the values passed are
true and false otherwise. Note: $and uses short-circuit logic, meaning
it will stop evaluation when it encounters the first false expression.

.. expression:: $not

**$not** returns the opposite of the boolean value it is passed (true if
handed false and false if handed true).

.. expression:: $or

**$or** takes an array and returns true if any of the values passed are
true and false otherwise. Note: $or uses short-circuit logic, meaning it
will stop evaluation when it encounters the first true expression.

Arithmetic Operators
~~~~~~~~~~~~~~~~~~~~

.. expression:: $add

**$add** takes an array of numbers and adds them together, returning
their sum.
\* If a string is present in the array, all the values will be appended
to one another in the order they are passed and returned as a string.

-  If a date is present in the array (and no strings are), all numeric
   values are treated as a number of days and added to the date, the
   resulting date is returned.

.. expression:: $divide

**$divide** takes an array containing a pair of numbers and returns the
value of the first number divided by the second number.

.. expression:: $mod

**$mod** takes an array containing a pair of numbers and computes and
returns the remainder of the first number divided by the second number.

.. expression:: $multiply

**$multiply** takes an array of numbers and multiples them together, the
resulting product is returned.

.. expression:: $subtract

**$subtract** takes an array containing a pair of numbers and subtracts
the second from the first, returning their difference.
\* If a date is passed as the first entry in the array, the number will
be treated as a number of days and removed from the date, the resulting
date is returned.

String Operators
~~~~~~~~~~~~~~~~

.. expression:: $strcasecmp

**$strcasecmp** takes in two strings and returns a Javascript long that
is positive if the first string is “greater than” the second, is
negative if the first string is “less than” the second, and 0 if they
are the same string. Note: unlike $cmp the strings are capitalized
before being compared, so $strcmp is case insensitive.

.. expression:: $substr

**$substr** takes a string and two numbers, the first number represents
the number of characters to skip in the original string and the second
is the number of characters to take from the original string. The
resulting string is returned.

.. expression:: $toLower

**$toLower** takes in a single string and returns the same string with
all uppercase letters replace with their lowercase equivalents.

.. expression:: $toUpper

**$toUpper** takes in a single string and returns the same string with
all lowercase letters replace with their uppercase equivalents.

.. seealso::

   **$add** [see Arithmetic Add \|#Arithmetic Operators]


Date Operators
~~~~~~~~~~~~~~

All date operators, except $add and $subtract, take a Date as their
single argument and return a Javascript long.

.. expression:: $dayOfMonth

**$dayOfMonth** returns the day of the month as a number between 1 and
31.

.. expression:: $dayOfWeek

**$dayOfWeek** returns the day of the week as a number between 1 and 7.

.. expression:: $dayOfYear

**$dayOfYear** returns the day of the year as a number between 1 and
366.

.. expression:: $hour

**$hour** returns the hour between 0 and 23.

.. expression:: $minute

**$minute** returns the minute between 0 and 59.

.. expression:: $month

**$month** returns the month as a number between 1 and 12.

.. expression:: $second

**$second** returns the second between 0 and 59.

.. expression:: $week

**$week** returns the week of the year as a number between 0 and 53.
Weeks start on Sundays and the days before the first Sunday of the year
are in week 0.

.. expression:: $year

**$year** returns the four digit year.

.. seealso::

   **$add** [see Arithmetic Add \|#Arithmetic Operators]

   **$subtract** [see Arithmetic Subtract \|#Arithmetic Operators]

Other
~~~~~

.. expression:: $ifNull

**$ifNull** takes an array of two expressions. If the first expression
evaluates to a non-false value, it is returned. Otherwise, the second
expression’s value is returned.

.. expression:: $cond

**$cond** takes an array of three expressions, the first of which should
evaluate to a boolean value. If the first expression is true, $cond
evaluates and returns the second expression. If the first expression is
false, $cond evaluates and returns the third expression.
