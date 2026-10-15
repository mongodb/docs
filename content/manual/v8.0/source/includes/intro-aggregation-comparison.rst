Comparison expressions return a boolean except for :expression:`$cmp`
which returns a number.

The comparison expressions take two argument expressions and compare
both value and type, using the :ref:`specified BSON comparison order
<bson-types-comparison-order>` for values of different types. Unlike the
inequality :ref:`query predicates <query-selectors-comparison>`, the
comparison expressions do not use :ref:`type bracketing
<type-bracketing>`.
