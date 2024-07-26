Optional. The :ref:`primary shard <primary-shard>` for the
database. It is the default shard for all unsharded collections in the 
database. In general, rather than explicitly specifying the primary 
shard, it is recommended to let the cluster select the primary shard 
instead.

.. warning:: Tip

   In general, you should not need to specify the primary shard. Allow
   the cluster to select the primary shard instead.
