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

.. seealso:: ":doc:`/applications/aggregation`" and
   ":ref:`aggregation-framework`" for more information on the
   aggregation functionality.

.. _aggregation-pipeline-operator-reference:

Pipeline
--------

Pipeline operators appear in an array and documents pass through these
operators in a sequence. All examples in this section, assume that the
aggregation pipeline beings with a collection named "``article`` that
contains documents that resemble the following:

.. code-block:: json

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

      db.article.aggregate(
          { $project : {
              title : 1 ,
              author : 1 ,
          }}
       );

   This operation includes the ``title`` field and the ``author``
   field in the document that returns from the aggregation
   :term:`pipeline`. Because the first field specification is an
   inclusion, :aggregator:`$project` is in "inclusive" mode, and will
   return only the fields explicitly included (and the ``_id`` field.)

   .. note::

      The ``_id`` field is always included by default in the inclusive
      mode. You may explicitly exclude ``_id`` as follows:

      .. code-block:: javascript

         db.article.aggregate(
             { $project : {
                 _id : 0 ,
                 title : 1 ,
                 author : 1
             }}
         );

      Here, the projection excludes the ``_id`` field but includes the
      ``title`` and ``author`` fields.

   .. warning::

      In the inclusive mode, you may exclude *no* fields other than
      the ``_id`` field.

      A field inclusion in a projection will not create a field that
      does not exist in a document from the collection.

   In the exclusion mode, the :aggregator:`$project` returns all
   fields *except* the ones that are explicitly excluded. Consider the
   following example:

   .. code-block:: javascript

      db.article.aggregate(
          { $project : {
              comments : 0 ,
              other : 0
          }}
      );

   Here, the projection propagates all fields except for the
   "``comments``" and "``other``" fields along the pipeline.

   The :aggregator:`$project` enters **exclusive** mode when the
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

      db.article.aggregate(
          { $project : {
              title : 1,
              doctoredPageViews : { $add:["$pageViews", 10] }
          }}
      );

   Here, the field "``doctoredPageViews``" represents the value of the
   ``pageViews`` field after adding 10 to the original field using the
   :expression:`$add`.

   .. note::

      You must enclose expression that defines the computed field in
      braces, so that it resembles an object and conforms to
      JavaScript syntax.

   You may also use :aggregator:`$project` to rename fields. Consider
   the following example:

   .. code-block:: javascript

      db.article.aggregate(
          { $project : {
              title : 1 ,
              page_views : "$pageViews" ,
              florble : "$other.foo"
          }}
      );


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

      db.article.aggregate(
          { $project : {
              title : 1 ,
              stats : {
                  pv : "$pageViews",
                  foo : "$other.foo",
                  dpv : { $add:["$pageViews", 10] }
              }
          }}
      );

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
      input. Furthermore, when the aggregation framework adds computed
      values to a document, they will follow all fields from the
      original and appear in the order that they appeared in the
      :aggregator:`$project` statement.

.. aggregator:: $match

   Provides a query-like interface to filter documents out of the
   aggregation :term:`pipeline`. The :aggregator:`$match` drops
   documents that do not match the statement from the aggregation
   pipeline, and it passes documents that match along the pipeline
   unaltered.

   The syntax passed to the :aggregator:`$match` is always identical
   to the :term:`query` syntax. Consider the following prototype form:

   .. code-block:: javascript

      db.article.aggregate(
          { $match : <match-predicate> }
      );

   The following example performs a simple field equality test:

   .. code-block:: javascript

      db.article.aggregate(
          { $match : { author : "dave" } }
      );

   This operation only returns documents where the "``author``" field
   holds the value "``dave``". Consider the following example,
   which performs a range test:

   .. code-block:: javascript

      db.article.aggregate(
          { $match : { score  : { $gt : 50, $lte : 90 } } }
      );

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
      advantage of :term:`indexes <index>` like any other
      :func:`find()` or :func:`findOne()`.

.. aggregator:: $limit

   Restricts the number of :term:`JSON documents <json document>` that
   pass through the :aggregator:`$limit` in the :term:`pipeline`.

   :aggregator:`$limit` takes a single numeric (positive whole number)
   value as a parameter. Once the specified number of documents pass
   through the pipeline operator, no more will. Consider the following
   example:

   .. code-block:: javascript

      db.article.aggregate(
          { $limit : 5 }
      );

   This operation returns only the first 5 documents passed to it from
   by the pipeline. :aggregator:`$limit` has no effect on the content
   of the documents it passes.

