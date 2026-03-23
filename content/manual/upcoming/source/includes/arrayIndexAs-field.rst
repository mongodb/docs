Optional. A name for the :ref:`aggregation variable
<aggregation-variables>` that represents the index of the current
element in the ``input`` array. The first array element index is ``0``.

You can use the variable name in an expression. For example, if you
specify ``arrayIndexAs: "myIndex"``, you use ``$$myIndex`` in the
expression. ``$$myIndex`` returns the index of the current element in
the ``input`` array.

If you omit ``arrayIndexAs``, you can use the :variable:`$$IDX <IDX>`
system variable in the expression to return the index of the current
element.
