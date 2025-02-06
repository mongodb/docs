.. _opsmgr-server-6.0.27:

|onprem| Server 6.0.27:
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2025-01-30*

.. important:: |onprem| 6.0 EOL
   
   This is the final release of |onprem| 6.0. |onprem| 6.0 has reached `end of life (EOL) <https://www.mongodb.com/legal/support-policy/lifecycles>`__.
   Upgrade to at least |onprem| 7.0 immediately to keep your |onprem| support.

- Updates the {+mdbagent+} to :ref:`12.0.35.7911-1
  <mongodb-12.0.35.7911-1>`.
- Adds support for |bic-full| 2.14.21.
- Updates JDK to ``jdk-11.0.26+4``.
- Fixes an issue so that the {+mdbagent+} downloads the correct |bic-full|
  versions for all platforms.
- Fixes the following |cve|\s:

  - `CVE-2024-10229 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-10229>`__
  - `CVE-2024-10487 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-10487>`__
  - `CVE-2024-10827 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-10827>`__
  - `CVE-2024-11110 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-11110>`__
  - `CVE-2024-12053 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-12053>`__
  - `CVE-2024-12798 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-12798>`__
  - `CVE-2024-21534 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-21534>`__
  - `CVE-2024-47535 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-47535>`__
  - `CVE-2024-52046 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-52046>`__
  - `CVE-2025-0436 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-0436>`__

.. _opsmgr-server-6.0.26:

|onprem| Server 6.0.26:
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2024-10-31*

- Updates the {+mdbagent+} to :ref:`12.0.34.7888-1
  <mongodb-12.0.34.7888-1>`.
- Adds support for |bic-full| 2.14.17.
- Updates JDK to ``jdk-11.0.25+9``.
- Improves the metadata clean up when you terminate a backup job.
- Fixes the following |cve|\s:

  - `CVE-2024-6291 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-6291>`__
  - `CVE-2024-6292 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-6292>`__
  - `CVE-2024-6293 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-6293>`__
  - `CVE-2024-6773 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-6773>`__
  - `CVE-2024-6778 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-6778>`__
  - `CVE-2024-6779 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-6779>`__
  - `CVE-2024-6991 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-6991>`__
  - `CVE-2024-7966 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-7966>`__
  - `CVE-2024-7969 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-7969>`__
  - `CVE-2024-7970 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-7970>`__
  - `CVE-2024-8184 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-8184>`__
  - `CVE-2024-8193 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-8193>`__
  - `CVE-2024-8198 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-8198>`__
  - `CVE-2024-8362 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-8362>`__
  - `CVE-2024-8636 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-8636>`__
  - `CVE-2024-8904 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-8904>`__
  - `CVE-2024-9120 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-9120>`__
  - `CVE-2024-9121 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-9121>`__
  - `CVE-2024-9123 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-9123>`__
  - `CVE-2024-9602 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-9602>`__

.. _opsmgr-server-6.0.25:

|onprem| Server 6.0.25:
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2024-08-08*

- Compatible with :dbtools:`MongoDB Database Tools 100.10.0
  </release-notes/database-tools-changelog/#100.10.0-changelog>`.
- Updates the {+mdbagent+} to :ref:`12.0.33.7866-1 
  <mongodb-12.0.33.7866-1>`.
- Updates Go to 1.22 to build the {+mdbagent+}.
- Adds support for |bic-full| 2.14.14.
- Removes the requirement that RHEL
  :abbr:`OS (Operating System)` must include the ``redhat-lsb-core`` 
  package. 
- Removes the requirement that a Debian installation must include the
  ``lsb-release`` package. To learn more, see `lsb-release
  <https://packages.debian.org/sid/lsb-release>`__. 
- Fixes the following |cve|\s:

  - `CVE-2021-4279 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-4279>`__
  - `CVE-2023-22467 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-22467>`__
  - `CVE-2023-45288 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-45288>`__
  - `CVE-2024-37298 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-37298>`__

- Updates JDK to ``jdk-11.0.24+8``.
- Fixes an issue so that a race condition no longer causes an agent to 
  crash during restart.

