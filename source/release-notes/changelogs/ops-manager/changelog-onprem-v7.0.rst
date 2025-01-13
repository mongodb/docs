.. _opsmgr-server-7.0.12:

|onprem| Server 7.0.12
~~~~~~~~~~~~~~~~~~~~~~

*Released 2024-10-31*

- Updates JDK to ``jdk-17.0.13+11``.
- Supports :ref:`Workload Identity Federation <om-oidc-authentication-workload>` on top of the already existing Workforce Identity Federation. 
- Supports configuring separate SAML signature validation for responses and assertions so that only one is 
  required through the :setting:`mms.saml.signedAssertions` and :setting:`mms.saml.signedMessages` settings.
- Supports ability to set a custom idle session timeout using new application settings, :guilabel:`Idle Session Timeout Mode` and :guilabel:`Idle Session Timeout Max Minutes`.
- Supports taking on-demand snapshots in addition to scheduled snapshots.
- Removes the |onprem| version number from the login page if you set :setting:`mms.security.show.om.version` to false.
- Updates the {+mdbagent+} to :ref:`107.0.12.8669-1 <mongodb-107.0.12.8669-1>`.
- Adds support for |bic-full| 2.14.17.
- Upgrades Jetty library to 11.0.23.
- Fixes an issue where the {+mdbagent+} gets stuck because indexes are set to the ``CANCEL`` action.
- Fixes `CVE-2024-8184 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-8184>`__.

.. _opsmgr-server-7.0.11:

|onprem| Server 7.0.11
~~~~~~~~~~~~~~~~~~~~~~

*Released 2024-09-05*

- Updates the {+mdbagent+} to :ref:`107.0.11.8645-1 <mongodb-107.0.11.8645-1>`.
- Adds support |bic-full| 2.14.15.
- Compatible with :dbtools:`MongoDB Database Tools 100.10.0
  </release-notes/database-tools-changelog/#100.10.0-changelog>`.
- Removes the {+mdbagent+} dependencies on the ``redhat-lsb-core`` 
  package for RHEL and ``lsb-release`` pacakge for Debian.  
- Ensures that |onprem| retains at least one snapshot regardless of expiration schedule.
- Fixes the following issues:

  - Upgrades from |onprem| 6 to |onprem| 7 fail due to a missing field
    in the |snmp| alert configuration used for upgrade validation.
  - Diagnostics archive shows incorrect free space for File System snapshot store.
  - ``DeploymentId`` not displayed for shards with regional backup enabled.
  - Potential error when saving updates to oplog or snapshot stores due to ``DeploymentId`` validation.
  - Possible shutdown loop when KMIP rotation and initial sync run concurrently.

.. _opsmgr-server-7.0.10:

|onprem| Server 7.0.10
~~~~~~~~~~~~~~~~~~~~~~

*Released 2024-08-01*

- Updates the {+mdbagent+} to :ref:`107.0.10.8627-1 <mongodb-107.0.10.8627-1>`.
- Updates :abbr:`JDK (Java Development Kit)` to ``jdk-17.0.12+7``. 
- Improves metadata clean up when terminating backup jobs.
- Fixes `CVE-2023-45288 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-45288>`__
- Fixes the following issues:

  - Creating a new regional backup errors on internal sync store assignment. 
  - Agent potentially crashes during restart due to a race condition.

.. _opsmgr-server-7.0.9:

|onprem| Server 7.0.9
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-07-18*

- Updates the {+mdbagent+} to :ref:`107.0.9.8621-1 <mongodb-107.0.9.8621-1>`.
- Adds support for |bic-full| 2.14.14.
- Compatible with :dbtools:`MongoDB Database Tools 100.9.5
  </release-notes/database-tools-changelog/#100.9.5-changelog>`.
- Improves validation for :ref:`regional backup <regional-backup>`
  configurations. 
- Fixes the following |cve|\s:
  
  - `CVE-2024-5157 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-5157>`__.
  - `CVE-2024-5159 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-5159>`__.
  - `CVE-2024-5160 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-5160>`__.
  - `CVE-2024-5493 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-5493>`__.
  - `CVE-2024-5494 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-5494>`__.
  - `CVE-2024-5495 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-5495>`__.
  - `CVE-2024-5496 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-5496>`__.
  - `CVE-2024-6100 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-6100>`__.
  - `CVE-2024-6103 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-6103>`__.
  - `CVE-2024-24786 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-24786>`__.

