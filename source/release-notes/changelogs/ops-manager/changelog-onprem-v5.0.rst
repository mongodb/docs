.. _opsmgr-server-5.0.8:

|onprem| Server 5.0.8
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-03-03*

- Supports MongoDB log rotate configuration and commands for 
  independent log rotation configuration for MongoDB Log and MongoDB 
  Audit Log Files.

- Updates the {+mdbagent+} to :ref:`11.0.13.7055 <mongodb-11.0.13.7055>`.

.. _opsmgr-server-5.0.7:

|onprem| Server 5.0.7
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-02-17*

- Removes support for running |onprem| on:
  
  - RHEL 7.x/8.x, and Ubuntu 16.x on PowerPC (``ppc64le``)
    architectures.
  - RHEL 6.x/7.x, Ubuntu 18.x, and SUSE 12.x on zSeries (``s390x``)
    architectures.

  To learn more about supported platforms for running |onprem| on, see
  :ref:`Ops Manager Software Requirements <software-requirements>`.
- Fixes an issue where S3 Oplog Stores can leave behind S3 objects even
  after the configured retention window has elapsed.
- Updates JDK to jdk-11.0.14.1+1
- Keeps legacy monitoring and backup agents in sync with MongoDB agent
  configuration when making ``automationConfig`` API and UI updates.
- Removes workaround to use an X.509 CommonName instead of a |san-dns|.
- Updates the {+mdbagent+} to :ref:`11.0.12.7051 <mongodb-11.0.12.7051>`

.. _opsmgr-server-5.0.6:

|onprem| Server 5.0.6
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-01-13*

- Improves storage size calculation for a Cloud Live Migration of a
  sharded cluster.
  
- Fixes a bug that prevents |onprem| from syncing user information from
  LDAP servers.

- Fixes a bug where |onprem| incorrectly escaped characters in LDAP
  search filters.

- Updates the {+mdbagent+} to :ref:`11.0.11.7036 <mongodb-11.0.11.7036>`.

- When taking a snapshot, allows the {+mdbagent+} to slow the sending
  of data blocks when |onprem| is overloaded, so that the snapshot can
  complete. Successful completion of snapshots is prioritized over
  speed.
  
  .. important::

     To use this feature, you must upgrade to 
     :ref:`the latest version of the {+mdbagent+} <mongodb-11.0.11.7036>`.

.. _opsmgr-server-5.0.5:

|onprem| Server 5.0.5
~~~~~~~~~~~~~~~~~~~~~

*Released 2021-12-02*

- Upgrades the JDK to version 11.0.13.
- Updates the {+mdbagent+} to :ref:`11.0.10.7021 <mongodb-11.0.10.7021>`.


.. _opsmgr-server-5.0.4:

|onprem| Server 5.0.4
~~~~~~~~~~~~~~~~~~~~~

*Released 2021-11-04*

- Fixed an issue where |s3os|\s would not appear on the 
  :guilabel:`Oplog Storage` page in the administration console in all
  configurations.
  
- Updates the {+mdbagent+} to :ref:`11.0.9.7010 <mongodb-11.0.9.7010>`.

- Removes support for RHEL 6.

.. _opsmgr-server-5.0.3:

|onprem| Server 5.0.3
~~~~~~~~~~~~~~~~~~~~~

*Released 2021-10-06*

- Updates the {+mdbagent+} to :ref:`11.0.8.7002
  <mongodb-11.0.8.7002>`.

.. _opsmgr-server-5.0.2:

|onprem| Server 5.0.2
~~~~~~~~~~~~~~~~~~~~~

*Released 2021-09-03*

- Fixes a bug where, when running in local mode, with both PowerPC
  RHEL71 and RHEL81 builds of MongoDB present, the RHEL81 build would
  always be selected.

- Updates the {+mdbagent+} to :ref:`11.0.7.6992
  <mongodb-11.0.7.6992>`.

- Upgrades the JDK to version 11.0.12, which restricts the use of
  insecure TLS versions 1.0 and 1.1. To learn more, see the
  `JDK release notes <https://www.oracle.com/java/technologies/javase/11-0-11-relnotes.html#JDK-8202343>`__.

