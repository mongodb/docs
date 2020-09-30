.. COMMENT: Additional privileges needed 

If the backup data includes :data:`system.profile
<<database>.system.profile>` collection data or you run with
:option:`--oplogReplay <mongorestore.--oplogReplay>`, you need
additional privileges:

.. list-table::
   :widths: 20 80

   * - ``system.profile``

     - .. include:: /includes/fact-restore-role-system.profile.rst

       Both the built-in roles :authrole:`dbAdmin` and
       :authrole:`dbAdminAnyDatabase` provide the additional privileges.

   * - ``--oplogReplay``

     - To run with :option:`--oplogReplay
       <mongorestore.--oplogReplay>`, create a 
       :ref:`user-defined role <create-user-defined-role>` that has
       :authaction:`anyAction` on :ref:`resource-anyresource`.

       Grant only to users who must run :binary:`~bin.mongorestore`
       with :option:`--oplogReplay <mongorestore.--oplogReplay>`.

.. COMMENT per the following commit, choosing the anyAction/anyResource
   over the __system role.
   https://github.com/mongodb/docs/commit/237c44cd3b6e4b7dbe0c9077b7571c8b7ec5d7a5
