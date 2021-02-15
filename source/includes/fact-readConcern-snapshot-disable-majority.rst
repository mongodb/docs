For reads on a sharded cluster, you cannot use read concern
:readconcern:`"snapshot"` if the operation involves a shard that has
:ref:`disabled read concern "majority" <disable-read-concern-majority>`.
