Starting in MongoDB 8.0, use query settings instead of adding
:ref:`index filters <index-filters>`. Index filters are deprecated
starting in MongoDB 8.0.

Query settings have more functionality than index filters. Also, index
filters aren't persistent and you cannot easily create index filters for
all cluster nodes. To add query settings and explore examples, see
:dbcommand:`setQuerySettings`.
