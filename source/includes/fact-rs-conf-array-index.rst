When updating the replica configuration object, access the replica set
members in the :rsconf:`members` array with the
**array index**. The array index begins with ``0``. Do **not** confuse
this index value with the value of the
:rsconf:`members[n]._id` field in each document in
the :rsconf:`members` array.
