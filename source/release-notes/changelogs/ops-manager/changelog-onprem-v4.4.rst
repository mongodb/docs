.. _opsmgr-server-4.4.24:

|onprem| Server 4.4.24
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-07-29*

- Updates the |jdk| to ``jdk-11.0.16+8``.
- Updates the {+mdbagent+} to :ref:`10.14.35.6589
  <mongodb-10.14.35.6589>`.

.. _opsmgr-server-4.4.23:

|onprem| Server 4.4.23
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-07-07*

- Fixes an issue where editing an Oplog Store's name that contains dots 
  (``.``) might have resulted in errors.
- Updates the {+mdbagent+} to :ref:`10.14.34.6588
  <mongodb-10.14.34.6588>`.

.. _opsmgr-server-4.4.22:

|onprem| Server 4.4.22
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-05-05*

- Adds support for Debian 10 when you use the :bic:`BI Connector </>`.
- Fixes an issue that occurred when you changed the default server
  usage for organizations.
- Updates the {+mdbagent+} to :ref:`10.14.33.6581 <mongodb-10.14.33.6581>`.
- Updates the |jdk| to ``jdk-11.0.15+10``.
- Upgrades the ``com.google.protobuf:protobuf-java`` package to 3.19.4.

.. _opsmgr-server-4.4.21:

|onprem| Server 4.4.21
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-02-17*

- Removes support for running |onprem| on:
  
  - RHEL 7.x/8.x, and Ubuntu 16.x on PowerPC (``ppc64le``)
    architectures.
  - RHEL 6.x/7.x, Ubuntu 18.x, and SUSE 12.x on zSeries (``s390x``)
    architectures.

  To learn more about supported platforms for running |onprem| on,
  see :ref:`Ops Manager Software Requirements <software-requirements>`.

- Fixes an issue where |s3| Oplog Stores can leave behind |s3| 
  objects even after the configured retention window has elapsed.

- Updates the |jdk| to ``jdk-11.0.14.1+1``.

- Removes workaround to use an X.509 CommonName instead of a |san-dns|.

- Updates the {+mdbagent+} to :ref:`10.14.32.6576 <mongodb-10.14.32.6576>`.

.. _opsmgr-server-4.4.20:

|onprem| Server 4.4.20
~~~~~~~~~~~~~~~~~~~~~~

*Released 2022-01-13*

- Updates the {+mdbagent+} to :ref:`10.14.31.6566 <mongodb-10.14.31.6566>`.

- When taking a snapshot, allows the {+mdbagent+} to slow the sending of data blocks 
  when |onprem| is overloaded, so that the snapshot can complete. Successful 
  completion of snapshots is prioritized over speed.
  
  .. important::

     To use this feature, you must upgrade to 
     :ref:`the latest version of the {+mdbagent+} <mongodb-11.0.11.7036>`.

.. _opsmgr-server-4.4.19:

|onprem| Server 4.4.19
~~~~~~~~~~~~~~~~~~~~~~

*Released 2021-11-16*

- Updates JDK to jdk-11.0.13+8.
- Updates the MongoDB Agent to :ref:`10.14.30.6552 <mongodb-10.14.30.6552>`.

.. _opsmgr-server-4.4.18:

|onprem| Server 4.4.18
~~~~~~~~~~~~~~~~~~~~~~

*Released 2021-11-04*

- Updates the MongoDB Agent to :ref:`10.14.29.6548 <mongodb-10.14.29.6548>`.
- Removes support for RHEL 6.

.. _opsmgr-server-4.4.17:

|onprem| Server 4.4.17
~~~~~~~~~~~~~~~~~~~~~~

*Released 2021-09-03*

- Fixes a bug where, when running in local mode, with both PowerPC
  RHEL71 and RHEL81 builds of MongoDB present, the RHEL81 build would
  always be selected.

- Updates the MongoDB Agent to :ref:`10.14.28.6532
  <mongodb-10.14.28.6532>`.

- Upgrades the JDK to version 11.0.12, which restricts the use of
  insecure TLS versions 1.0 and 1.1. To learn more, see the
  `JDK release notes <https://www.oracle.com/java/technologies/javase/11-0-11-relnotes.html#JDK-8202343>`__.

- Compatible with :dbtools:`MongoDB Database Tools 100.5.0 
  </release-notes/database-tools-changelog#100.5.0-changelog>`.


.. _opsmgr-server-4.4.16:

|onprem| Server 4.4.16
~~~~~~~~~~~~~~~~~~~~~~

*Released 2021-08-05*

- Fixes a bug that caused restore to fail due to an invalid ping from 
  the backup agent.

- Adds a warning message when |onprem| has less than 10GB of disk space 
  available.

