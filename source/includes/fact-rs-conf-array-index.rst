When updating the replica configuration object, access the replica set
members in the :data:`~local.system.replset.members` array with the
**array index**. The array index begins with ``0``. Do **not** confuse
this index value with the value of the
:data:`~local.system.replset.members[n]._id` field in each document in
the :data:`~local.system.replset.members` array.
