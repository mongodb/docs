Starting in MongoDB 8.0, ``movePrimary`` doesn't
:ref:`change-event-invalidate` collections that have :ref:`change
streams <changeStreams>`. The change streams can continue to read events
from collections after the collections are moved to a new shard.
