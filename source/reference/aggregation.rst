===============================
Aggregation Framework Operators
===============================

.. default-domain:: mongodb

The aggregation framework makes it possible to project or control the
output of the query, without using ":term:`map reduce`," using the
same syntax and form as queries itself.

This documentation provides an overview of all aggregation operators,
their use, and their behavior.

.. seealso:: ":doc:`/core/aggregation`" for more information on the
   aggregation functionality.

.. _aggregation-pipeline-operators:

Pipeline
~~~~~~~~

.. seealso:: <http://www.mongodb.org/display/DOCS/Aggregation+Framework+-+Expression+Reference>

Pipeline operators appear in an array. Documents pass through these
operators and come out at the other end.

.. aggregator:: $project

   -  [$project\|Aggregation Framework - $project] \\- select columns or
      sub-columns, create computed values or sub-objects

.. aggregator:: $match

-  [$match\|Aggregation Framework - $match] \\- filter documents out
   from the document stream

.. aggregator:: $limit

-  [$limit\|Aggregation Framework - $limit] \\- limit the number of
   documents that pass through the document stream

.. aggregator:: $skip

-  [$skip\|Aggregation Framework - $skip] \\- skip over a number of
   documents that pass through the document stream

.. aggregator:: $unwind

-  [$unwind\|Aggregation Framework - $unwind] \\- unwind an array,
   subsituting each value in the array for the array within the same
   document

.. aggregator:: $group

-  [$group\|Aggregation Framework - $group] \\- group documents by key
   and calculate aggregate values for the group

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

.. expression:: $something

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
