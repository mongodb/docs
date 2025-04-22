Possible read concern levels are:

- :readconcern:`"local"`. This is the default read concern level for
  read operations against primary and read operations against
  secondaries when associated with :ref:`causally consistent sessions
  <causal-consistency>`.

- :readconcern:`"available"`. This is the default for reads against
  secondaries when when not associated with :ref:`causally consistent
  sessions <causal-consistency>`. The query returns the instance's most
  recent data.

- :readconcern:`"majority"`. Available for replica sets that use
  :ref:`WiredTiger storage engine <storage-wiredtiger>`.

- :readconcern:`"linearizable"`. Available for read operations on the
  :replstate:`primary <PRIMARY>` only.

For more formation on the read concern levels, see
:ref:`read-concern-levels`.
