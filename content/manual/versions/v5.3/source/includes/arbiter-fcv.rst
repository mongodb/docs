
Arbiters do not replicate the :data:`admin.system.version` collection.
Because of this, arbiters always have a Feature Compatibility Version equal
to the downgrade version of the binary, regardless of the FCV value of the
replica set.