- Fixes a bug that caused the System Alerts UI to fail after a system 
  alert was saved with a webhook URL.

- Updates the MongoDB Agent to :ref:`10.14.27.6524
  <mongodb-10.14.27.6524>`.

- Compatible with :dbtools:`MongoDB Database Tools 100.3.1 
  </release-notes/database-tools-changelog#100.3.1-changelog>`.

.. _opsmgr-server-4.4.15:

|onprem| Server 4.4.15
~~~~~~~~~~~~~~~~~~~~~~

*Released 2021-07-01*

- When creating a global owner, the generated |api| keys now also
  include the selected IP access list
- Compatible with :dbtools:`MongoDB Database Tools 100.3.1 
  </release-notes/database-tools-changelog#100.3.1-changelog>`.

.. _opsmgr-server-4.4.14:

|onprem| Server 4.4.14
~~~~~~~~~~~~~~~~~~~~~~

*Released 2021-06-10*

- Fixes a bug that caused restore to fail due to an invalid tar header 
  for filesystem stores.
- Compatible with :dbtools:`MongoDB Database Tools 100.3.1 
  </release-notes/database-tools-changelog#100.3.1-changelog>`.

.. _opsmgr-server-4.4.13:

|onprem| Server 4.4.13
~~~~~~~~~~~~~~~~~~~~~~

*Released 2021-06-03*

- Upgrades |jdk| to ``jdk-11.0.11+9``.
- Disables |tls| versions 1.0 and 1.1.
- Fixes a bug that would re-enable |mms| instances for API writes 
  during an upgrade of |mms|.
- Fixes a date formatting issue when listing logs in the ``admin`` 
  user interface.
- Adds MongoDB server for RHEL 8.1 running on PowerPC to |mms|\'s 
  :ref:`version manifest <admin-console-general-version-manifest>`.
- Caches the computed list of MongoDB binaries available on disk in 
  :doc:`Local Mode </tutorial/configure-local-mode>`.
- Updates the MongoDB Agent to :ref:`10.14.24.6508
  <mongodb-10.14.24.6508>`.
- Compatible with :dbtools:`MongoDB Database Tools 100.3.1 
  </release-notes/database-tools-changelog#100.3.1-changelog>`.

.. _opsmgr-server-4.4.12:

|onprem| Server 4.4.12
~~~~~~~~~~~~~~~~~~~~~~

*Released 2021-05-06*

- Fixed a bug that caused the :guilabel:`User Authentication Method` 
  field on the :guilabel:`Ops Manager Config` page to not display a 
  visual indicator that the setting is overwritten in the configuration 
  file.
- Removed support for Ubuntu 16.04 since Ubuntu 16.04 is End OF Life
  (EOL) as of April 2021.

- Updates the MongoDB Agent to
  :ref:`10.14.23.6498 <mongodb-10.14.23.6498>`.

- Compatible with :dbtools:`MongoDB Database Tools 100.3.1 
  </release-notes/database-tools-changelog#100.3.1-changelog>`.

.. _opsmgr-server-4.4.11:

|onprem| Server 4.4.11
~~~~~~~~~~~~~~~~~~~~~~

*Released 2021-04-01*

- Updates an outdated comment in the :file:`conf-mms.properties` file.
  Even though |onprem| 4.4.11 does not add any new parameters to this
  file, the upgrade process detects that the file had changed.
  To avoid having to manually reconfigure |onprem|, ensure that |onprem|
  uses the current version of this file after the upgrade. Create and
  store backup copies of all your configuration files, to avoid losing
  important |onprem| configuration.

  - For upgrades that use the ``.deb`` package,
    the :ref:`upgrade process <upgrade-on-prem-with-deb>` prompts you
    to choose which version of the :file:`conf-mms.properties` file
    |onprem| should use. Choose the current :file:`conf-mms.properties`
    file.

  - For upgrades that use the ``rpm`` package,
    the :ref:`upgrade process <upgrade-on-prem-with-rpm>` saves
    the :file:`conf-mms.properties` file as the
    :file:`conf-mms.properties.rpmsave`
    file. Use the ``mv`` command to rename
    :file:`conf-mms.properties.rpmsave`
    to :file:`conf-mms.properties`. This ensures that |onprem| uses the
    current file after the upgrade.

- Fixes a bug in the MongoDB usage report where backing databases are
  not correctly identified.
- Fixes a bug in the MongoDB usage report where |onprem|  could
  potentially find duplicate hosts based on network aliases.
- Fixes a bug that causes some MongoDB versions to be considered as
  custom builds when validating the {+aagent+} configuration.
- Fixes a bug that disallows configuring |ldap| group names longer
  than 100 characters.
