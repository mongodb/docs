.. versionadded:: 8.0

You can use query settings to set index hints, set :ref:`operation
rejection filters <operation-rejection-filters>`, and other fields. The
settings apply to the :ref:`query shape <queryStats-queryShape>` on the
entire cluster. The cluster retains the settings after shutdown.

The :term:`query optimizer` uses the query settings as an additional
input during query planning, which affects the plan selected to run the
query. You can also use query settings to block a query shape.

To add query settings and explore examples, see
:dbcommand:`setQuerySettings`.

You can add query settings for :dbcommand:`find`, :dbcommand:`distinct`,
and :dbcommand:`aggregate` commands.

Query settings have more functionality and are preferred over
deprecated :ref:`index filters <index-filters>`.

To remove query settings, use :dbcommand:`removeQuerySettings`. To
obtain the query settings, use a :pipeline:`$querySettings` stage in an
aggregation pipeline.
