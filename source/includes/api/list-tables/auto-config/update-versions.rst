.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Parameter
     - Type
     - Description

   * - automationAgentVersion
     - string
     - Version of the {+mdbagent+} in the specified project.

   * - backupAgentVersion
     - string
     - Version of the Backup Agent in the specified project. |mms| has
       removed the Backup Agent, so this parameter should return
       **null**.

   * - biConnectorVersion
     - string
     - Version of the |bic-full| in the specified project.

   * - mongoDbToolsVersion
     - string
     - Version of the MongoDB Database Tools in the specified project.

   * - monitoringAgentVersion
     - string
     - Version of the Monitoring Agent in the specified project. |mms|
       has removed the Monitoring Agent, so this parameter should
       return **null**.