- Compatible with :db-tools:`MongoDB Database Tools 100.4.0 
  </release-notes/database-tools-changelog#100.4.0-changelog>`.


.. _opsmgr-server-5.0.1:

|onprem| Server 5.0.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2021-08-05*

- Improves Log Collection Jobs.

- Adds a warning message when Ops Manager has less than 10GB of disk 
  space available.

- Fixes a bug that prevents clusters' Real-Time Panel tab from 
  loading properly.

- Disables the continuous backup page when AppDB monitoring is enabled.

- Updates the {+mdbagent+} to :ref:`11.0.6.6981
  <mongodb-11.0.6.6981>`.

- Compatible with :db-tools:`MongoDB Database Tools 100.4.0 
  </release-notes/database-tools-changelog#100.4.0-changelog>`.

.. _opsmgr-server-5.0.0:

|onprem| Server 5.0.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2021-07-13*

MongoDB Cloud Migration Service
```````````````````````````````

Adds the MongoDB Cloud Migration Service. This service powers Live
Migrations from |onprem| or |cloud| to |service|. The service runs
when you use the Live Migration wizard in |service|. After preparing a
target cluster in |service-short|, provisioning a migration host in
|onprem|, and linking your |onprem| or |cloud| organization to your
|service| organization, you can launch a Live Migration process in
|service| for an existing cluster in |onprem| or |cloud|, and migrate
all data from the source cluster to a target cluster in |service-short|.
You can also migrate a MongoDB Community to |service|.

For more information, see :ref:`lm-workflow` in the
|service-short| documentation.

To live migrate your deployment from |onprem| or |cloud| to
|service-short|, see :ref:`migrate-to-atlas`.
To live migrate your MongoDB Community deployments to |service-short|
using |mms|, see :ref:`migrate-community-to-atlas`.

MongoDB Cluster Management
``````````````````````````

- Supports managing, monitoring, and backing up MongoDB 5.0 deployments.

- Highlights deployments running without best-practice security
  features enabled (|tls|, authentication, authorization) in the
  **Clusters** page.

- Highlights changes to MongoDB clusters that result in processes
  restarts in the **Review and Deploy** confirmation modal.

Backup
``````

- Improves snapshot resiliency to transient failures for clusters
  running MongoDB 4.2 or later.

- Improves performance for snapshots running MongoDB 4.2 or later.

- Improves metadata management and handling of large files.

Activity Feed
`````````````

- Increases granularity of date filters in Activity Feed to the hour. 

- Adds ability for admins to download a |json| view of the Activity
  Feed.

- Adds categories of events for improved filtering of Activity Feed
  items. These improvements exist in both the console and the |api|.

Deprecated Language
```````````````````

- Changes all instances of the following terms in the activity feed,
  console, and |api| endpoint |url|\s:

  - **Whitelist** or **Blacklist** to **Access List**
  - **slaveDelay** to **secondaryDelaySecs**

  Make sure to update any application code or scripts with these
  updated labels to reflect this change.

Deactivated Personal API Keys
`````````````````````````````

- Fully removes personal |api| keys. Use :ref:`programmatic API keys <mms-prog-api-key>` 
  to access the :doc:`API </reference/api>`.

Performance Advisor
```````````````````

- Supports up to 200,000 logs.

- Doesn't cap logs read at 10 MB.

- Suggests removing redundant, unused, or hidden indexes.

Monitoring
``````````

Adds new hardware charts for system level memory, swap, and network
usage on RHEL Linux.

Kubernetes
``````````

Simplifies deploying Kubernetes MongoDB resources. This release adds a
wizard-like interface to generate configuration files in the |onprem|
console. MongoDB Kubernetes Enterprise Operator
:k8s:`improvements released </release-notes>` separately.

|onprem| Packaging
``````````````````

- Signs |onprem| packages with PGP.

- Supports |onprem| services on RedHat Enterprise Linux version 8 on
  the ppc64le architecture.

Security
````````

Disables |tls| versions 1.0 and 1.1 by default.

MongoDB Agent
`````````````
Updates the {+mdbagent+} to :ref:`11.0.5.6967-1
<mongodb-11.0.5.6967-1>`.
