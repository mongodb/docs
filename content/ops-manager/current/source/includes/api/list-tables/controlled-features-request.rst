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

   * - | ``policies[n]``
       | ``.policy``
     - object
     - Single policy set for this |onprem| Project. This parameter can
       be set one or more times in the ``policies`` array.

       Accepted values are:

       .. list-table::
          :widths: 40 60
          :header-rows: 1
          :stub-columns: 1

          * - Value
            - Purpose

          * - ``ExternallyManagedLock``
            - Users can't use |onprem| to manage other settings given
              in the ``policies[n].policy`` array. These same users may
              use a configured external system, like the |k8s-op-short|
              to manage these settings.
          * - ``DisableUserManagement``
            - Users can't manage users or roles.
          * - | ``DisableAuthenticationMechanisms``
            - Users can't change authentication settings.
          * - | ``DisableSetMongodConfig``
            - Users can't change any |mongod| settings listed in the
              ``policies[n].disabledParams`` array.
          * - | ``DisableSetMongodVersion``
            - Users can't change the version of any |mongod| or
              |mongos|.
          * - ``DisableBackupAgent``
            - Users can't enable or disable the {+bagent+} agent.
          * - | ``DisableMongodLogManagement``
            - Users can't change log management settings.
          * - | ``DisableImportToAutomation``
            - Users can't manage deployments using {+aagent+}.
          * - | ``DisableAgentApiKeyManagement``
            - Users can't create or update Agent API keys.
          * - | ``DisableMongodHostManagement``
            - Users can't change the server type of hosts.

   * - | ``policies[n]``
       | ``.disabledParams``
     - array
     - List of |mongod| settings to disable when you apply the
       ``DISABLE_SET_MONGOD_CONFIG`` policy. Automation doesn't support 
       all MongoDB options, which can result in failed import attempts. 
       To learn more, see :ref:`om-unsupported-mdb-settings`.