.. _opsmgr-server-6.0.24:

|onprem| Server 6.0.24:
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2024-07-12*

- Compatible with :dbtools:`MongoDB Database Tools 100.9.5
  </release-notes/database-tools-changelog/#100.9.5-changelog>`.
- Adds support for |bic-full| 2.14.13.
- Updates the {+mdbagent+} to :ref:`12.0.32.7851-1 <mongodb-12.0.32.7851-1>`.
- Releases {+mongosh+} 2.2.4 to |onprem|. To learn more, see {+mongosh+}
  :mdb-shell:`Release Notes </changelog/#v2.2.4>`.
- Uses server-side random sampling to distribute data points in
  :ref:`Profiler <profile-databases>` more evenly across the
  scatterplot.
- Displays S3 Oplog Store DBs as a backing DB in the :guilabel:`Admin` 
  interface's :guilabel:`Overview` tab.
- Provides additional diagnostics information related to backup speed in 
  a separate download format from :guilabel:`Diagnostic Archive`.
- Updates snapshot history to include additional metadata for block tracking, 
  incrementality for data and indexes, transfer speed, and duration in the 
  :guilabel:`Admin` interface and :guilabel:`Diagnostic Archive`.
- Updates snapshot history from 20 to 60 snapshots for each cluster.
- Adds API support for project level MongoDB :ref:`log rotation <configure-mms-log-rotation>`
  settings.
- Fixes the following |cve|\s:

  - `CVE-2024-3156 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-3156>`__
  - `CVE-2024-5157 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-5157>`__
  - `CVE-2024-5159 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-5159>`__
  - `CVE-2024-5160 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-5160>`__
  - `CVE-2024-5493 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-5493>`__
  - `CVE-2024-5494 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-5494>`__
  - `CVE-2024-5495 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-5495>`__
  - `CVE-2024-5496 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-5496>`__
  - `CVE-2024-5831 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-5831>`__
  - `CVE-2024-5832 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-5832>`__
  - `CVE-2024-6100 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-6100>`__
  - `CVE-2024-6103 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-6103>`__

- Fixes a potential restore validation error.
- Fixes a bug where the backup configuration :opsmgr:`daemon </reference/glossary/#term-backup-daemon>` 
  filter appears incorrectly for removed hardware.
- Fixes a bug where a specific logger doesn't appear correctly in the UI for backup job logs.
- Fixes a bug where the :ref:`objectid` field in snapshot history renders incorrectly.
- Resolves a ``NullPointerException`` from bad :dbcommand:`hostInfo`.
- Fixes a bug where altering the snapshot time skips longer retained snapshots.
- Fixes a bug where unassigned :opsmgr:`blockstores </reference/glossary/#std-term-backup-blockstore-database>` 
  terminate backup jobs to timeout.
- Fixes a bug where snapshots in the process of restore are groomed.

.. _opsmgr-server-6.0.23:

|onprem| Server 6.0.23:
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2024-04-04*

- Fixes the following |cve|\s:

  - `CVE-2023-34062 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-34062>`__
  - `CVE-2023-3635 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-3635>`__
  - `CVE-2023-44483 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-44483>`__
  - `CVE-2023-51775 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-51775>`__
  - `CVE-2023-52428 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-52428>`__
  - `CVE-2024-22201 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-22201>`__
  - `CVE-2024-25710 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-25710>`__
  - `CVE-2024-26308 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-26308>`__

- Updates JDK to ``jdk-11.0.22+7``.
- Releases {+mongosh+} 2.1.5 to |onprem|. To learn more, see {+mongosh+}
  :mdb-shell:`Release Notes </changelog/#v2.1.5>`. 
- Supports automating deployments on RedHat Enterprise Linux 9 ARM architectures.
- Adds API support for project level MongoDB :ref:`log rotation
  <automation-configuration-resource>` settings.
- Adds ability for backup to automatically configure an improved default
  blocksize for mongo blockstores.
- Enhances logging for MongoDB blockstores groom progress.
- Improves MongoDB and S3-compatible blockstore snapshot performance for
  large files through enhanced memory utilization. 
