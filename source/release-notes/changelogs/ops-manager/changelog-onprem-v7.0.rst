.. _opsmgr-server-7.0.0:

|onprem| Server 7.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2024-01-04*

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
