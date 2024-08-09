.. list-table::
   :widths: 25 25 25 25
   :header-rows: 1

   * - Component
     - Log type   
     - CRD manifest configuration
     - Default configuration location

   * - MongoDB
     - Automation agent logs
     - :setting:`MongoDB CRD <spec.agent.startupOptions>`
     - :setting:`spec.agent.startupOptions`

   * - MongoDB
     - {+monitoring-agent+} logs
     - :setting:`MongoDB CRD <spec.agent.monitoringAgent.logRotate>`
     - Ops Manager API or UI

   * - MongoDB
     - Backup logs
     - :setting:`MongoDB CRD <spec.agent.backupAgent.logRotate>`
     - Ops Manager API or UI

   * - MongoDB
     - MongoDB logs
     - |onprem| 7.0.4, 6.0.24, or later: :setting:`MongoDB CRD <spec.agent.mongod.logRotate>`
     - Ops Manager UI

   * - MongoDB
     - Audit logs
     - :setting:`MongoDB CRD <spec.agent.mongod.auditlogRotate>`
     - Ops Manager UI

   * - MongoDB
     - Readiness Probe
     - :setting:`MongoDB CRD <spec.agent.readinessProbe.environmentVariables>`
     - `Container Environment Variables <https://www.mongodb.com/docs/kubernetes-operator/master/reference/kubectl-operator-settings/#readiness-probe-logger-max-size>`__

   * - {+appdb+}
     - MongoDB Logs
     - :opsmgrkube:`MongoDBOpsManager CRD <spec.applicationDatabase.agent.<component>.logRotate>`
     - :opsmgrkube:`spec.applicationDatabase.agent.mongod.logRotate <spec.applicationDatabase.agent.<component>.logRotate>`

   * - {+appdb+}
     - Automation Agent Logs
     - :opsmgrkube:`MongoDBOpsManager CRD <spec.applicationDatabase.agent.startupOptions>`
     - :opsmgrkube:`spec.applicationDatabase.agent.startupOptions`

   * - {+appdb+}
     - {+monitoring-agent+} logs
     - :opsmgrkube:`MongoDBOpsManager CRD <spec.applicationDatabase.agent.<component>.logRotate>`
     - Forwarded to ``stdout`` only (kubectl logs). 
       Managed and stored in the |k8s| control plane.

   * - {+appdb+}
     - Audit logs
     - :opsmgrkube:`MongoDBOpsManager CRD <spec.applicationDatabase.agent.mongod.auditlogRotate>`
     - :opsmgrkube:`spec.applicationDatabase.agent.mongod.auditlogRotate`

   * - |onprem|
     - |onprem| logs
     - :ref:`MongoDBOpsManager CRD <k8s-om-log-rotation-crd>`
     - :ref:`logback.xml configuration file <onprem-own-logs>`