.. aggregator:: $skip

   Skips over a number of :term:`JSON document <json document>` that
   pass through the :aggregator:`$limit` in the
   :term:`pipeline`. before passing all of the remaining input.

   :aggregator:`$skip` takes a single numeric (positive whole number)
   value as a parameter. Once the operation has skipped the specified
   number of documents it passes all remaining documents along the
   :term:`pipeline` without alteration. Consider the following
   example:

   .. code-block:: javascript

      db.article.aggregate(
          { $skip : 5 }
      );

   This operation skips the first 5 documents passed to it by the
   pipeline. :aggregator:`$skip` has no effect on the content of the
   documents it passes along the pipeline.

.. aggregator:: $unwind

   Peels off the elements of an array individually, and returns a
   stream of documents. :aggregator:`$unwind` returns one document for
   every member of the unwound array, within every source
   document. Take the following aggregation command:

   .. code-block:: javascript

      db.article.aggregate(
          { $project : {
              author : 1 ,
              title : 1 ,
              tags : 1
          }},
          { $unwind : "$tags" }
      );

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
   values based on a collection of documents. Practically, group often
   supports tasks such as average page views for each page in a
   website on a daily basis.

   The output of :aggregator:`$group` depends on how you define
   groups. Begin by specifying an identifier (i.e. a "``_id``" field)
   for the group you're creating with this aggregator. You can specify
   a single field from the documents in the pipeline, or specify a
   previously computed value.

   Every group expression must specify an "``_id``" field, which is
   naturally unique. You may specify the "``_id``" field as a dotted
   field path reference, a document with multiple fields enclosed in
   braces (i.e. "``{``" and "``}``"), or constant with a single
   value. Always prefix the "``_id``" with a dollar sign
   (i.e. "``$``".)

   .. note::

      Use :aggregator:`$project` as needed to rename the grouped field
      after an :aggregator:`$group` operation, if necessary.

   Consider the following example:

   .. code-block:: javascript

      db.article.aggregate(
          { $group : {
              _id : "$author",
              docsPerAuthor : { $sum : 1 },
              viewsPerAuthor : { $sum : "$pageViews" }
          }}
      );

   This groups by the "``author``" field and computes two fields, the
   first "``docsPerAuthor``" is a counter field that increments for
   each document with a given author field using the :group:`$sum`
   function. The "``viewsPerAuthor``" field derives from summation of
   all of the "``pageViews``" fields in the grouped documents.

   Each field that the :aggregator:`$group` must use one of the group
   aggregation function listed below to generate its composite value:

   .. group:: $addToSet

      Returns an array of all the values found in the selected field
      among the documents in that group. *Every unique value only
      appears once* in the result set.

   .. group:: $first

      Returns the first value it sees for its field argument.

      .. note::

         Only use :group:`$first` when the :aggregator:`$group`
         follows an :aggregator:`$sort` operation. Otherwise, the
         result of this operation is unpredictable.

   .. group:: $last

      Returns the last value it sees for its field argument.

      .. note::

         Only use :group:`$last` when the :aggregator:`$group`
         follows an :aggregator:`$sort` operation. Otherwise, the
         result of this operation is unpredictable.

   .. group:: $max

      Returns the highest value among all values of the field in all
      documents selected by this group.

   .. group:: $min

      Returns the lowest value among all values of the field in all
      documents selected by this group.

   .. group:: $push

      Returns an array of all the values found in the selected field
      among the documents in that group. *A value may appear more than
      once* in the result set if more than one field in the grouped
      documents has that value.

   .. group:: $sum

      Returns the total or summation of all values for a specified
      filed in the grouped documents, as in the second use above.

      Alternately, if you specify a value as an argument,
      :group:`$sum` will increment this field by the specified value
      for every document in the grouping. Typically, as in the first
      use above, specify a value of "``1`` " to create a *counter.*

   .. warning::

      The aggregation system stores :aggregator:`$group` operations in
      memory, which may cause problems when processing a larger number
      of groups.

