:projection:`$elemMatch`, :projection:`$slice`, and
:projection:`$` are the only operators that you can use to project specific elements
to include in the returned array. For instance, you cannot
project specific array elements using the array index; e.g.
``{ "instock.0": 1 }`` projection does not project the array
with the first element.