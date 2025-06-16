By default, :binary:`~bin.mongosqld` does not automatically resample
data after generating the schema. Specify the
:option:`--schemaRefreshIntervalSecs <mongosqld
--schemaRefreshIntervalSecs>` option to direct
:binary:`~bin.mongosqld` to automatically resample the data and
regenerate the schema on a fixed schedule.
