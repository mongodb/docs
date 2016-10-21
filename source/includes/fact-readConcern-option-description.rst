Possible read concern values are:

- :readconcern:`"local"`. This is the default read concern level.

- :readconcern:`"majority"`. Available for replica sets that use
  :ref:`WiredTiger storage engine <storage-wiredtiger>`.

- :readconcern:`"linearizable"`. Available for read operations on the
  :replstate:`primary <PRIMARY>` only.

For more formation on the read concern levels, see
:ref:`read-concern-levels`.

