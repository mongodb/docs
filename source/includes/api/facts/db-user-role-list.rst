Label given to a group of privileges assigned to a database user. This
value can either be a
:manual:`built-in role </reference/built-in-roles/>` or a
:ref:`custom role <mongodb-roles>`.

The **admin** database accepts these values for the **role** parameter:

- :atlasrole:`atlasAdmin <Atlas admin>`
- :authrole:`readWriteAnyDatabase`
- :authrole:`readAnyDatabase`
- :authrole:`clusterMonitor`
- :authrole:`backup`
- :authrole:`dbAdminAnyDatabase`
- ``enableSharding``

|service| limits this role to MongoDB databases that it manages. The
role allows the user to enable sharding on a database and to shard a
collection.

Specific databases accept these values for the **role** parameter:

- :authrole:`dbAdmin`
- ``read``
- ``readWrite``

Specific collections accept these values for the **role** parameter:

- ``read``
- ``readWrite``

If you don't specify a collection for the ``read`` and ``readWrite``
roles, |service| applies the roles to all collections (excluding some
``system.`` collections) in the database.

.. note::

  You can only set a :ref:`custom role <mongodb-roles>` when
  you set ``"roles.databaseName" : "admin"``.