- Supports tracking restore block download performance.
- Supports editing WiredTiger job setting, number of backup workers, and
  bandwidth for backups in the Administration Console. 
- Automatically chooses the number of backup workers based on available
  CPU cores and memory. 
- Adds additional snapshot metrics to the snapshot summary table.
- Adds automation support for :manual:`at-rest encryption
  </core/security-encryption-at-rest/#encryption-at-rest>` of
  :ref:`audit logs <deployment-advanced-options-audit-log>` in MongoDB
  6.0 and later versions.
- Supports configuration of the ``net.tls.clusterCAFile`` parameter.
- Improves the agent's ability to retry for more blockstore errors.
- Fixes the following bugs:

  - Restore would fail in existing deployments if credentials version
    didn't match. 
  - Restores couldn't progress due to a DOWN host.
  - The ``mongodVersion`` in the backup jobs collection didn't update correctly.
  - LDAP version manifest URLs weren't constructed properly in local mode.
  - Enabling automation on a deployment might fail.
  - DBUsage API endpoint issue that affected totalCount, pageNum,
    filtering and pagination in the UI. 
  - ``Oplog Behind`` warning would be displayed for non-active shards.
  - ``LOW_APP_DB_FREE_SPACE_PERCENT`` alert wasn't working correctly.
  - Servers might display stale statuses in the |onprem| UI.

.. _opsmgr-server-6.0.22:

|onprem| Server 6.0.22:
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2024-01-04*

- Updates the {+mdbagent+} to :ref:`12.0.30.7791 
  <mongodb-12.0.30.7791>`.
- Fixes a bug where backups might default to the wrong storage engine.
- Fixes a bug where the {+mdbagent+} might download the wrong binaries for certain 
  operating systems.

.. _opsmgr-server-6.0.21:

|onprem| Server 6.0.21:
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-12-14*

- Updates the {+mdbagent+} to :ref:`12.0.29.7785 
  <mongodb-12.0.29.7785>`.

- Compatible with :dbtools:`MongoDB Database Tools 100.9.4
  </release-notes/database-tools-changelog/#100.9.4-changelog>`.
- Adds support for |bic-full| 2.14.12.
- Adds the ``backupJobsEnabledOnly`` |api| parameter to indicate whether to 
  exclude :opsmgr:`daemons </reference/glossary/#term-backup-daemon>` not enabled for backing up 
  databases from the |api| response. 
- Disallows setting your ``logRotate`` configuration to ``reopen``
  if you've already configured :ref:`log rotation <configure-mms-log-rotation>`
  by the {+mdbagent+} in the UI.
- Fixes a bug where users in :doc:`local mode </tutorial/configure-local-mode>` 
  could not use the :guilabel:`Validate LDAP Connection` button when 
  configuring |ldap| in the UI.
- Fixes a bug where a backup with :ref:`namespace filtering <namespaces-filter>` 
  fails due to a file list error.
- Fixes a bug where a backup successfully restarts before an :term:`oplog store 
  <Oplog Store Database>` could be assigned.
- Fixes a bug where the :guilabel:`Blockstore Minimum Block Size` dropdown displays 
  incorrectly in the Admin UI.
- Fixes the following |cve|\s:

  - `CVE-2023-45285 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-45285>`__
  - `CVE-2023-39326 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-39326>`__

.. _opsmgr-server-6.0.20:

|onprem| Server 6.0.20:
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-11-03*

- Updates JDK to ``jdk-11.0.21+9``.
- Updates jetty to 10.0.17.
- Updates the {+mdbagent+} to :ref:`12.0.28.7763 
  <mongodb-12.0.28.7763>`.
- Compatible with :dbtools:`MongoDB Database Tools 100.9.0
  </release-notes/database-tools-changelog/#100.9.0-changelog>`.
- Updates ``log4j-over-slf4j`` to 1.7.36.
- Eliminates ``fileSystemStore`` alerts if you have no filesystem 
  stores configured.
- Fixes ``Invalid cong`` bug that occurred when you upgraded a managed 
  deployment with multiple tags.
