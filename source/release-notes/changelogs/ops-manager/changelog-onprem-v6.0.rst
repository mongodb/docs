.. _opsmgr-server-6.0.2:

|onprem| Server 6.0.2
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-08-04*

- Removes spurious audit log rotation errors from the MongoDB Agent log 
  files and corrects file suffix handling.
- Adds MongoDB 6.0.0 as a deployment option.
- Introduces FCV 6.0 option in Ops Manager.
- Updates JDK to jdk-11.0.16+8.
- Updates the {+mdbagent+} to :ref:`12.0.10.7591
  <mongodb-12.0.10.7591>`.

.. _opsmgr-server-6.0.1:

|onprem| Server 6.0.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-07-20*

- Updates the {+mdbagent+} to :ref:`12.0.9.7579 <mongodb-12.0.9.7579>`.
- Supports MongoDB 6.0 as a deployment option, but doesn't display 
  MongoDB 6.0.0 as an available deployment option by default. To 
  display MongoDB 6.0.0 as a deployment option, set  
  ``mms.featureFlag.automation.enableV6`` :ref:`configuration 
  <conf-mms.properties>` option in the ``conf-mms.properties`` file to 
  ``enabled``.

.. _opsmgr-server-6.0.0:

|onprem| Server 6.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-07-19*

MongoDB Cluster Management
``````````````````````````

- Supports managing, monitoring, and backing up MongoDB 6.0
  deployments.

Backup
``````

- Improves backpressure support to throttle down the snapshot process
  when the load is too high, resulting in improved stability of
  backups.

- Adds support to upload custom certificates for S3 snapshot/oplog
  stores from the admin console.

- Adds support for parallel resumable restores when using Automation.

- Adds support for concurrent WiredTiger snapshots and grooms when the
  S3 snapshot store is used.

Monitoring
``````````

- Adds support for
  :doc:`MongoDB cluster monitoring via Prometheus </tutorial/prometheus-integration>`:

  - Allows configuring |onprem| to make MongoDB cluster metric data
    available for Prometheus to consume.

  - Provides MongoDB process metrics and hardware metrics for the
    clusters.

  - Supports file-based and http-based discovery for metric resources.

  - Supports :doc:`integrating with Prometheus </tutorial/prometheus-integration/>`:

    - You can configure |onprem| to send metric data about your MongoDB
      clusters to your Prometheus instance.
    - |onprem| sends MongoDB process metrics and hardware metrics for
      the clusters.
    - |onprem| supports file based and http based discovery for metric
      resources.

- Adds support for the following elements in Data Explorer:
  
  - Creation, deletion, and viewing of Clustered collections.
  
  - Creation of secondary indexes for Timeseries collections using the
    hybrid or rolling build approaches.

- Adds the following options for queries initiated in the Data Explorer
  Find tab:

  - Project
  - Sort
  - Collation

- Adds a new metric, ``OPLOG_REPLICATION_LAG_TIME``, accessible through
  the Metrics |api|.

  - This new metric, along with the existing **Replication Lag** metric,
    chart now has sub-second precision.

- Adds a :doc:`new option to disable monitoring </tutorial/enable-appdb-monitoring/>`
  of |onprem|'s backing database (AppDB).

  - When the AppDB is configured for monitoring, it is no longer
    possible to remove the project from |onprem|.

  - Previously, after enabling
    :doc:`Application Database Monitoring </tutorial/enable-appdb-monitoring/>`,
    the user couldn't disable monitoring or remove the project from the
    |onprem| projects list.

  - In this release, admins can now permit removal of the Application
    DB project, allowing application database monitoring to be fully
    disabled and/or removed.

  - This new option can be found under Admin->Ops Manager
    Config->Backing DBs.

Alerting
````````

- Adds support for Microsoft Teams as an alert notification destination.

- Improves integration flow with PagerDuty through its Events v2 API
  for alert notifications.

- Deprecates |snmp| alerts. |onprem| 7.0.0 will not include |snmp|
  alerts.

Automation
``````````
.. https://jira.mongodb.org/browse/DOCSP-23017

- Can change setParameters without a rolling restart.

- Adds support for MongoDB log rotate configuration and commands for
  independent log rotation configuration of MongoDB Log and MongoDB
  Audit Log Files.

- Adds download of the new mongo shell (mongosh) to the deployment
  nodes.

  .. note::
     This isn't supported in Local mode.

- Improves usability by offering a modernized Deployment Security
  Configuration UI.

  - Adds support for validating |tls| and |ldap| configuration before
    deployment.

User Interface
``````````````

- Changes to MongoDB's current fonts, colors and UI components.
- Deprecates the :ref:`om-manage-sharding-ui` UI. |onprem| 7.0.0 will not
  include this feature.

|onprem| Platform Support
`````````````````````````

- Adds support for running |onprem| on Debian 11.

Automation Platform Support
```````````````````````````

- Adds support for automating deployments on RedHat Enterprise Linux
  version 8 and Amazon Linux 2 on the ARM64/aarch64 architecture.

- Removes support for automating deployments on Debian 9 and RedHat
  Enterprise Linux 6.
