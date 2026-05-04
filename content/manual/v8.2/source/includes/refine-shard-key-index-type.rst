.. warning::

   Do not modify the range or hashed type for any of the current shard
   key fields. It causes data inconsistencies. For example, do not
   modify a shard key from ``{ customer_id: 1 }`` to ``{ customer_id:
   "hashed", order_id: 1 }``.
