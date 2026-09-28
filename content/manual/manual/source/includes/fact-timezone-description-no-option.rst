The timezone to carry out the operation. ``<tzExpression>`` must be a
valid :ref:`expression <aggregation-expressions>` that resolves to a
string formatted as either an `Olson Timezone Identifier
<https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>`_ or a
`UTC Offset <https://en.wikipedia.org/wiki/List_of_UTC_time_offsets>`_:

- Olson Timezone Identifier: for example, ``"America/New_York"``,
  ``"Europe/London"``, ``"GMT"``
- UTC Offset: for example, ``"+04:45"``, ``"-0530"``, ``"+03"``

If you omit ``timezone``, the result is displayed in ``UTC``.