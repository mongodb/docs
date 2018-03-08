Possible read concern levels are:

- :readconcern:`"local"`. This is the default read concern level.

- :readconcern:`"available"`. This is the default for reads against 
  secondaries when :ref:`afterClusterTime` and `"level"` are unspecified.  The 
  query returns the instance's most recent data.

- :readconcern:`"majority"`. Available for replica sets that use
  :ref:`WiredTiger storage engine <storage-wiredtiger>`.

- :readconcern:`"linearizable"`. Available for read operations on the
  :replstate:`primary <PRIMARY>` only.

For more formation on the read concern levels, see
:ref:`read-concern-levels`.

For :readconcern:`"local"` (default) or :readconcern:`"majority"` read
concern level, you can specify the ``afterClusterTime`` option to have
the read operation return data that meets the level requirement and the
specified after cluster time requirement. For more information, see
:ref:`afterClusterTime`.
