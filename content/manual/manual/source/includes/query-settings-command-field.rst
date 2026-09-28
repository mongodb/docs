Optional. Query settings that apply only to this execution of the
command. The ``querySettings`` document accepts the following fields: 

- ``indexHints``
- ``queryFramework``
- ``reject``
- ``comment``

For descriptions of these fields, see :ref:`setQuerySettings-fields`.

MongoDB doesn't store these settings on the cluster, and
they don't apply to other queries with the same :ref:`query shape
<query-shapes>`. To set query settings that persist for a query
shape, use :dbcommand:`setQuerySettings`.

MongoDB combines the settings that you pass in the command with any
query settings stored on the cluster for the same query shape. If both settings
specify the same field, the stored cluster setting takes precedence.

.. versionadded:: 9.0
