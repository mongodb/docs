Both the :projection:`$` operator and the :projection:`$elemMatch` operator project
a subset of elements from an array based on a condition.

The :projection:`$` operator projects the array elements based on some condition
from the query statement.

The :projection:`$elemMatch` projection operator takes an explicit condition
argument.  This allows you to project based on a condition not in the query, or
if you need to project based on multiple fields in the array's embedded documents.
See :ref:`array-field-limitation` for an example.
