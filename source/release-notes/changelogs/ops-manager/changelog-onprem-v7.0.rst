.. _opsmgr-server-7.0.2:

|onprem| Server 7.0.2
~~~~~~~~~~~~~~~~~~~~~

- Updates the {+mdbagent+} to :ref:`107.0.2.8531
  <mongodb-107.0.2.8531>`.
- Updates :abbr:`JDK (Java Development Kit)` to ``jdk-17.0.10+7``. 
- Adds MongoDB Agent support for Debian 12.
- Adds support for deploying |onprem| on Debian 12.
- Adds ability to configure the ``net.tls.clusterCAFile`` parameter. 
- Adds additional snapshot metrics to the snapshot summary table.
- Adds ability to track restore block download performance.
- Adds ability to specify a cluster CA file.
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

.. important:: 

   .. include:: /includes/om-7.0.1-upgrade.rst

- Updates the {+mdbagent+} to :ref:`107.0.0.8507
  <mongodb-107.0.0.8507>`.
- Bumps the minimum required {+mdbagent+} version for |onprem| 7.0
  to :ref:`107.0.0.8506-1 <mongodb-107.0.0.8506-1>`. You must 
  upgrade to this version of the {+mdbagent+} to allow clusters 
  using |oidc| to continue functioning after upgrading to MongoDB 7.0.5.
- Fixes a bug where clusters on MongoDB 7.0.0 to 7.0.4 using :manual:`OpenID
  Connect authentication </security-oidc/#std-label-authentication-oidc>` 
  fail to properly upgrade to MongoDB 7.0.5.

.. _opsmgr-server-7.0.0:

|onprem| Server 7.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-01-04*

.. important:: 

   .. include:: /includes/om-7.0.1-upgrade.rst

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
  :abbr:`Azure AD (Azure Active Directory)`, Okta, or Ping Identity.

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
