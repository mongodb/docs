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