- Fixes a potential restore validation error.
- Fixes a bug where altering the snapshot time skips longer retained snapshots.

.. _opsmgr-server-7.0.8:

|onprem| Server 7.0.8
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-06-27*

- Updates the {+mdbagent+} to :ref:`107.0.8.8615-1 <mongodb-107.0.8.8615-1>`.
- Adds support for |bic-full| 2.14.13.
- Improves a snapshot's ability to use the same node from a previous
  snapshot.
- Improves the warning when file system stores doesn't exist.
- Ensures that a groom job has enough space to run before starting.
- Fixes the following |cve|\s:
  
  - `CVE-2024-3156 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-3156>`__.
  - `CVE-2024-5831 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-5831>`__.
  - `CVE-2024-5832 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-5832>`__.
  - `CVE-2024-22017 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-22017>`__.

- Fixes an issue where the |http| transport for automation didn't always
  use the configured |tls| configuration. 
- Improves the redaction of sensitive fields.

.. _opsmgr-server-7.0.7:

|onprem| Server 7.0.7
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-06-06*

- Updates the {+mdbagent+} to :ref:`107.0.7.8596 <mongodb-107.0.7.8596>`.
- Fixes an issue that could cause termination jobs to timeout due to unassigned blockstores.
- Fixes an issue where required backup job fields could become null.

.. _opsmgr-server-7.0.6: 

|onprem| Server 7.0.6
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-05-10*

- Updates the {+mdbagent+} to :ref:`107.0.6.8587-1 <mongodb-107.0.6.8587>`.
- Supports parsing multiple certificates, or a chain, from PEM
  files for |s3| backup store configuration.
- Adds alert to verify ``defaultRWConcern`` of the AppDB and other
  backing databases. 
- Fixes the following issues:

  - Backup job logs for a specific logger didn't appear correctly in the
    UI. 
  - ObjectId fields in snapshot history rendered incorrectly.

.. _opsmgr-server-7.0.5: 

|onprem| Server 7.0.5
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-05-02*

- Updates the {+mdbagent+} to :ref:`107.0.3.8581-1 <mongodb-107.0.3.8581>`.
- Releases {+mongosh+} 2.2.4 to |onprem|. To learn more, see {+mongosh+} 
  Release Notes.
- Updates :abbr:`JDK (Java Development Kit)` to ``jdk-17.0.11+9``. 
- Displays |s3| :opsmgr:`oplog store
  </reference/glossary/#std-term-Oplog-Store-Database>` databases as a
  backing database in the :guilabel:`Admin Overview` tab.
- Adds additional diagnostics information related to backup speed in a
  separate download ingestible format from diagnostic archive. 
- Adds additional snapshot history metadata for block tracking,
  incrementality for data and indexes, transfer speed, and duration in
  the Admin UI and diagnostic archives.
- Increases the number of snapshots retained to 60 snapshots per cluster
  for the snapshot history metadata.
- Fixes an issue with backup configuration daemon filter for deleted
  daemons. 
- Fixes `CVE-2024-29025 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-29025>`__.

.. _opsmgr-server-7.0.4: 

|onprem| Server 7.0.4
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-04-04*

- Releases {+mongosh+} 2.2.3 to |onprem|. To learn more, see {+mongosh+} 
  Release Notes.
- Supports enabling and configuring :ref:`regional backups
  <deployment-regions-interface>`.
- Supports ``net.tls.clusterAuthX509`` parameter in MongoDB 7.0 for
  ``clusterAuthMode`` set to ``x509``. 
- Adds API support for project level MongoDB :ref:`log rotation
  <automation-configuration-resource>` settings. 
- Adds ability for backup to automatically configure an improved default
  blocksize for mongo blockstores.
- Adds automation support for :manual:`at-rest encryption
  </core/security-encryption-at-rest/#encryption-at-rest>` of
  :ref:`audit logs <deployment-advanced-options-audit-log>` in MongoDB
  6.0 and later versions.  
