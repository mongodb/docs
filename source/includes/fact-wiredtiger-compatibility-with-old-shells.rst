If you use |method| from a version of the
:program:`mongo` shell before 2.8.0, on a :program:`mongod` instance
that uses the``wiredtiger`` storage engine,
|method| will return no data, even if
there are existing |things|.
