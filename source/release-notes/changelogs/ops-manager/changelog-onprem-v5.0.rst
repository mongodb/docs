.. _opsmgr-server-5.0.22:

|onprem| Server 5.0.22
~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-07-31*

- Updates JDK to ``jdk-11.0.20+8``.
- Updates the {+mdbagent+} to :ref:`11.0.27.7162
  <mongodb-11.0.27.7162>`.
- Includes :dbtools:`MongoDB Database Tools 100.7.1
  </release-notes/database-tools-changelog/#100.7.1-changelog>`.
- Fixes CVE-2023-4009: Privilege Escalation for :authrole:`Project Owner`
  and :authrole:`Project User Admin` roles in |onprem|.

  - In MongoDB |onprem| 5.0 prior to 5.0.22, an authenticated user with
    :authrole:`Project Owner` or :authrole:`Project User Admin` access
    roles could generate an API key with the privileges of the
    :authrole:`Organization Owner` role resulting in privilege escalation.
  - CVSS Score: 7.2.
  - CWE-648: Incorrect Use of Privileged APIs.

.. _opsmgr-server-5.0.21:

|onprem| Server 5.0.21
~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-06-1*

- Updates JDK to ``jdk-11.0.19+7``.
- Updates the {+mdbagent+} to :ref:`11.0.26.7158
  <mongodb-11.0.26.7158>`.
- Includes BI Connector 2.14.6.
- Includes :dbtools:`MongoDB Database Tools 100.7.0
  </release-notes/database-tools-changelog/#100.7.0-changelog>`.
- Defaults the :guilabel:`Multiple Workers` option for a single file 
  during backup to :guilabel:`On`.
- Snapshots now include a flag that indicates whether or not they are incremental.
- Fixes `CVE-2023-0342 <https://nvd.nist.gov/vuln/detail/CVE-2023-0342>`__.
- Fixes a bug in the MongoDB Agent where the shutdown sequence might get
  blocked under certain circumstances, resulting in failed Agent upgrades.

.. _opsmgr-server-5.0.20:

|onprem| Server 5.0.20
~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-03-15*

- Updates the {+mdbagent+} to :ref:`11.0.25.7136 
  <mongodb-11.0.25.7136>`.
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

.. _opsmgr-server-5.0.19:

|onprem| Server 5.0.19
~~~~~~~~~~~~~~~~~~~~~~

- Updates ``woodstox:woodstox-core`` to 6.2.6 to address 
  `CWE-611 <https://cwe.mitre.org/data/definitions/611.html>`_.
- Updates the {+mdbagent+} to :ref:`11.0.24.7131
  <mongodb-11.0.24.7131>`.
- Compatible with :dbtools:`MongoDB Database Tools 100.6.1
  </release-notes/database-tools-changelog/#100.6.1-changelog>`.

.. _opsmgr-server-5.0.18:

|onprem| Server 5.0.18
~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-02-02*

- Updates JDK to ``jdk-11.0.18+10``.
- Updates the {+mdbagent+} to :ref:`11.0.23.7129
  <mongodb-11.0.23.7129>`.

.. _opsmgr-server-5.0.17:

|onprem| Server 5.0.17
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-11-17*

- Updates JDK to ``jdk-11.0.17+8``.
- Updates the {+mdbagent+} to :ref:`11.0.22.7120
  <mongodb-11.0.22.7120>`.

.. _opsmgr-server-5.0.16:

|onprem| Server 5.0.16
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-10-20*

- Updates ``commons-text`` to 1.10.0 to address 
  `CVE-2022-42889 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-42889>`__.
- Compatible with :dbtools:`MongoDB Database Tools 100.6.0 
  </release-notes/database-tools-changelog/#100.6.0-changelog>`.
- Uses amazon2 packages instead of RHEL7 packages on amazon2 hosts for
  :dl:`MongoDB Database Tools <database-tools>`. If you run |onprem| in the :doc:`local mode
  </tutorial/configure-local-mode>`, you can download
  amazon2 MongoDB Database Tools binaries via the {+mdbagent+}.

.. _opsmgr-server-5.0.15:

|onprem| Server 5.0.15
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-09-19*

- Removes spurious audit log rotation errors from the MongoDB Agent log 
  files and corrects file suffix handling.
- Updates JDK to ``jdk-11.0.16.1+1``.
- Updates the {+mdbagent+} to :ref:`11.0.20.7108
  <mongodb-11.0.20.7108>`.

.. _opsmgr-server-5.0.14:

|onprem| Server 5.0.14
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-08-04*

