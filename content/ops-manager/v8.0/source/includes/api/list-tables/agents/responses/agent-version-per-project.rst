
.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``count``
     - integer
     - Number of Agents that your |application| has found.

   * - ``entries``
     - array of objects
     - Details on each Agent on every host that this |application|
       manages.

   * - | ``entries``
       | ``.address``
     - string
     - IPv6 address for the host that runs this Agent.

   * - | ``entries``
       | ``.hostname``
     - string
     - |fqdn| of the host that runs this Agent.

   * - | ``entries``
       | ``.hostnameShort``
     - string
     - Hostname that runs this Agent.

   * - | ``entries``
       | ``.version``
     - string
     - Version of this Agent that this host runs.

   * - | ``entries``
       | ``.pingCount``
     - integer
     - Count of pings received from this Agent.

   * - | ``entries``
       | ``.confCount``
     - integer
     - Count of configuration calls received from this Agent.

   * - | ``entries``
       | ``.tagName``
     - string
     - Label for this Agent if backup is enabled.

   * - | ``entries``
       | ``.lastPing``
     - number
     - |Epoch-time-ms| when |onprem| received the last ping from this
       Agent.

       Applies to Monitoring Agents and {+mdbagent+}s with Monitoring
       enabled.

   * - | ``entries``
       | ``.lastConf``
     - number
     - |Epoch-time-ms| when |onprem| received the last configuration
       call from this Agent.

   * - | ``entries``
       | ``.msSinceLastConf``
     - number
     - Number of milliseconds that have passed since the last
       configuration call.

   * - | ``entries``
       | ``.isPrimary``
     - boolean
     - Flag that indicates if the host on which this Agent runs is the
       :term:`primary`.

   * - | ``entries``
       | ``.isManaged``
     - boolean
     - Flag that indicates if |mms| manages this Agent.

       Applies to Monitoring and Backup Agents only.

   * - | ``entries``
       | ``.numProcess``
     - integer
     - Number of MongoDB process that run on this host.

   * - | ``entries``
       | ``.isVersionOld``
     - boolean
     - Flag that indicates the installed Agent is outdated. The current
       released version of this Agent exceeds the version of the
       installed Agent.

   * - | ``entries``
       | ``.isVersionDeprecated``
     - boolean
     - Flag that indicates this Agent is deprecated. The minimum
       supported version of this Agent exceeds the version of the
       installed Agent.

   * - | ``entries``
       | ``.pingState``
     - string
     - Current state of this Agent. ``pingName`` returns one of the
       following values:

       - ``ok``
       - ``warning``
       - ``error``

   * - | ``entries``
       | ``.isModule``
     - boolean
     - Flag that indicates this entry is a module of the {+mdbagent+}.

   * - ``isAnyAgentNotManaged``
     - boolean
     - Flag indicating if any Agent runs on a host in an unmanaged
       state.

   * - ``isAnyAgentVersionDeprecated``
     - boolean
     - Flag indicating if any Agent in any deployment runs a deprecated
       version of that Agent.

   * - ``isAnyAgentVersionOld``
     - boolean
     - Flag indicating if any Agent in any deployment runs a not
       current version of that Agent.

   * - ``latestVersion``
     - string
     - Latest version of this type of Agent.

   * - ``links``
     - array of objects
     - .. include:: /includes/api/links-explanation.rst

   * - ``minimumAgentVersionDetected``
     - string
     - Minimum supported version of this Agent installed on this host.

   * - ``minimumVersion``
     - string
     - Minimum supported version of this Agent that works with your
       |onprem| installation.

