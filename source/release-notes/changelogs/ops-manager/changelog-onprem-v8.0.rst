.. _opsmgr-server-8.0.1:

|onprem| Server 8.0.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-11-01*

- Updates JDK to ``jdk-21.0.5+11``.
- Supports :ref:`Workload Identity Federation <om-oidc-authentication-workload>` on top of the already existing Workforce Identity Federation. 
- Supports configuring separate SAML signature validation for responses and assertions so that only one is 
  required through the :setting:`mms.saml.signedAssertions` and :setting:`mms.saml.signedMessages` settings.
- Supports ability to set a custom idle session timeout using new app settings, :guilabel:`Idle Session Timeout Mode` and :guilabel:`Idle Session Timeout Max Minutes`.
- Removes the |onprem| version number from the login page.
- Updates the MongoDB Agent to :ref:`108.0.1.8718-1 <mongodb-108.0.1.8718-1>`.
- Adds support for |bic-full| 2.14.17.
- Upgrades Jetty library to 11.0.23.
- Fixes an issue where the {+mdbagent+} gets stuck because indexes are set to the ``CANCEL`` action.
- Fixes `CVE-2024-8184 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-8184>`__.

.. _opsmgr-server-8.0.0:

|onprem| Server 8.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-9-30*

.. note::

   The following list contains features and improvements 
   that have been added since |onprem| 7.0.0, many of which 
   are also included in later minor releases of |onprem| 7.0.
   For details, see :ref:`Ops Manager 7.0 releases <opsmgr-server-7.0>`.

- Updates the {+mdbagent+} to :ref:`108.0.1
  <mongodb-108.0.1>`.

MongoDB Cluster Management
``````````````````````````

- Supports managing, monitoring, and backing up MongoDB 8.0 deployments.
- Supports MongoDB 8.0 as a deployment option.
- Supports deployments that use :manual:`config shards </core/sharded-cluster-config-servers/#config-shards>`.
  
  .. note::

     :ref:`Queryable backups <restore-from-queryable-backup>` 
     are not supported when you use config shards.

- Deprecates support for MongoDB 4.4 and MongoDB 5.0 deployments.
- Deprecates support for MongoDB Server 6.0 as a :ref:`backing database <om-install-backing-dbs>`.
- Removes support for MongoDB 4.2 deployments.

Backup
``````

- Supports performing :ref:`on-demand snapshots <on-demand-snapshots>` 
  in addition to scheduled snapshots.
- Supports enabling and configuring :ref:`regional backups <regional-backup>`.
- Supports parsing multiple certificates, or a chain, from PEM
  files for |s3| backup store configuration.
- Adds additional snapshot history metadata for block tracking,
  incrementality for data and indexes, transfer speed, and duration in the
  :guilabel:`Admin` interface and :guilabel:`Diagnostic Archive`.
- Adds additional snapshot metrics to the snapshot summary table.
- Adds ability to track restore block download performance.
- Enhances logging for MongoDB blockstores groom progress and checks 
  that grooms have enough space to run before starting.

Automation
``````````

- Improves the redaction of sensitive fields.
- Supports ``net.tls.clusterAuthX509`` parameter in MongoDB 7.0 for
  ``clusterAuthMode`` set to ``x509``. 
- Adds ability to configure the :setting:`net.tls.clusterCAFile` parameter.
- Adds API support for project-level MongoDB log rotation settings.
- Adds automation support for :manual:`at-rest encryption
  </core/security-encryption-at-rest/#encryption-at-rest>` of
  :ref:`audit logs <deployment-advanced-options-audit-log>` in MongoDB
  6.0 and later versions.
  
|onprem| Platform Support
```````````````````````````

- Removes |onprem| support for RedHat Enterprise Linux 7.
- Removes |onprem| support for SUSE Linux Enterprise Server 12.
- Removes |onprem| support for Ubuntu 20.04 LTS.
- Deprecates |onprem| support for Amazon Linux v2 LTS.
- Deprecates |onprem| support for Debian 11.