- Updates JDK to jdk-11.0.16+8.
- Updates the {+mdbagent+} to :ref:`11.0.19.7094
  <mongodb-11.0.19.7094>`.
  
  .. include:: /includes/extracts/om5-warning-server-68925.rst

.. _opsmgr-server-5.0.13:

|onprem| Server 5.0.13
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-07-21*

- Updates the {+mdbagent+} to :ref:`11.0.18.7089 
  <mongodb-11.0.18.7089>`.
  
  .. include:: /includes/extracts/om5-warning-server-68925.rst
- Fixes an issue that caused premature termination of sharded cluster 
  snapshots when one shard completed its snapshot before the other 
  shards.

.. _opsmgr-server-5.0.12:

|onprem| Server 5.0.12
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-06-30*

- Updates ``log4j-over-slf4j`` to 1.7.36 to address
  `CVE-2020-9493 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-9493>`__.
- Fixes an issue where editing an Oplog Store's name that contains dots 
  (``.``) might have resulted in errors.
- Compatible with :dbtools:`MongoDB Database Tools 100.5.3 
  </release-notes/database-tools-changelog#100.5.3-changelog>`.
- Updates the {+mdbagent+} to :ref:`11.0.17.7086
  <mongodb-11.0.17.7086>`.
- Switches to the BCFIPS Java Security Provider library.
- Switches from using ``/dev/random`` for random number generation to
  using ``/dev/urandom``.
  
  .. include:: /includes/extracts/om5-warning-server-68925.rst

.. _opsmgr-server-5.0.11:

|onprem| Server 5.0.11
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-06-02*

- Adds support for the |pagerduty| Events API V2. All new |pagerduty| keys use their `Events API v2 
  <https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTgw-events-api-v2-overview>`__. 
- Fixes an issue where updating {+mdbagent+} versions via the API fails when you 
  use controlled features.
- Updates the {+mdbagent+} to :ref:`11.0.16.7080 <mongodb-11.0.16.7080>`.
  
  .. include:: /includes/extracts/om5-warning-server-68925.rst

.. _opsmgr-server-5.0.10:

|onprem| Server 5.0.10
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-05-05*

- Adds support for Debian 10 when you use the :bic:`BI Connector </>`.
- Fixes an issue that occured when you changed the default server usage
  for organizations.
- Updates the |jdk| to ``jdk-11.0.15+10``.
- Updates the {+mdbagent+} to :ref:`11.0.15.7073 <mongodb-11.0.15.7073>`.
  
  .. include:: /includes/extracts/om5-warning-server-68925.rst

.. _opsmgr-server-5.0.9:

|onprem| Server 5.0.9
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-04-07*

- Adds support for concurrent MongoDB version 4.2+ snapshots and S3 snapshot store grooms.
- Fixes an incorrect link when filtering backup jobs on the admin pages.
- Fixes an issue where the {+mdbagent+} erroneously rejects changes when you use controlled features.
- Changes how disk space is calculated for Cloud Live Migrations. Starting with this release, 
  the migration process validates that the target |service| cluster has enough free disk based 
  on the storage size of the compressed data. To learn more about data and storage sizes, see 
  :manual:`dbStats </reference/command/dbStats/#dbstats>`.
- Fixes an issue when creating LDAP group mappings through the API.
- Updates the {+mdbagent+} to :ref:`11.0.14.7064 <mongodb-11.0.14.7064>`.
- Compatible with :dbtools:`MongoDB Database Tools 100.5.2 
  </release-notes/database-tools-changelog#100.5.2-changelog>`.

.. _opsmgr-server-5.0.8:

|onprem| Server 5.0.8
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-03-03*

- Supports MongoDB log rotate configuration and commands for 
  independent log rotation configuration for MongoDB Log and MongoDB 
  Audit Log Files.

- Updates the {+mdbagent+} to :ref:`11.0.13.7055 <mongodb-11.0.13.7055>`.

- Compatible with :dbtools:`MongoDB Database Tools 100.5.2 
  </release-notes/database-tools-changelog#100.5.2-changelog>`.

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
- Compatible with :dbtools:`MongoDB Database Tools 100.5.2 
  </release-notes/database-tools-changelog#100.5.2-changelog>`.

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

- Compatible with :dbtools:`MongoDB Database Tools 100.5.1 
  </release-notes/database-tools-changelog#100.5.1-changelog>`.

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

- Compatible with :dbtools:`MongoDB Database Tools 100.4.0 
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

- Compatible with :dbtools:`MongoDB Database Tools 100.4.0 
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
