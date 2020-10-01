``Optional.`` The timezone of the operation result.
``<tzExpression>`` must be a valid :ref:`expression
<aggregation-expressions>` that resolves to a string formatted as either
an `Olson Timezone Identifier
<https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>`_ or a
`UTC Offset <https://en.wikipedia.org/wiki/List_of_UTC_time_offsets>`_.
If no ``timezone`` is provided, the result is displayed in ``UTC``.

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - ``Format``
     - ``Examples``

   * - ``Olson Timezone Identifier``

     - ::

         "America/New_York"
         "Europe/London"
         "GMT"

   * - ``UTC Offset``

     - ::

         +/-[hh]:[mm], e.g. "+04:45"
         +/-[hh][mm], e.g. "-0530"
         +/-[hh], e.g. "+03"