- Updates the {+mdbagent+} to :ref:`10.14.22.6489 <mongodb-10.14.22.6489>`.
- Requires `MongoDB Database Tools 100.3.1 <https://www.mongodb.com/docs/database-tools/release-notes/database-tools-changelog#100.3.1-changelog>`__.
- Changes the :ref:`protocolVersion <autoconfig-mongodb-replicasets>` 
  API parameter from an integer to a string. For example, previously, 
  you could specify  ``1`` for this parameter. Now, you must specify 
  ``"1"`` for this parameter instead.

.. _opsmgr-server-4.4.10:

|onprem| Server 4.4.10
~~~~~~~~~~~~~~~~~~~~~~

*Released 2021-03-04*

- Allows you to choose either redact, or to not redact, sensitive
  information from the server usage report. If you choose to redact,
  |onprem| redacts before it generates the report for download.
- Updates the MongoDB Agent to
  :ref:`10.14.21.6476 <mongodb-10.14.21.6476>`.
- Requires :dbtools:`MongoDB Database Tools 100.3.0
  </release-notes/database-tools-changelog#100.3.0-changelog>`.

.. _opsmgr-server-4.4.9:

|onprem| Server 4.4.9
~~~~~~~~~~~~~~~~~~~~~

*Released 2021-02-17*

- Fixes a regression introduced in |onprem| 4.4.8 that prevents the MongoDB
  Version Manifest from being updated.
- Updates the MongoDB Agent to
  :ref:`10.14.20.6466 <mongodb-10.14.20.6466>`.
- Requires :dbtools:`MongoDB Database Tools 100.2.0
  </release-notes/database-tools-changelog#100.2.0-changelog>`.

.. _opsmgr-server-4.4.8:

|onprem| Server 4.4.8
~~~~~~~~~~~~~~~~~~~~~

*Released 2021-02-05*

- Improves backup snapshot performance.
- Requires :dbtools:`MongoDB Database Tools 100.2.0 
  </release-notes/database-tools-changelog#100.2.0-changelog>`.

.. _opsmgr-server-4.4.7:

|onprem| Server 4.4.7
~~~~~~~~~~~~~~~~~~~~~

*Released 2021-01-11*

- Fixes a bug that causes the |mms|
  :doc:`Backup </tutorial/nav/backup-use/>` process to require excess
  memory when terminating the backup job.
- Fixes a bug that causes the backup process to fail to take new
  snapshots when using a :term:`File System Store` during a
  :doc:`backup </tutorial/nav/backup-deployments/>` of a MongoDB
  deployment on version 4.2 or later.
- Limits host ping information from active groups to when
  generating the :doc:`diagnostic archives </tutorial/retrieve-debug-diagnostics/>` file.
- Limits backup logs based on the ``limit`` option when generating the
  :doc:`diagnostic archives </reference/api/diagnostics/get-project-diagnostic-archive/>`.
- Updates the MongoDB Agent to
  :ref:`10.14.18.6453 <mongodb-10.14.18.6453>`.
- Requires :dbtools:`MongoDB Database Tools 100.2.0
  </release-notes/database-tools-changelog#100.2.0-changelog>`.

.. _opsmgr-server-4.4.6:

|onprem| Server 4.4.6
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-12-03*

- Fixes a bug that prevents |mms| from correctly authenticating to an
  :doc:`HTTP Proxy </tutorial/use-with-http-proxy/>`.
- Limits Tracking and Groom Jobs to the Backup Daemons set in the
  Backup Configuration. This applies to the project in which you set
  the configuration and run the jobs.
- Updates the MongoDB Agent to
  :ref:`10.14.17.6445 <mongodb-10.14.17.6445>`
- Requires :dbtools:`MongoDB Database Tools 100.2.0 
  </release-notes/database-tools-changelog#100.2.0-changelog>`.

.. _opsmgr-server-4.4.5:

|onprem| Server 4.4.5
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-11-05*

- Updates the |jdk| to ``jdk-jdk-11.0.9.11.1``.

- Supports viewing MongoDB Profiler entries with overlapping timestamps
  separately in the Visual Query Profiler.

- Updates the MongoDB Agent to
  :ref:`10.14.16.6437 <mongodb-10.14.16.6437>`.

- Requires :dbtools:`MongoDB Database Tools 100.2.0 
  </release-notes/database-tools-changelog#100.2.0-changelog>`.

.. _opsmgr-server-4.4.4:

|onprem| Server 4.4.4
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-10-07*

- Adds |jvm| Arguments in the |mms| diagnostic archive.

- Adds a new configuration parameter :setting:`Non Proxy Hosts`
  which allows the |mms| Application Server to bypass the
  outgoing proxy you configured when accessing specific hosts.

