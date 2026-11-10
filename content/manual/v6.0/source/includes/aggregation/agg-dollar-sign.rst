.. note:: Dollar Characters in Field Values

    When you use an aggregation pipeline, sanitize any strings that are passed from user
    input or created dynamically from parsing data. If any field values are literal string
    values and start with a dollar character, the value must be passed to the
    :expression:`$literal` aggregation operator. The following example demonstrates using
    the aggregation pipeline ``$set`` and the ``$literal`` operator to update the document
    with an ``_id`` of ``1`` to have a ``cost`` field of ``$27``.

    .. code-block:: javascript

       db.inventory.updateOne( { _id: 1 }, [ { $set: { "cost": { $literal: "$27" } } } ] )
