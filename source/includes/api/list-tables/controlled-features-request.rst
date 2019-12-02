.. list-table::
   :widths: 30 10 60
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``externalManagementSystem``
     - object
     - Identifying parameters for the external system that manages this
       |onprem| Project.

   * - | ``externalManagementSystem``
       | ``.name``
     - string
     - Identifying label for the external system that manages this
       |onprem| Project.

   * - | ``externalManagementSystem``
       | ``.systemId``
     - string
     - Unique identifier of the external system that manages this
       |onprem| Project.

   * - | ``externalManagementSystem``
       | ``.version``
     - string
     - Active release of the external system that manages this |onprem|
       Project.

   * - ``policies``
     - array
     - List of policies that the external system applies to this
       |onprem| Project.

   * - | ``policies``
       | ``.policy[n]``
     - object
     - Single policy set for this |onprem| Project. This parameter can
       be set one or more times in the ``policies`` array.

       Accepted values to return are:

       .. list-table::
          :widths: 40 60
          :header-rows: 1
          :stub-columns: 1

          * - Value
            - Purpose

          * - ``ExternallyManagedLock``
            - Users can't use |onprem| to manage other settings given
              in the ``policies.policy[n]`` array. These same users may
              use a configured external system, like the |k8s-op-short|
              to manage these settings.
          * - ``DisableUserManagement``
            - Users can't manage users or roles.
          * - | ``DisableAuthentication``
              | ``Mechanisms``
            - Users can't change authentication settings.
          * - ``DisableSetMongodVersion``
            - Users can't change the version of any |mongod| or
              |mongos|.
          * - ``DisableSetMongodConfig``
            - Users can't change any |mongod| settings listed in the
              ``policies[n].disabledParams`` array.

   * - | ``policies[n]``
       | ``.disabledParams``
     - array
     - Displayed when disabled parameters are set.
