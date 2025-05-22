.. versionadded:: 8.0

.. include:: /includes/persistent-query-settings-avoid-index-filters-intro.rst

The :term:`query optimizer` uses the query settings as an additional
input during query planning, which affects the plan selected to run the
query.

The settings apply to the :ref:`query shape <queryStats-queryShape>` on
the entire cluster. The cluster retains the settings after shutdown.

You can add query settings for :dbcommand:`find`, :dbcommand:`distinct`,
and :dbcommand:`aggregate` commands.

To remove query settings, use :dbcommand:`removeQuerySettings`. To
obtain the query settings, use a :pipeline:`$querySettings` stage in an
aggregation pipeline.
