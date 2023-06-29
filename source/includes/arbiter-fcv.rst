
Arbiters do not replicate the :data:`admin.system.version` collection.
Because of this, arbiters always have a feature compatibility version equal
to the downgrade version of the binary, regardless of the fCV value of the
replica set.
