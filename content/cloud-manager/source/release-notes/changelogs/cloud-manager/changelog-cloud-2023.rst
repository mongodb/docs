.. _cloudmanager_20231115:

15 November 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Updates the {+mdbagent+} to :ref:`13.8.1.8557-1`. 
- Improves upgrading {+mongosh+} when multiple versions are present.
- Improves validations of invalid MongoDB database paths.
- Improves visibility into processes that may prevent the {+mdbagent+} from 
  reaching the desired goal state.
- Fixes PagerDuty notification validation in alerts.

.. _cloudmanager_20231018:

18 October 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Updates the {+mdbagent+} to :ref:`13.7.0.8514`.

.. _cloudmanager_20231004:

04 October 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Updates the {+mdbagent+} to :ref:`13.6.0.8483-1 <13.6.0.8483-1>`.
- Released MongoDB Shell 2.0.0.
- Adds support for :atlas:`private endpoints
  </security-private-endpoint>` for sharded clusters for live migration (push)
  of a MongoDB 6.0.8+ sharded cluster monitored by |mms| into a sharded
  cluster in |service|. To learn more, see :atlas:`Private endpoints for
  Live Migration
  </import/c2c-push-live-migration/#support-for-vpc-peering-and-private-endpoints>`
  in the |service| documentation.

.. _cloudmanager_20230913:

13 September 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~~~

- Adds support for |bic-full| 2.14.11.
- Updates the {+mdbagent+} to :ref:`13.5.0.8451-1 <13.5.0.8451-1>`.
- Improves error message when importing a replica set.
- Ensures that ``mongos`` always flushes its cache when you upgrade
  from MongoDB 5.0 to MongoDB 6.0.
- Ensures that the {+mdbagent+} always shuts down on request, even when
  the process is unresponsive.

.. _cloudmanager_20230823:

23 August 2023 Release
~~~~~~~~~~~~~~~~~~~~~~

- Updates the {+mdbagent+} to :ref:`13.4.01.8413-1 <13.4.01.8413-1>`.
- Adds support for |bic-full| 2.14.10.
- Compatible with `MongoDB Database Tools 100.8.0 
  <https://www.mongodb.com/docs/database-tools/release-notes/database-tools-changelog#100.8.0-changelog>`__.

.. _cloudmanager_20230802:

2 August 2023 Release
~~~~~~~~~~~~~~~~~~~~~

- Updates the {+mdbagent+} to :ref:`13.3.1.8376-1 <13.3.1.8376-1>`.
- Compatible with `MongoDB Database Tools 100.7.4 
  <https://www.mongodb.com/docs/database-tools/release-notes/database-tools-changelog#100.7.4-changelog>`__.
- Adds support for |bic-full| 2.14.9.
- Improves validations for custom privileges when you edit a role in the UI.
- Fixes `CVE-2023-4009 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-4009>`__: Privilege Escalation for :authrole:`Project Owner`
  and :authrole:`Project User Admin` roles in |onprem|.

  - In MongoDB |onprem| 5.0 prior to 5.0.22, an authenticated user with
    :authrole:`Project Owner` or :authrole:`Project User Admin` access
    roles could generate an API key with the privileges of the
    :authrole:`Organization Owner` role, resulting in privilege escalation.
  - CVSS Score: 7.2.
  - `CWE-648 <https://cwe.mitre.org/data/definitions/648.html>`__: Incorrect Use of Privileged APIs.

.. _cloudmanager_20230712:

12 July 2023 Release
~~~~~~~~~~~~~~~~~~~~

- Updates the {+mdbagent+} to :ref:`13.2.0.8337-1 <13.2.0.8337-1>`.
- Improves the groom job logs. 
- Fixes an issue with the :guilabel:`Modify` button for projects with multiple instances 
  of |bic-full|. 
