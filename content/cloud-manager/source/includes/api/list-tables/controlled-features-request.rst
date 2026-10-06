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

       Accepted values are:

       - ``EXTERNALLY_MANAGED_LOCK``: Users can't use |onprem| to
         manage other settings listed in the ``policies.policy[n]``
         array. These same users may use a configured external system,
         such as the |k8s-op-short| to manage these settings.

       - ``DISABLE_USER_MANAGEMENT``: Users can't manage users or
         roles.

       - ``DISABLE_AUTHENTICATION_MECHANISMS``: Users can't change
         authentication settings.

       - ``DISABLE_SET_MONGOD_CONFIG``: Users can't change any
         |mongod| settings listed in the ``policies[n].disabledParams``
         array.

       - ``DISABLE_SET_MONGOD_VERSION``: Users can't change the
         version of any |mongod| or |mongos|.

       - ``DISABLE_BACKUP_AGENT``: Users can't enable or disable the
         {+bagent+} agent.

       - ``DISABLE_MONGOD_LOG_MANAGEMENT``: Users can't change log
         management settings.

       - ``DISABLE_IMPORT_TO_AUTOMATION``: Users can't manage
         deployments using {+aagent+}.

       - ``DISABLE_AGENT_API_KEY_MANAGEMENT``: Users can't create or
         update Agent API keys.

       - ``DISABLE_MONGOD_HOST_MANAGEMENT``: Users can't change the
         server type of hosts.

   * - | ``policies[n]``
       | ``.disabledParams``
     - array
     - List of |mongod| settings to disable when you apply the
       ``DISABLE_SET_MONGOD_CONFIG`` policy. Not all MongoDB options
       are available in Automation, which can result in failed import
       attempts. To learn more, see :ref:`cm-unsupported-mdb-settings`.
