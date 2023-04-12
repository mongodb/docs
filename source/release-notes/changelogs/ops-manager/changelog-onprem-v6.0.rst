.. _opsmgr-server-6.0.12:

|onprem| Server 6.0.12
~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-04-07*

- Updates the {+mdbagent+} to :ref:`12.0.20.7686 
  <mongodb-12.0.20.7686>`.
- Compatible with :db-tools:`MongoDB Database Tools 100.7.1
  </release-notes/database-tools-changelog/#100.7.1-changelog>`.
- Adds support for managing MongoDB deployments on the Ubuntu 22.04 (x86) operating system.
  BI Connector is not currently supported on the Ubuntu 22.04 (x86) operating system.

.. _opsmgr-server-6.0.11:

|onprem| Server 6.0.11
~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-03-15*

- Updates the {+mdbagent+} to :ref:`12.0.19.7676 
  <mongodb-12.0.19.7676>`.
- Updates `Apache Commons FileUpload 
  <https://commons.apache.org/proper/commons-fileupload/>`_ to 1.5 to 
  address `CVE-2023-24998 
  <https://nvd.nist.gov/vuln/detail/CVE-2023-24998>`_.
- Adds an option to support using multiple workers for a single file 
  during backups. You can enable this beta feature by doing the
  following: 

  1. In the :guilabel:`Settings` :ref:`page <group-settings-page>` for
     your :guilabel:`Project`, click the :guilabel:`Beta Features` tab.
  2. Toggle :guilabel:`Backup Multiple Workers Per File` to enable the 
     feature. 

.. _opsmgr-server-6.0.10:

|onprem| Server 6.0.10
~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-03-02*

- Updates the {+mdbagent+} to :ref:`12.0.18.7668
  <mongodb-12.0.18.7668>`.
- The {+mdbagent+} now compresses its own rotated logs.
- Fixes an issue where sharded collections could be missing from the chunks dropdown for the backing cluster in the UI.
- Fixes an issue where clicking the refresh button in the :guilabel:`Backup Job Timeline` UI resulted in a failure.
- Includes the lastest version of MongoDB Shell 1.6.2.
- Compatible with :db-tools:`MongoDB Database Tools 100.6.1
  </release-notes/database-tools-changelog/#100.6.1-changelog>`.

.. _opsmgr-server-6.0.9:

|onprem| Server 6.0.9
~~~~~~~~~~~~~~~~~~~~~

*Released 2023-02-02*

- Updates the {+mdbagent+} to :ref:`12.0.17.7665
  <mongodb-12.0.17.7665>`.
- Updates JDK to ``jdk-11.0.18+10``.

.. _opsmgr-server-6.0.8:

|onprem| Server 6.0.8
~~~~~~~~~~~~~~~~~~~~~

*Released 2023-01-12*

- Updates the {+mdbagent+} to :ref:`12.0.16.7656
  <mongodb-12.0.16.7656>`.
- Reintroduces :ref:`Namespace Filtering for backups <namespaces-filter>`.

.. _opsmgr-server-6.0.7:

|onprem| Server 6.0.7
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-12-01*

- Updates the {+mdbagent+} to :ref:`12.0.15.7646 
  <mongodb-12.0.15.7646>`.
- Fixes an issue where the list of projects was overriden in the left
  navigation bar.
- Adds global alerts for backup groom jobs running late.
- Adds system alerts for AppDB, Oplog Store, and Blockstore disk space
  filling up.
- Adds a new summary page in the Administration UI, under the Backup tab,
  with the status of the most recent snapshots.

.. _opsmgr-server-6.0.6:

|onprem| Server 6.0.6
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-11-08*

- Updates the {+mdbagent+} to :ref:`12.0.14.7630 
  <mongodb-12.0.14.7630>`.
- Updates JDK to ``jdk-11.0.17+8``.
- Updates jetty to 10.0.12 to fix a bug that occurred when SSL 
  connection errors prevented the release of the memory associated 
  with the connection.
- Fixes an issue that prevented downloading the {+mdbagent+} for 
  PowerPC (ppc64le) and zSeries (s390x) architectures.

.. _opsmgr-server-6.0.5:

|onprem| Server 6.0.5
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-10-20*

- Updates ``commons-text`` to 1.10.0 to address 
  :cve-id:`CVE-2022-42889 <CVE-2022-42889>`.

.. _opsmgr-server-6.0.4:

|onprem| Server 6.0.4
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-10-13*

- Updates the {+mdbagent+} to :ref:`12.0.12.7624 <mongodb-12.0.12.7624>`.
- Compatible with :db-tools:`MongoDB Database Tools 100.6.0 
  </release-notes/database-tools-changelog/#100.6.0-changelog>`.
- Uses amazon2 packages instead of RHEL7 packages on amazon2 hosts for
  :dl:`MongoDB Database Tools <database-tools>`. If you run |onprem| in the :doc:`local mode
  </tutorial/configure-local-mode>`, you can download
  amazon2 MongoDB Database Tools binaries via the {+mdbagent+}.
- Fixes an issue where the :guilabel:`Project List` was overriden in the
  left navigation bar in the UI.


.. _opsmgr-server-6.0.3:

|onprem| Server 6.0.3
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-09-01*

- Moves the :guilabel:`User to Distinguished Name Mapping` field in
  :guilabel:`Security Settings` from the :guilabel:`LDAP Authorization`
  section to the :guilabel:`Other Settings` section in
  :guilabel:`Native LDAP Authentication`. To learn more, see
  :ref:`Enable LDAP Authentication <enable-ldap-authentication>`.
- Updates the delay of the ``Query Targeting: Scanned Objects / Returned``
  default alert from 0 to 10 minutes, so that the alert fires only if
  this threshold is maintained for 10 minutes. This affects only the
  default alert configuration.
- Updates JDK to ``jdk-11.0.16.1+1``.
- Updates the {+mdbagent+} to :ref:`12.0.11.7606
  <mongodb-12.0.11.7606>`.

.. _opsmgr-server-6.0.2:

|onprem| Server 6.0.2
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-08-04*

- Removes spurious audit log rotation errors from the MongoDB Agent log 
  files and corrects file suffix handling.
- Adds MongoDB 6.0.0 as a deployment option.
- Introduces FCV 6.0 option in Ops Manager.
- Updates JDK to ``jdk-11.0.16+8``.
- Updates the {+mdbagent+} to :ref:`12.0.10.7591
  <mongodb-12.0.10.7591>`.

  .. include:: /includes/extracts/om6-warning-server-68925.rst

.. _opsmgr-server-6.0.1:

|onprem| Server 6.0.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-07-20*

- Supports MongoDB 6.0 as a deployment option, but doesn't display 
  MongoDB 6.0.0 as an available deployment option by default. To 
  display MongoDB 6.0.0 as a deployment option, set  
  ``mms.featureFlag.automation.enableV6`` :ref:`configuration 
  <conf-mms.properties>` option in the ``conf-mms.properties`` file to 
  ``enabled``.
- Updates the {+mdbagent+} to :ref:`12.0.9.7579 <mongodb-12.0.9.7579>`.

  .. include:: /includes/extracts/om6-warning-server-68925.rst

.. _opsmgr-server-6.0.0:

|onprem| Server 6.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-07-19*

- Updates the {+mdbagent+} to :ref:`12.0.8.7575 <mongodb-12.0.8.7575>`.

  .. include:: /includes/extracts/om6-warning-server-68925.rst

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
