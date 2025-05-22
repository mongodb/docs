Hashed indexing is ideal for shard keys with fields that change
:ref:`monotonically <shard-key-monotonic>` like :term:`ObjectId` values
or timestamps. When you use :ref:`ranged sharding <sharding-ranged>`
with a monotonically increasing shard key value, the chunk with an upper
bound of :bsontype:`MaxKey` receives the majority incoming writes. This
behavior restricts insert operations to a single shard, which removes
the advantage of distributed writes in a sharded cluster.

For more information on choosing the best sharding approach for your
application, see :ref:`hashed-versus-ranged-sharding`
