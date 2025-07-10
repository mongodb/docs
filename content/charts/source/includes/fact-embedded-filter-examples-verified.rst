Your filter must match the format used in a
:manual:`$match </reference/operator/aggregation/match/>` query as
shown in the following examples:

.. example::

   .. code-block:: json

      { "quantity": { $gte: 20 } }

.. example::

   .. code-block:: json

      { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }
