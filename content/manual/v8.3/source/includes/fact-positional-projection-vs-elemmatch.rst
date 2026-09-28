Both the :projection:`$` operator and the :projection:`$elemMatch` operator project
the **first** matching element from an array based on a condition.

The :projection:`$` operator projects the first matching array element from each 
document in a collection based on some condition from the query statement.

The :projection:`$elemMatch` projection operator takes an explicit condition
argument.  This allows you to project based on a condition not in the query, or
if you need to project based on multiple fields in the array's embedded documents.
See :ref:`array-field-limitation` for an example.