- Enhances logging for MongoDB blockstores groom progress.
- Fixes the following issues:
  
  - Inactive accounts prevented users from navigating to the continuous backup page.
  - Restore would fail in existing deployments if credentials version didn't match.
  - Restores couldn't progress due to a DOWN host.
  - The ``mongodVersion`` in the backup jobs collection doesn't update correctly.

- Fixes `CVE-2023-33546 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-33546>`__
- Fixes `CVE-2024-22201 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-22201>`__

.. _opsmgr-server-7.0.3: 

|onprem| Server 7.0.3
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-03-07*

- Updates the {+mdbagent+} to :ref:`107.0.3.8550-1 <mongodb-107.0.3.8550>`.
- Fixes a bug where |onprem| upgrades might become stuck
  when webhook notifications are configured due to ``webhook_url`` 
  not populating correctly.
- Adds {+mdbagent+} support for Ubuntu 20.04 and RHEL 9 on ARM.
- Fixes a bug where the {+mdbagent+} wasn't considering all of 
  a certificate's :abbr:`SANs (Subject Alternative Names)`.
- Adds the ability to edit WiredTiger job setting, number of 
  backup workers, and bandwidth for backups in the
  :ref:`admin-console`.
- Adds the ability for |onprem| to automatically choose the
  number of backup workers based on available CPU cores and
  memory.
- Fixes `CVE-2023-52428 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-52428>`__
- Fixes `CVE-2024-25710 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-25710>`__
- Fixes `CVE-2024-26308 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2024-26308>`__
- Releases {+mongosh+} 2.1.5 to |onprem|. To learn more, see {+mongosh+}
  :mdb-shell:`Release Notes </changelog/#v2.1.5>`.
- Fixes an issue where |mms| inaccurately reported the 
  :guilabel:`network bytes out` metric that appears in the 
  :guilabel:`System Network` chart. This release resets this metric and 
  the previous values no longer appear. To learn more, see 
  :ref:`review-available-metrics` and :ref:`system-disk-alerts`.

.. _opsmgr-server-7.0.2:

|onprem| Server 7.0.2
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-02-01*

- Updates the {+mdbagent+} to :ref:`107.0.2.8531
  <mongodb-107.0.2.8531>`.
- Updates :abbr:`JDK (Java Development Kit)` to ``jdk-17.0.10+7``. 
- Adds MongoDB Agent support for Debian 12.
- Adds support for deploying |onprem| on Debian 12.
- Adds ability to configure the ``net.tls.clusterCAFile`` parameter. 
- Adds additional snapshot metrics to the snapshot summary table.
- Adds ability to track restore block download performance.
- Improves MongoDB and S3-compatible blockstore snapshot performance for
  large files through enhanced memory utilization.
- Improves the agent's ability to retry for more blockstore errors.
- Fixes the following bugs:

  - DBUsage API endpoint issue that affected totalCount, pageNum,
    filtering and pagination in the UI.
  - ``Oplog Behind`` warning could be displayed for non-active shards.
  - ``LOW_APP_DB_FREE_SPACE_PERCENT`` alert was not working correctly.
  - Servers might display stale statuses in the |onprem| UI.
- Removes ability to :ref:`delete a project <delete-project>` that has 
  managed deployments.

.. _opsmgr-server-7.0.1:

|onprem| Server 7.0.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-01-08*

.. important:: 

   .. include:: /includes/om-7.0.1-upgrade.rst

- Updates the {+mdbagent+} to :ref:`107.0.0.8507
  <mongodb-107.0.0.8507>`.
- Bumps the minimum required {+mdbagent+} version for |onprem| 7.0
  to :ref:`107.0.0.8506-1 <mongodb-107.0.0.8506-1>`. You must 
  upgrade to this version of the {+mdbagent+} to allow clusters 
  using |oidc| to continue functioning after upgrading to MongoDB 7.0.5.
- Fixes a bug where clusters on MongoDB 7.0.0 to 7.0.4 using :manual:`OpenID
  Connect authentication </core/security-oidc/#std-label-authentication-oidc>` 
  fail to properly upgrade to MongoDB 7.0.5.

