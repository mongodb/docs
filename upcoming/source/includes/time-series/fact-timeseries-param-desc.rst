Optional. Specify this option to create a new sharded :ref:`time series
collection <manual-timeseries-collection>`.

To shard an existing time series collection, omit this parameter.

When the collection specified to ``shardCollection`` is a time series
collection and the ``timeseries`` option is not specified, MongoDB uses
the values that define the existing time series collection to populate
the ``timeseries`` field.
