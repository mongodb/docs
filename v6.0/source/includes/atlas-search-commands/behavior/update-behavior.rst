|method-name-title| triggers an index build with the new index
definition. There may be a delay between when you receive a response
from the command and when the updated index is ready.

The old index definition can still support queries while the new index
is being built. Once the new index finishes building, the old index is
no longer usable. To see the status of your search indexes, use the
:pipeline:`$listSearchIndexes` aggregation stage.