.. aggregator:: $sort

   The :aggregator:`$sort` :term:`pipeline` operator sorts all input
   documents and returns them to the pipeline in sorted
   order. Consider the following prototype form:

   .. code-block:: javascript

      db.<collection-name>(
          { $sort : { <sort-key> } }
      );

   This sorts the documents in the collection named
   "``<collection-name>``", according to the key and specification in
   the "``{ <sort-key> }``" document.

   The sorting configuration is identical to the specification of an
   :term:`index`. Within a document, specify a field or fields that
   you want to sort by and a value of "``1``" or "``-1``" to specify
   an ascending or descending sort receptively. See the following
   example:

   .. code-block:: javascript

      db.users.aggregate(
          { $sort : { age : -1, posts: 1 } }
      );

   This operation sorts the documents in the "``users``" collection,
   in ascending order according by the "``age``" field and then in
   descending order according to the value in the "``posts``" field.

   .. note::

      The :aggregator:`$sort` cannot begin sorting documents until
      previous operators in the pipeline have returned all output.

   .. warning:: The entire sort operation as of the current release
      operates entirely in memory, which may cause problems when
      sorting large numbers of documents.

.. aggregator:: $out

   Use :aggregator:`$out` to write the contents of the
   :term:`pipeline`, without concluding the aggregation
   procedure. Specify the name of a collection as an argument to
   :aggregator:`$out`. Consider the following trivial example:

   .. code-block:: javascript

      db.article.aggregate(
          { $out : "users2" }
      );

   This command reads all documents in the "``users``" collection and
   writes them to the "``users2``" collection. The documents are then
   returned by the aggregation framework in an array, which is the
   default behavior.

.. _aggregation-expression-operators:

Expressions
-----------

These operators perform transformations within the :term:`aggregation
framework`.

Boolean Operators
~~~~~~~~~~~~~~~~~

The three boolean operators accept take Booleans as arguments and
return Booleans as results.

.. note::

   These operators convert non-boolean to Boolean values according to
   the BSON standards. Here, "Null," undefined, and "zero" values
   become "false," while non-zero numeric values, strings, dates,
   objects, and other types become "true."

.. expression:: $and

   Takes an array and returns ``true`` if *all* of the values in the
   array are ``true``. Otherwise :expression:`$and` returns false.

   .. note::

      :expression:`$and` uses short-circuit logic: the operation will
      stops evaluating after encountering the first ``false`` expression.

.. expression:: $not

   Returns the boolean opposite value passed to it. When passed a
   "``true``" value, :expression:`$not` returns ``false``; when passed
   a "``false``" value, :expression:`$not` returns ``true``.

.. expression:: $or

   Takes an array and returns ``true`` if *any* of the values in the
   array are ``true``. Otherwise :expression:`$or` returns false.

   .. note::

      :expression:`$or` uses short-circuit logic: the operation will
      stops evaluating after encountering the first ``false``
      expression.

Comparison Operators
~~~~~~~~~~~~~~~~~~~~

These operators perform comparisons between two values and return a
Boolean, in most cases, reflecting that comparison.

All comparison operators take a pair of numbers or an array with a
pair of strings. Except for :expression:`$cmp`, all comparison
operators return a Boolean value. :expression:`$cmp` returns an
integer.

.. expression:: $cmp

   Takes two values, either a pair of numbers or an array with a pair
   of strings, and returns an integer. The returned value is:

   - A negative number if the first number is less than the second.

   - A positive number if the first number is greater than the second.

   - ``0`` if the the values are equal.

.. expression:: $eq

   Takes two values, either a pair of numbers or an array with a pair
   of strings, and returns a Boolean. The returned value is:

   - ``true`` when the values are equivalent.

   - ``false`` when the values are **not** equivalent.

.. expression:: $gt

   Takes two values, either a pair of numbers or an array with a pair
   of strings, and returns a Boolean. The returned value is:

   - ``true`` when the first value is *greater than* the second value.

   - ``false`` when the first value is *less than or equal to* the
     second value.

.. expression:: $gte

   Takes two values, either a pair of numbers or an array with a pair
   of strings, and returns a Boolean. The returned value is:

   - ``true`` when the first value is *greater than or equal* to the
     second value.

   - ``false`` when the first value is *less than* the second value.

.. expression:: $lt

   Takes two values, either a pair of numbers or an array with a pair
   of strings, and returns a Boolean. The returned value is:

   - ``true`` when the first value is *less than* the second value.

   - ``false`` when the first value is *greater than or equal to* the
     second value.

.. expression:: $lte

   Takes two values, either a pair of numbers or an array with a pair
   of strings, and returns a Boolean. The returned value is:

   - ``true`` when the first value is *less than or equal to* the
     second value.

   - ``false`` when the first value is *greater than* the second
     value.