.. _opsmgr-server-7.0.0:

|onprem| Server 7.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-01-04*

.. important:: 

   .. include:: /includes/om-7.0.1-upgrade.rst

- Updates the {+mdbagent+} to :ref:`107.0.0.8490-1
  <mongodb-107.0.0.8490-1>`.

MongoDB Cluster Management
``````````````````````````

- Supports managing, monitoring, and backing up MongoDB 7.0 deployments.
- Supports MongoDB 7.0 as a deployment option.

Backup
``````

- Exposes performance and snapshot metrics to admins.
  
  - Admins can now :ref:`use Prometheus <prometheus-integration-mms>`
    to view metrics graphs and query newly created collections in the 
    :ref:`admin-console`.

Alerting
````````

- Removes support for |snmp| alerts. 

  - You can monitor your clusters with |onprem| instead. To
    learn about other alert options, see :ref:`third-party-integrations`.

- Redacts third-party credentials.
  
  - |onprem| redacts credentials for third-party metrics and alert integrations 
    when you view or edit an alert through the UI or query third-party 
    integration settings through the |api|. 
    
    You can still edit these credentials. We recommend that you store these credentials outside of |onprem|.  

Automation
``````````

- Adds support for :ref:`enabling OIDC authentication 
  <enable-oidc-auth>` through an |idp| that supports |oidc|, such as 
  |azure-ad|, Okta, or Ping Identity.
- Replaces the target of the ``/var/lib/mongodb-mms-automation/bin`` symlink. This symlink now points to the 
  latest downloaded version of {+mongosh+}. In the previous releases, this symlink pointed to the latest 
  MongoDB version in the ``/bin`` folder. This change ensures that you always use the newest downloaded 
  {+mongosh+} version in all scripts for your deployments. 

Migration
`````````

- Removes support for the MongoDB Cloud Migration Service in |onprem|. 
  If you need to use push-based migrations to migrate your 
  deployments to |service|, you can use the Cloud Migration Service in |cloud|.

User Interface
``````````````

- Removes support for the Manage Sharded Collections UI. 
  
  - Removes the ability to shard a collection, 
    manage the sharded cluster balancer, and manage sharded 
    zones through the UI. You still have full control
    of your sharded cluster available through the command line 
    by using {+mongosh+}.

- Removes support for Internet Explorer 11.

|onprem| Platform Support
`````````````````````````

- Adds support for deploying |onprem| on RedHat Enterprise Linux 9 on x86_64 architectures.
- Adds support for deploying |onprem| on Ubuntu 22.04 on x86_64 architectures.
- Adds support for deploying |onprem| on Amazon Linux 2023.
- Adds support to fix broken ``rpm`` packages for |onprem| versions 6.0.0, 6.0.1, and 6.0.2 
  containing incorrect version information that could cause standard 
  upgrades to fail. If upgrading from any of these versions to 
  version 6.0.3 or greater, upgrade the package using the 
  ``--oldpackage`` flag:

  .. code-block:: sh

      sudo rpm -Uvh --oldpackage mongodb-mms-<version>.x86_64.rpm

- Removes |onprem| support for Debian 10.
- Removes |onprem| support for Ubuntu 18.04 LTS.
- Deprecates |onprem| support for RedHat Enterprise Linux 7.
- Deprecates |onprem| support for SUSE Linux Enterprise Server 12.
- Deprecates |onprem| support for Ubuntu 20.04 LTS.

Automation Platform Support
```````````````````````````

- Adds {+mdbagent+} support for RedHat Enterprise Linux 9 on x86_64 and ARM architectures.
- Adds {+mdbagent+} support for Ubuntu 22.04 on x86_64 and ARM architectures.
- Adds {+mdbagent+} support for Amazon Linux 2023.
- Removes {+mdbagent+} support for Debian 10.
- Removes {+mdbagent+} support for Ubuntu 18.04 LTS.
- Deprecates {+mdbagent+} support for RedHat Enterprise Linux 7.
- Deprecates {+mdbagent+} support for SUSE Linux Enterprise Server 12.
- Deprecates {+mdbagent+} support for Ubuntu 20.04 LTS.
