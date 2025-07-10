Your filter must match the format used in a
:manual:`$match </reference/operator/aggregation/match/>` query and
be either a:

- Top level query

  .. example::

     .. code-block:: json

        { "quantity": { $gte: 20 } }

- Or within boolean expressions (
  :manual:`$and </reference/operator/query/and/>`,
  :manual:`$nor </reference/operator/query/nor/>`,
  :manual:`$or </reference/operator/query/or/>`)

  .. example::

     .. code-block:: json

        { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }
