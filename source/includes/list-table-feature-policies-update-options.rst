.. list-table::
   :header-rows: 1
   :widths: 25 10 60 5

   * - Option
     - Type
     - Description
     - Required?

   * - ``--name``
     - string 
     - Name of the external system that
       manages this project's deployment.
     - yes

   * - ``--output``, ``-o``
     - string 
     - .. include:: /includes/extracts/fact-basic-options-output.rst
     - no

   * - ``--policy``
     - strings
     - Comma-separated list of policies that the external system applies to this
       project. Possible values and their descriptions are:

       .. list-table::
          :header-rows: 1
          :width: 35 65

          * - Variable
            - Description

          * - ``EXTERNALLY_MANAGED_LOCK``
            - Users can't use |com| to manage other settings given in the
              ``policies`` list, and may use a configured external system to
              manage these settings.
       
          * - ``DISABLE_USER_MANAGEMENT``
            - Users can't manage users or roles.
       
          * - ``DISABLE_AUTHENTICATION_MECHANISMS``
            - Users can't change authentication settings.
       
          * - ``DISABLE_SET_MONGOD_CONFIG``
            - Users can't change any |mongod| settings
              listed in the ``policies[n].disabledParams`` policy.

          * - ``DISABLE_SET_MONGOD_VERSION``
            - Users can't change the version of any |mongod|
              or |mongos|.
       
          * - ``DISABLE_BACKUP_AGENT``
            - Users can't enable or disable the agent.
       
          * - ``DISABLE_MONGOD_LOG_MANAGEMENT``
            - Users can't change log management settings.
      
          * - ``DISABLE_IMPORT_TO_AUTOMATION``
            - Users can't manage deployments using {+aagent+}.
       
          * - ``DISABLE_AGENT_API_KEY_MANAGEMENT``
            - Users can't create or update Agent API keys.

          * - ``DISABLE_MONGOD_HOST_MANAGEMENT``
            - Users can't change the server type of hosts.
       
     - yes

   * - ``--profile``, ``-P``
     - string
     - Name of the profile where the project ID and the |svc-api-key|\s 
       for the project are saved. If omitted, uses the {+default-profile+}. 
       To learn more about creating a profile, see :ref:`mcli-configure`.
     - no

   * - ``--projectId``
     - string
     - .. include:: /includes/extracts/fact-basic-options-project-id.rst
     - no

   * - ``--systemId``
     - string
     - Unique identifier of the external system that manages this |onprem| project.
     - no



