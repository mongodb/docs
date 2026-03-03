``mongosync`` 1.17 and earlier returns an error if the destination cluster
contains a non-empty ``__mdb_internal_atlas`` database. This is an 
:ref:`internal <cloud-system-databases>` database used by MongoDB
Atlas. You might receive an error that states ``"found existing data on
the destination cluster; the destination cluster must be empty; please drop
existing data on the destination and start the migration again"``. 

To avoid failed migrations, upgrade to
``mongosync`` 1.18 or later, which automatically ignores all internal
databases.