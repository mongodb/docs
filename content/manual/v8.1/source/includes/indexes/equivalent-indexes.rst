Starting in MongoDB 7.3, you cannot create equivalent indexes, which are
partial indexes with the same index keys and the same partial
expressions that use a :ref:`collation <collation>`.

For databases in MongoDB 7.3 with existing equivalent indexes, the
indexes are retained but only the first equivalent index is used in
queries. This is the same behavior as MongoDB versions earlier than 7.3.
