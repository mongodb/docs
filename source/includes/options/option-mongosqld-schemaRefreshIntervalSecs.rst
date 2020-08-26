.. option:: --schemaRefreshIntervalSecs <number>

   *Default*: 0

   .. versionchanged:: 2.11
   
      Renamed ``--sampleRefreshIntervalSecs`` to
      ``--schemaRefreshIntervalSecs``
   
   The interval in seconds at which :binary:`~bin.mongosqld` re-samples
   data to create its schema. The default value is ``0``, which means
   that after the initial sampling no re-sampling occurs for the
   duration of the connection. The specified value must be a positive
   integer.
   
   .. include:: /includes/fact-resample-schema-data.rst
   

