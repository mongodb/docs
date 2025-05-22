If you specify a :writeconcern:`"majority"` write concern for a
:ref:`multi-document transaction <transactions>` and the
transaction fails to replicate to the :ref:`calculated majority
<calculating-majority-count>` of :term:`replica set` members, then the
transaction may not immediately roll back on replica set members.
The replica set will be :term:`eventually consistent <eventual
consistency>`. A transaction is always applied or rolled back on all
replica set members.