- Compatible with `MongoDB Database Tools 100.7.3 
  <https://www.mongodb.com/docs/database-tools/release-notes/database-tools-changelog#100.7.3-changelog>`__. 
- Adds cluster removal, shutdown, startup, and restart ability to the :ref:`managedSharding <autoconfig-sharded-clusters>` API parameter. 

.. _cloudmanager_20230614:

14 June 2023 Release
~~~~~~~~~~~~~~~~~~~~

- Updates the {+mdbagent+} to :ref:`13.1.0.8282-1 <13.1.0.8282-1>`.
- Adds support for |bic-full| 2.14.7.
- Updates Go to 1.19.9+ to address the following |cve|\s:

  - `CVE-2023-29400 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-29400>`__
  - `CVE-2023-24539 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-24539>`__
  - `CVE-2023-24540 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=/CVE-2023-24540>`__

.. _cloudmanager_20230525:

25 May 2023 Release
~~~~~~~~~~~~~~~~~~~~

- Adds support for the ``security.kmip.useLegacyProtocol`` MongoDB 
  configuration file option.
- Improves the API for incremental backup tracking of sharded clusters.
- Supports |bic-full| 2.14.6.
- Shows incremental snapshots in the UI.
- Adds the ability to access performance and snapshot metrics. You can now
  :ref:`use Prometheus <prometheus-integration-mms>` to view metrics
  graphs and query newly created collections.
- Updates {+mdbagent+} to :ref:`12.17.0.8238-1 <12.17.0.8238-1>`.


.. _cloudmanager_20230503:

3 May 2023 Release
~~~~~~~~~~~~~~~~~~~

- Updates JDK to ``jdk-11.0.19+7``.
- Updates ``com.fasterxml.woodstox:woodstox-core`` to 6.4.0 to address 
  `CVE-2022-40152 <https://nvd.nist.gov/vuln/detail/CVE-2022-40152>`_.
- Updates {+mdbagent+} to :ref:`12.16.0.8175-1 <12.16.0.8175-1>`.
- Defaults the :guilabel:`Backup Multiple Workers Per File` option to 
  :guilabel:`On`.
- Adds the ability to regularly rotate the 
  ``automation-agent-fatal.log`` file. 
  :ref:`Reinstall the MongoDB Agent <update-agent-fatal-log-rotation>` 
  to enable automatic fatal log file rotation.

.. _cloudmanager_20230412:

12 April 2023 Release
~~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`12.15.0.8092 <12.15.0.8092>`.

.. _cloudmanager_20230322:

22 March 2023 Release
~~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`12.14.0.8069 <12.14.0.8069>`.

.. _cloudmanager_20230301:

01 March 2023 Release
~~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`12.13.0.8043 <12.13.0.8043>`.
- Supports using multiple workers for a single file during backups. 

.. _cloudmanager_20230215:

15 February 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`12.12.0.8018-1 <12.12.0.8018-1>`. 
- Improves alert configuration validation.
- Adds a port number to the hostnames in the backup metrics page.
- Fixes a bug with the parameter format for ``logComponentVerbosity``
  when using :ref:`setParameter <cm-set-parameter>`.
- Releases version 1.6.2 of {+mongosh+} to |mms|.

.. _cloudmanager_20230125:

25 January 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`12.11.2.7970-1 <12.11.2.7970-1>`. 
- Improves Live Migration Service validation error message when waiting for monitoring data.
- Reduces the impact when collecting and ingesting Automation Agent logs.

.. _cloudmanager_20230105:

05 January 2023 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`12.10.2.7935-1 <12.10.2.7935-1>`. 
- Redacts third-party integration credentials when you view or edit an alert through the UI or query it through the |api|. These credentials are also now encrypted on disk.
- Fixes the snapshot size for snapshots with ``filterList``.
- Fixes the missing :guilabel:`Base URL` field during {+mdbagent+} installations on Windows.
- Adds an alert option for when a snapshot is falling behind the scheduled time.
