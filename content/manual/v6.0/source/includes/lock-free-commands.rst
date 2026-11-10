Starting in MongoDB 5.0, the following read operations are not blocked
when another operation holds an exclusive (X) write lock on the
collection:

- :dbcommand:`find`

- :dbcommand:`count`

- :dbcommand:`distinct`

- :dbcommand:`aggregate`

- :dbcommand:`mapReduce`

- :dbcommand:`listCollections`

- :dbcommand:`listIndexes`

When writing to a collection, :dbcommand:`mapReduce` and
:dbcommand:`aggregate` hold an intent exclusive (IX) lock. Therefore, if
an exclusive X lock is already held on a collection,
:dbcommand:`mapReduce` and :dbcommand:`aggregate` write operations are
blocked.