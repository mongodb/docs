.. note:: Implicit AND

    Specifying multiple criteria is common. If you don't specify any query operators,
    the driver interprets your criteria in an AND fashion. However, sometimes you
    must be explicit when specifying multiple criteria, particularly
    when specifying criteria on the same field.

    For example, to find documents in the ``{+guides-coll+}`` collection that have
    an ``orderFromSun`` value greater than ``2`` AND less than ``5``, you must
    use the ``$and`` query operator.

    .. include:: /includes/crud/drivers_implicit_and.rst

    If you do not use the ``$and`` operator, the driver encounters the
    same key multiple times in the query filter, and uses the last
    key encountered. Try omitting the ``$and`` operator and see what
    happens.