- Fixes a bug that prevented S3 store deletion.
- Improves ``SystemSpaceAlertChecks`` to check all the members.
- Adds the hostname and port to the abort error log for a job.
- Releases {+mongosh+} 2.0.2 to |onprem|. To learn more, see {+mongosh+}
  :mdb-shell:`Release Notes </changelog/#v2.0.2>`.
- Adds support for automating deployments on RedHat Enterprise Linux 9 
  x86_64 architectures (with BI connector support).
- Adds support for automating deployments on Ubuntu 22.04 for both 
  x86_64 and ARM64/aarch64 architectures (with BI connector support).
- Adds support for running Ops Manager on RedHat Enterprise Linux 9 and 
  Ubuntu 22.04 for x86_64 architectures.
- Fixes the following |cve|\s:

  - `CVE-2023-40167 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-40167>`__
  - `CVE-2023-36479 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-36479>`__
  - `CWE-611 <https://cwe.mitre.org/data/definitions//611.html>`__
  - `CVE-2023-44487 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-44487>`__

.. _opsmgr-server-6.0.19:

|onprem| Server 6.0.19:
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-10-05*

- Updates the {+mdbagent+} to :ref:`12.0.27.7746 <mongodb-12.0.27.7746>`.
- Releases {+mongosh+} 2.0.0 to |onprem|. To learn more, see {+mongosh+}
  :mdb-shell:`Release Notes </changelog/#v2.0.0>`.
- Compatible with :dbtools:`MongoDB Database Tools 100.8.0
  </release-notes/database-tools-changelog/#100.8.0-changelog>`.

.. _opsmgr-server-6.0.18:

|onprem| Server 6.0.18:
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-09-07*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

- Updates the {+mdbagent+} to :ref:`12.0.26.7740 <mongodb-12.0.26.7740>`.
- Updates JDK to ``jdk-11.0.20.1+1``.
- Compatible with :dbtools:`MongoDB Database Tools 100.8.0
  </release-notes/database-tools-changelog/#100.8.0-changelog>`.
- Includes |bic-full| 2.14.10.
- Includes `MongoDB Shell <https://www.mongodb.com/docs/mongodb-shell/>`__ 1.10.4.

.. _opsmgr-server-6.0.17:

|onprem| Server 6.0.17:
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-08-03*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

- Updates the {+mdbagent+} to :ref:`12.0.25.7724
  <mongodb-12.0.25.7724>`.
- Updates JDK to ``jdk-11.0.20+8``.
- Compatible with :dbtools:`MongoDB Database Tools 100.7.4
  </release-notes/database-tools-changelog/#100.7.4-changelog>`.
- Fixes CVE-2023-4009: Privilege Escalation for :authrole:`Project Owner`
  and :authrole:`Project User Admin` roles in |onprem|.

  - In MongoDB |onprem| 6.0 prior to 6.0.17, an authenticated user with
    with :authrole:`Project Owner` or :authrole:`Project User Admin`
    access roles could generate an API key with the privileges of the
    :authrole:`Organization Owner` role resulting in privilege escalation.
  - CVSS Score: 7.2.
  - CWE-648: Incorrect Use of Privileged APIs.

.. _opsmgr-server-6.0.16:

|onprem| Server 6.0.16:
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-07-06*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

- Updates the {+mdbagent+} to :ref:`12.0.24.7719
  <mongodb-12.0.24.7719>`.
- Upgrades `org.xerial.snappy:snappy-java
  <https://mvnrepository.com/artifact/org.xerial.snappy/snappy-java/1.1.10.1>`__ to version 1.1.10.1.
- Compatible with :dbtools:`MongoDB Database Tools 100.7.3
  </release-notes/database-tools-changelog/#100.7.3-changelog>`.

.. _opsmgr-server-6.0.15:

|onprem| Server 6.0.15:
~~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-06-15*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

- Updates the {+mdbagent+} to :ref:`12.0.23.7711 <mongodb-12.0.23.7711>`.
- Adds support for |bic-full| 2.14.7.
- Updates Go to 1.19.9+ to address the following |cve|\s:

  - `CVE-2023-29400 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-29400>`__
  - `CVE-2023-24539 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-24539>`__
  - `CVE-2023-24540 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-24540>`__

