On systems running with :setting:`~security.authorization`, a user must
have access that includes the :authrole:`readWrite` role for each
database being restored.

The :authrole:`readWriteAnyDatabase` role and the :authrole:`restore`
role each provide access to restore any database. If running
:binary:`~bin.mongorestore` with :option:`--oplogReplay`, however, neither
role is sufficient. Instead, create a :ref:`user-defined role
<user-defined-roles>` that has :authaction:`anyAction` on
:ref:`resource-anyresource` and grant only to users who must run
:binary:`~bin.mongorestore` with :option:`--oplogReplay`.

.. COMMENT per the following commit, choosing the anyAction/anyResource
   over the __system role.
   https://github.com/mongodb/docs/commit/237c44cd3b6e4b7dbe0c9077b7571c8b7ec5d7a5