- Fixes a bug that prevents users from changing their password.

- Updates the MongoDB Agent to
  :ref:`10.14.15.6432 <mongodb-10.14.15.6432>`.

- Adds support for Ubuntu 20.04.

- Requires :dbtools:`MongoDB Database Tools 100.1.0 
  </release-notes/database-tools-changelog#100.1.0-changelog>`.

.. _opsmgr-server-4.4.3:

|onprem| Server 4.4.3
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-09-23*

- Fixes a high severity vulnerability in Ops Manager. ``CVE-2020-7927``
  is allocated for this issue.

- Fixes an issue that can prevent alert processing for monitored
  clusters with partial status information.

- Removes ``muninEnabled`` and ``muninPort`` fields from the
  :ref:`Hosts <hosts-public-api>` |api|.

- Updates the MongoDB Agent to
  :ref:`10.14.14.6427 <mongodb-10.14.14.6427>`.

- Requires :dbtools:`MongoDB Database Tools 100.1.0 
  </release-notes/database-tools-changelog#100.1.0-changelog>`.

.. _opsmgr-server-4.4.2:

|onprem| Server 4.4.2
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-09-03*

- Fixes unexpected errors that occur when:

  - Editing a blockstore with one or more dots (``.``) in its name.
  - Trying to update
    :ref:`Global API Keys <admin-console-general-api-keys>` via the
    |api| with an invalid request.
  - Trying to update a global access list IP.

- Includes :bic:`MongoDB Business Intelligence Connector v2.14.0 </>`.

- Supports file system snapshot stores with MongoDB databases running
  |fcv-link| 4.2 or later.

- Updates the MongoDB Agent to
  :ref:`10.14.13.6423 <mongodb-10.14.13.6423>`.

- Requires :dbtools:`MongoDB Database Tools 100.1.0 
  </release-notes/database-tools-changelog#100.1.0-changelog>`.

.. _opsmgr-server-4.4.1:

|onprem| Server 4.4.1
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-08-05*

- Allows replica sets to be force reconfigured using console.

- Fixes an issue with Organization-level |api| key returning
  `HTTP error 500 <https://httpstatuses.com/500>`__ when no roles are
  defined.

- Improves |onprem| packaging.

- Updates MongoDB Agent to :ref:`10.14.12.6411 <mongodb-10.14.12.6411>`.

- Requires :dbtools:`MongoDB Database Tools 100.0.2 
  </release-notes/database-tools-changelog#100.02-changelog>`.

.. _opsmgr-server-4.4.0:

|onprem| Server 4.4.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-07-08*

- Supports management, monitoring and backup of MongoDB 4.4
  deployments.

- Can be deployed to Kubernetes using the
  :k8s:`MongoDB Enterprise Kubernetes Operator </>`.

- Improves summary and detailed views of MongoDB deployments.

- Improves the operational performance of managing large sharded
  clusters.

  .. example::

     Applies requested configuration changes across the cluster faster.

- Improves rendering performance of the Metrics page.

- Supports direct monitoring of the |onprem| application database.

- Supports fetching MongoDB binaries from a custom |http| server.

- Sets the Profiler to use MongoDB slow query logs as the default data
  source.

  If you had not enabled the :doc:`Profiler </tutorial/profile-database>`:
    You now see the :doc:`Profiler </tutorial/profile-database>`. |mms|
    sources the data points from your
    :ref:`slow query logs <pa-slow-queries>`. These
    :manual:`data points </reference/configuration-options/#operationprofiling-options>` have
    been logged since |onprem| 4.2 through the
    :ref:`Performance Advisor <pa-slow-queries>`.

  If you had enabled the :doc:`Profiler </tutorial/profile-database>`:
    You continue to see the Profiler. |mms| sources the data points
    from your :ref:`slow query logs <pa-slow-queries>`  rather than
    through the
    :doc:`MongoDB Profiler entries </tutorial/profile-database>`.
    (These entries continue to be ingested.) The MongoDB Profiler
    entries contain more detailed information than the slow query
    logs. To revert to using the profiler entries, toggle the
    Project's feature flag :guilabel:`Profiler Nds` to ``OFF``.

- Introduces Schema Advisor for automatic identification of schema
  optimization opportunities.

- Supports |aws| |iam| roles in |s3| Snapshot Store configurations.

- Upgrades OpenJDK to 11.0.8+10.

- Requires :dbtools:`MongoDB Database Tools 100.0.2 
  </release-notes/database-tools-changelog#100.02-changelog>`.

.. note:: Ops Manager Support Ends after 4.4 Series

   .. include:: /includes/facts/opsmgr-windows-stops-4.4.rst
