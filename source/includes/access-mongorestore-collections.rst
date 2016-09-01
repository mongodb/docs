To restore data to a MongoDB deployment that has :doc:`access control
</core/authorization>` enabled, the :authrole:`restore` role provides
access to restore any database if the backup data does not include
:data:`system.profile <<database>.system.profile>` collection data.

.. include:: /includes/fact-restore-role-system.profile.rst

If running :program:`mongorestore` with :option:`--oplogReplay`, the
:authrole:`restore` role is insufficient to replay the oplog. To replay
the oplog, create a :ref:`user-defined role <create-user-defined-role>`
that has :authaction:`anyAction` on :ref:`resource-anyresource` and
grant only to users who must run :program:`mongorestore` with
:option:`--oplogReplay`.


.. COMMENT per the following commit, choosing the anyAction/anyResource
   over the __system role.
   https://github.com/mongodb/docs/commit/237c44cd3b6e4b7dbe0c9077b7571c8b7ec5d7a5
