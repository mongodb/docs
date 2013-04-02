.. note::

   When updating the replica configuration object, address all members
   of the set using the index value in the array. The array index
   begins with ``0``. Do not confuse this index value with the value
   of the :data:`~local.system.replset.members[n]._id` field in each document in the
   :data:`~local.system.replset.members` array.

   The :data:`~local.system.replset.members[n]._id` rarely corresponds to the array
   index.
