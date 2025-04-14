MongoDB performs foreground builds of indexes on databases copied via
|command|. Foreground :doc:`index builds </core/index-creation>` lock the
database and prevent *all* other operations on that database until the
foreground build completes. There may also be a performance impact on
other databases while the indexes build.

You can keep track of ongoing index creation operations with the
:ref:`db.currentOp()<currentOp-index-creation>` command.
