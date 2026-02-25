You can convert a replica set to a sharded cluster when
a :ref:`database trigger <atlas-database-trigger>` is running
with the :guilabel:`Document Preimage` configuration option enabled
if your cluster runs MongoDB 5.3 or later. For clusters running
MongoDB versions earlier than 5.3, you must disable the
:guilabel:`Document Preimage` configuration option before converting
to a sharded cluster.