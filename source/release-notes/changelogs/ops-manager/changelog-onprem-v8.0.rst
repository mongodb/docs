.. _opsmgr-server-8.0.0:

|onprem| Server 8.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-10-01*

.. note::

   The following list contains features and improvements 
   that have been added since |onprem| 7.0.0, many of which 
   are also included in later minor releases of |onprem| 7.0.
   For details, see :ref:`Ops Manager 7.0 releases <opsmgr-server-7.0>`.
   
MongoDB Cluster Management
``````````````````````````

- Supports managing, monitoring, and backing up MongoDB 8.0 deployments.
- Supports MongoDB 8.0 as a deployment option.
- Supports deployments that use :manual:`config shards </core/sharded-cluster-config-servers/#config-shards>`.
  
  .. note::

     :ref:`Queryable backups <restore-from-queryable-backup>` 
     are not supported when you use config shards.

- Deprecates support for MongoDB 4.4 and MongoDB 5.0 deployments.
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
