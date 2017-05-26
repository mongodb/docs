.. list-table::
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``typeName``
     - string
     - The type of agent: ``MONITORING``, ``BACKUP``, or ``AUTOMATION``.

   * - ``hostname``
     - string
     - Primary hostname. A host typically may have aliases, so the primary
       is the best available name as decided by |mms|.

   * - ``confCount``
     - number
     - Number of configuration calls.

   * - ``lastConf``
     - timestamp
     - Date and time of last configuration call.

   * - ``stateName``
     - string
     - The current state of the agent. ``stateName`` can return the following
       values:

       - ``ACTIVE``: the agent is active and operating
       - ``STANDBY``: the agent is on standby
       - ``NO_PROCESSES``: the agent is not managing,
         monitoring, or backing up any processes.

   * - ``pingCount``
     - number
     - **Only applicable to Monitoring agents**. The number of pings that
       the Monitoring agent has sent to the ``hostname`` URL.

   * - ``isManaged``
     - Boolean

     - **Only applicable to Monitoring and Backup agents**. Specifies
       whether or not |mms| manages the agent.

   * - ``lastPing``
     - timestamp
     - **Only applicable to Monitoring agents**. Time of most recent
       ping.

   * - ``tag``
     - string
     - **Only applicable to Backup agents**. The agent's tag, if there is one.
