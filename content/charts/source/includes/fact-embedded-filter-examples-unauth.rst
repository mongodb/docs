Your filter must match the format used in a
:pipeline:`$match` query and
be either a:

- Top level query

  .. example::

     .. code-block:: json

        { "quantity": { $gte: 20 } }

- Or within boolean expressions (
  :query:`$and`,
  :query:`$nor`,
  :query:`$or`)

  .. example::

     .. code-block:: json

        { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }
