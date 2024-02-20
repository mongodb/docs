.. list-table::
   :widths: 33 33 33
   :header-rows: 1

   * - Component
     - Log type
     - Configuration location

   * - MongoDB
     - Automation agent logs
     - :setting:`spec.agent.startupOptions`

   * - MongoDB
     - Monitoring agent logs
     - Ops Manager API or UI

   * - MongoDB
     - Backup logs
     - Ops Manager API or UI

   * - MongoDB
     - MongoDB logs
     - Ops Manager UI

   * - MongoDB
     - Audit logs
     - Ops Manager UI

   * - MongoDB
     - Readiness Probe
     - `Container Environment Variables <https://www.mongodb.com/docs/kubernetes-operator/master/reference/kubectl-operator-settings/#readiness-probe-logger-max-size>`__

   * - Application Database
     - MongoDB Logs
     - :opsmgrkube:`spec.applicationDatabase.agent.logRotate`

   * - Application Database
     - Automation Agent Logs
     - :opsmgrkube:`spec.applicationDatabase.agent.startupOptions`

   * - Application Database
     - Monitoring agent logs
     - Forwarded to ``stdout`` only (kubectl logs). 
       Managed and stored in the |k8s| control plane.

   * - Application Database
     - Audit logs
     - :opsmgrkube:`spec.applicationDatabase.agent.logRotate.includeAuditLogsWithMongoDBLogs`