.. expression:: $ne

   Takes two values, either a pair of numbers or an array with a pair
   of strings, and returns a Boolean. The returned value is:

   - ``true`` when the values are **not equivalent**.

   - ``false`` when the values are equivalent.

Arithmetic Operators
~~~~~~~~~~~~~~~~~~~~

.. expression:: $add

   Takes an array of numbers and adds them together, returning the
   sum.

   - If the array contains a string, :expression:`$add` concatenates
     all items and returns the result as a string.

   - If the array contains a date and no strings, :expression:`$add`
     treats all numbers as a quantity of days and adds them to the
     date. The result has the date type.

.. expression:: $divide

   Takes an array that contains a pair of numbers and returns the
   value of the first number divided by the second number.

.. expression:: $mod

   Takes an array that contains a pair of numbers and returns the
   *remainder* of the first number divided by the second number.

   .. seealso:: :operator:`$mod`

.. expression:: $multiply

   Takes an array of numbers and multiples them, returning the
   resulting product.

.. expression:: $subtract

   Takes an array that contains a pair of numbers and subtracts the
   second from the first, returning their difference.

   .. note::

      If the first entry in the array is a date,
      :expression:`$subtract` treats the second entry, a number, as a
      number of days and decrements the date, returning the resulting
      date.

.. expression:: $avg

   Takes an array of numbers and returns and computes the arithmetic
   mean. :expression:`$avg` returns the average.

String Operators
~~~~~~~~~~~~~~~~

These operators manipulate strings within aggregation :term:`pipeline`
operators.

.. expression:: $strcasecmp

   Takes in two strings. Returns a number, of JavaScript type "long."
   :expression:`$strcasecmp` is positive if the first string is
   "greater than" the second and negative if the first string is "less
   than" the second. :expression:`$strcasecmp` returns 0 if the
   strings are identical.

   .. note::

      :expression:`$strcasecmp` capitalizes all strings, and thus
      provides a case-*insensitive* comparison. Use :expression:`$cmp`
      for a case sensitive comparison.

.. expression:: $substr

   :expression:`$substr` takes a string and two numbers. The first
   number represents the number of characters in the string to skip,
   and the second number specifies the number of characters to return
   from the string.

.. expression:: $toLower

   Takes a single string and converts that string to lowercase,
   returning the result. All uppercase letters become lowercase.

.. expression:: $toUpper

   Takes a single string and converts that string to uppercase,
   returning the result. All lowercase letters become uppercase.

.. seealso:: ":expression:`$add`" can also manipulate string objects.


Date Operators
~~~~~~~~~~~~~~

All date operators, except :expression:`$add` and
:expression:`$subtract`, take a "Date" typed object as a single
argument and return a JavaScript "long" typed number object.

.. expression:: $dayOfMonth

   Takes a date object and returns the day of the month as a number
   between 1 and 31.

.. expression:: $dayOfWeek

   Takes a date object and returns the day of the week as a number
   between 1 and 7.

.. expression:: $dayOfYear

   Takes a date object and returns the day of the year as a number
   between 1 and 366.

.. expression:: $hour

   Takes a date object and returns the hour between 0 and 23.

.. expression:: $minute

   Takes a date object and returns the minute between 0 and 59.

.. expression:: $month

   Takes a date object and returns the month as a number between 1 and 12.

.. expression:: $second

   Takes a date object and returns the second between 0 and 59.

.. expression:: $week

   Takes a date object and returns the week of the year as a number
   between 0 and 53.

   Weeks start on Sundays and the days before the first Sunday of the
   year are in "week 0."

.. expression:: $year

   Takes a date object and returns a four digit number.

.. seealso:: ":expression:`$add`" and ":expression:`$subtract` can
   also manipulate date objects.

Multi-Expressions
~~~~~~~~~~~~~~~~~

.. expression:: $ifNull

   Takes an array with two expressions. :expression:`$ifNull` returns
   the first expression if it evaluates to a non-false
   value. Otherwise, :expression:`$ifNull` returns the second
   expression’s value.

.. expression:: $cond

   Takes an array with three expressions, where the first expression
   evaluates to a Boolean value. If the first expression is true,
   :expression:`$cond` returns the second expression. If the first
   expression is false, :expression:`$cond` evaluates and returns the
   third expression.