- Compatible with :dbtools:`MongoDB Database Tools 100.7.0
  </release-notes/database-tools-changelog/#100.7.0-changelog>`.

.. _opsmgr-server-6.0.14:

|onprem| Server 6.0.14
~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-06-01*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

- Updates the {+mdbagent+} to :ref:`12.0.22.7705 <mongodb-12.0.22.7705>`.
- Updates ``org.bitbucket.b_c:jose4j`` version 0.7.10 to version 0.9.3 to address 
  `SNYK-JAVA-ORGBITBUCKETBC-5488281 <https://security.snyk.io/vuln/SNYK-JAVA-ORGBITBUCKETBC-5488281>`__.
- Updates ``net.minidev:json-smart@2.4.2`` to version 2.4.11 to address 
  `CVE-2023-1370 <https://www.cve.org/CVERecord?id=CVE-2023-1370>`__.
- Updates ``org.json:json@20211205`` to ``org.json:json@20230227`` 
  to address `CVE-2022-45688 <https://www.cve.org/CVERecord?id=CVE-2022-45688>`__.
- Includes BI Connector 2.14.6.
- Snapshots now include a flag that indicates whether or not they are incremental.
- Adds the ability for |onprem| administrators to access performance and snapshot metrics.
  Administrators can now use Prometheus to query newly created collections and view metrics graphs.
- Compatible with :dbtools:`MongoDB Database Tools 100.7.0
  </release-notes/database-tools-changelog/#100.7.0-changelog>`.

.. _opsmgr-server-6.0.13:

|onprem| Server 6.0.13
~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-05-04*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

.. note::

   To improve user experience, |onprem| server 6.0.13 updates the |onprem| systemd unit file from 
   ``after=network.target`` to ``after=network-online.target``. This prevents reboot failures caused 
   by attempting to start :manual:`mongod </reference/program/mongod/#mongodb-binary-bin.mongod>` after 
   the network management stack has started, but before verifying that network connectivity has 
   been established.

- Updates the {+mdbagent+} to :ref:`12.0.21.7698 
  <mongodb-12.0.21.7698>`.
- Updates JDK to ``jdk-11.0.19+7``.
- Updates ``com.fasterxml.woodstox:woodstox-core`` to 6.4.0 to address 
  `CVE-2022-40152 <https://nvd.nist.gov/vuln/detail/CVE-2022-40152>`_.
- Defaults the :guilabel:`Backup Multiple Workers Per File` option to 
  :guilabel:`On`.
- Adds the ability to regularly rotate the 
  ``automation-agent-fatal.log`` file. 
  :ref:`Reinstall the MongoDB Agent <update-agent-fatal-log-rotation>` 
  to enable automatic fatal log file rotation.
- Compatible with :dbtools:`MongoDB Database Tools 100.7.0
  </release-notes/database-tools-changelog/#100.7.0-changelog>`.

.. _opsmgr-server-6.0.12:

|onprem| Server 6.0.12
~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-04-07*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

- Updates the {+mdbagent+} to :ref:`12.0.20.7686 
  <mongodb-12.0.20.7686>`.
- Compatible with :dbtools:`MongoDB Database Tools 100.7.0
  </release-notes/database-tools-changelog/#100.7.0-changelog>`.
- Adds support for managing MongoDB deployments on the Ubuntu 22.04 (x86) operating system.
  BI Connector is not currently supported on the Ubuntu 22.04 (x86) operating system.
- Fixes `CVE-2023-0342 <https://nvd.nist.gov/vuln/detail/CVE-2023-0342>`__.
- Fixes a bug in the MongoDB Agent where the shutdown sequence might get
  blocked under certain circumstances, resulting in failed Agent upgrades.

.. _opsmgr-server-6.0.11:

|onprem| Server 6.0.11
~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-03-15*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

- Updates the {+mdbagent+} to :ref:`12.0.19.7676 
  <mongodb-12.0.19.7676>`.
- Updates `Apache Commons FileUpload 
  <https://commons.apache.org/proper/commons-fileupload/>`_ to 1.5 to 
  address `CVE-2023-24998 
  <https://nvd.nist.gov/vuln/detail/CVE-2023-24998>`_.
