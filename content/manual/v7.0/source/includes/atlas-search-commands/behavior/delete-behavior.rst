After you run |method-name|, there may be a delay between when you
receive a response from the command and when the index is deleted.

To see the status of your search indexes, use the
:pipeline:`$listSearchIndexes` aggregation stage. Once your index is
deleted, that index no longer appears in the ``$listSearchIndexes``
output.
