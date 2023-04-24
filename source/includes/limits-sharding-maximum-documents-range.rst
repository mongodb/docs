By default, MongoDB cannot move a range if the number of documents in
the range is greater than 2 times the result of dividing the
configured :ref:`range size <sharding-range-size>` by the average
document size. If MongoDB can move a sub-range of a chunk and reduce the 
size to less than that, the balancer does so by migrating a range.
:method:`db.collection.stats()` includes the ``avgObjSize`` field, 
which represents the average document size in the collection.       

For chunks that are :ref:`too large to migrate
<migration-chunk-size-limit>`:

- The balancer setting ``attemptToBalanceJumboChunks`` allows the
  balancer to migrate chunks too large to move as long as the chunks
  are not labeled :ref:`jumbo <jumbo-chunk>`. See
  :ref:`balance-chunks-that-exceed-size-limit` for details.

  When issuing :dbcommand:`moveRange` and :dbcommand:`moveChunk` 
  commands, it's possible to specify the :ref:`forceJumbo 
  <moverange-forceJumbo>` option to allow for the migration of ranges 
  that are too large to move. The ranges may or may not be labeled 
  :ref:`jumbo <jumbo-chunk>`.