- Adds an option to support using multiple workers for a single file 
  during backups for :term:`backup blockstore database` and :opsmgr:`S3 Snapshot Store </reference/glossary/#std-term-S3-Snapshot-Store>` 
  storage. This feature does not support :term:`File System Store` snapshot storage. 
  You can enable this beta feature by doing the following: 

  1. In the :guilabel:`Settings` :ref:`page <group-settings-page>` for
     your :guilabel:`Project`, click the :guilabel:`Beta Features` tab.
  2. Toggle :guilabel:`Backup Multiple Workers Per File` to enable the 
     feature. 

.. _opsmgr-server-6.0.10:

|onprem| Server 6.0.10
~~~~~~~~~~~~~~~~~~~~~~

*Released 2023-03-02*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

- Updates the {+mdbagent+} to :ref:`12.0.18.7668
  <mongodb-12.0.18.7668>`.
- The {+mdbagent+} now compresses its own rotated logs.
- Fixes an issue where sharded collections could be missing from the chunks dropdown for the backing cluster in the UI.
- Fixes an issue where clicking the refresh button in the :guilabel:`Backup Job Timeline` UI resulted in a failure.
- Includes the latest version of MongoDB Shell 1.6.2.
- Compatible with :dbtools:`MongoDB Database Tools 100.6.1
  </release-notes/database-tools-changelog/#100.6.1-changelog>`.

.. _opsmgr-server-6.0.9:

|onprem| Server 6.0.9
~~~~~~~~~~~~~~~~~~~~~

*Released 2023-02-02*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

- Updates the {+mdbagent+} to :ref:`12.0.17.7665
  <mongodb-12.0.17.7665>`.
- Updates JDK to ``jdk-11.0.18+10``.

.. _opsmgr-server-6.0.8:

|onprem| Server 6.0.8
~~~~~~~~~~~~~~~~~~~~~

*Released 2023-01-12*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

- Updates the {+mdbagent+} to :ref:`12.0.16.7656
  <mongodb-12.0.16.7656>`.
- Reintroduces :ref:`Namespace Filtering for backups <namespaces-filter>`.

.. _opsmgr-server-6.0.7:

|onprem| Server 6.0.7
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-12-01*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

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

.. note::
   
   .. include:: /includes/bic-compatibility.rst

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

.. note::
   
   .. include:: /includes/bic-compatibility.rst

- Updates ``commons-text`` to 1.10.0 to address 
  `CVE-2022-42889 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-42889>`__.

.. _opsmgr-server-6.0.4:

|onprem| Server 6.0.4
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-10-13*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

- Updates the {+mdbagent+} to :ref:`12.0.12.7624 <mongodb-12.0.12.7624>`.
- Compatible with :dbtools:`MongoDB Database Tools 100.6.0 
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

.. note::
   
   .. include:: /includes/bic-compatibility.rst

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
- Fixes incorrect version information in ``rpm`` |onprem| packages. To
  learn more, see :ref:`Install Ops Manager <rpm-install-onprem>`.

.. _opsmgr-server-6.0.2:

|onprem| Server 6.0.2
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-08-04*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

- Removes spurious audit log rotation errors from the MongoDB Agent log 
  files and corrects file suffix handling.
- Adds MongoDB 6.0.0 as a deployment option.
- Introduces FCV 6.0 option in Ops Manager.
- Updates JDK to ``jdk-11.0.16+8``.
- Updates the {+mdbagent+} to :ref:`12.0.10.7591
  <mongodb-12.0.10.7591>`.

  .. include:: /includes/note-push-pull-migration-deprecation-for-om.rst

  .. include:: /includes/extracts/om6-warning-server-68925.rst

.. _opsmgr-server-6.0.1:

|onprem| Server 6.0.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2022-07-20*

.. note::
   
   .. include:: /includes/bic-compatibility.rst

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

.. note::
   
   .. include:: /includes/bic-compatibility.rst

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
- Deprecates the Managed Sharded Collections UI. |onprem| 7.0.0 will not
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
