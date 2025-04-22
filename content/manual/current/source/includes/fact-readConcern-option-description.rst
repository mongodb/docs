Possible read concern levels are:

- :readconcern:`"local"`. This is the default read concern level for
  read operations against the primary and secondaries.

- :readconcern:`"available"`. Available for read operations against
  the primary and secondaries. :readconcern:`"available"` behaves the 
  same as :readconcern:`"local"` against the primary and non-sharded
  secondaries. The query returns the instance's most recent data.

- :readconcern:`"majority"`. Available for replica sets that use
  :ref:`WiredTiger storage engine <storage-wiredtiger>`.

- :readconcern:`"linearizable"`. Available for read operations on the
  :replstate:`primary <PRIMARY>` only.

- :readconcern:`"snapshot"`. Available for :ref:`multi-document
  transactions <transactions>`, and starting in MongoDB 5.0, certain
  read operations outside of multi-document transactions.

For more formation on the read concern levels, see
:ref:`read-concern-levels`.
