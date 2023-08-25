.. _cloudmanager_20230823:

23 August 2023 Release
~~~~~~~~~~~~~~~~~~~~~~

- Updates the {+mdbagent+} to :ref:`13.4.01.8413-1 <13.4.01.8413-1>`.
- Adds support for |bic-full| 2.14.10.
- Compatible with :db-tools:`MongoDB Database Tools 100.8.0 
  </release-notes/database-tools-changelog#100.8.0-changelog>`.

.. _cloudmanager_20230802:

2 August 2023 Release
~~~~~~~~~~~~~~~~~~~~~

- Updates the {+mdbagent+} to :ref:`13.3.1.8376-1 <13.3.1.8376-1>`.
- Compatible with :db-tools:`MongoDB Database Tools 100.7.4 
  </release-notes/database-tools-changelog#100.7.4-changelog>`.
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
- Compatible with :db-tools:`MongoDB Database Tools 100.7.3 
  </release-notes/database-tools-changelog#100.7.3-changelog>`. 
- Adds cluster removal, shutdown, startup, and restart ability to the :ref:`managedSharding <autoconfig-sharded-clusters>` API parameter. 

.. _cloudmanager_20230614:

14 June 2023 Release
~~~~~~~~~~~~~~~~~~~~

- Updates the {+mdbagent+} to :ref:`13.1.0.8282-1 <13.1.0.8282-1>`.
- Adds support for |bic-full| 2.14.7.
- Updates Go to 1.19.9+ to address the following |cve|\s:

  - :cve-id:`CVE-2023-29400 </CVE-2023-29400>`
  - :cve-id:`CVE-2023-24539 </CVE-2023-24539>`
  - :cve-id:`CVE-2023-24540 </CVE-2023-24540>`

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
