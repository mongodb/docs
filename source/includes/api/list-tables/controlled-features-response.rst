.. list-table::
   :widths: 30 10 60
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``_id``
     - string
     - Unique identifier of the Project for which you are setting this
       policy.

   * - ``created``
     - string
     - |iso8601-time| when this feature control policy was created.

   * - ``updated``
     - string
     - |iso8601-time| when this feature control policy was updated.

   * - ``externalManagementSystem``
     - object
     - Identifying parameters for the external system that manages this
       |mms| Project.

   * - | ``externalManagementSystem``
       | ``.name``
     - string
     - Identifying label for the external system that manages this
       |mms| Project.

   * - | ``externalManagementSystem``
       | ``.systemId``
     - string
     - Unique identifier of the external system that manages this
       |mms| Project.

   * - | ``externalManagementSystem``
       | ``.version``
     - string
     - Active release of the external system that manages this |mms|
       Project.

   * - ``policies``
     - array
     - List of policies that the external system applies to this
       |mms| Project.

   * - | ``policies``
       | ``.policy[n]``
     - object
     - Single policy set for this |mms| Project. This parameter can
       be set one or more times in the ``policies`` array.

       Possible values are:

       .. list-table::
          :widths: 40 60
          :header-rows: 1
          :stub-columns: 1

          * - Value
            - Purpose

          * - ``EXTERNALLY_MANAGED_LOCK``
            - Users can't use |mms| to manage other settings given
              in the ``policies.policy[n]`` array. These same users may
              use a configured external system, like the |k8s-op-short|
              to manage these settings.
          * - ``DISABLE_USER_MANAGEMENT``
            - Users can't manage users or roles.
          * - | ``DISABLE_AUTHENTICATION_``
              | ``MECHANISMS``
            - Users can't change authentication settings.
          * - | ``DISABLE_SET_MONGOD_``
              | ``CONFIG``
            - Users can't change any |mongod| settings listed in the
              ``policies[n].disabledParams`` array.
          * - | ``DISABLE_SET_MONGOD_``
              | ``VERSION``
            - Users can't change the version of any |mongod| or
              |mongos|.
          * - ``DISABLE_BACKUP_AGENT``
            - Users can't enable or disable the {+bagent+} agent.
          * - | ``DISABLE_MONGOD_LOG_``
              | ``MANAGEMENT``
            - Users can't change log management settings.
          * - | ``DISABLE_IMPORT_TO_``
              | ``AUTOMATION``
            - Users can't manage deployments using {+aagent+}.
          * - | ``DISABLE_AGENT_API_KEY_``
              | ``MANAGEMENT``
            - Users can't create or update Agent API keys.
          * - | ``DISABLE_MONGOD_HOST_``
              | ``MANAGEMENT``
            - Users can't change the server type of hosts.

   * - | ``policies[n]``
       | ``.disabledParams``
     - array
     - List of |mongod| settings to disable if you apply the
       ``DISABLE_SET_MONGOD_CONFIG`` policy. Automation doesn't support 
       all MongoDB options, which can result in failed import attempts. 
       To learn more, see :ref:`om-unsupported-mdb-settings`.
