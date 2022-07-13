.. _cloudmanager_20220713:

13 July 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`12.2.0.7631 <12.2.0.7631>`

.. _cloudmanager_20220622:

22 June 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+) to :ref:`12.1.2.7597-1 <12.1.2.7597-1>`.
- Adds the ability to enable and run the sharded cluster balancer 
  through the |mms-full| UI using Automation.

.. _cloudmanager_20220601:

01 June 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`12.0.4.7554 <12.0.4.7554>`.

.. _cloudmanager_20220511:

11 May 2022 Release
~~~~~~~~~~~~~~~~~~~~~

- Updates PagerDuty integration to use the
  `PagerDuty Events API v2 <https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTgw-events-api-v2-overview>`__.
- Adds the ``OPLOG_REPLICATION_LAG_TIME`` host measurement series to
  the :doc:`Measurements Administration API resource </reference/api/measures/measurement-types>`.
- Deprecates the ``OPLOG_SLAVE_LAG_MASTER_TIME`` metric.
- Updates {+mdbagent+} to :ref:`12.0.0.7536 <12.0.0.7536>`.



.. _cloudmanager_20220420:

20 April 2022 Release
~~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`11.15.0.7497 <11.15.0.7497>`.

.. _cloudmanager_20220331:

31 March 2022 Release
~~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`11.14.0.7475 <11.14.0.7475>`.

.. _cloudmanager_20220309:

9 March 2022 Release
~~~~~~~~~~~~~~~~~~~~

- Introduces a :ref:`metrics integration with Prometheus <prometheus-integration-mms>`.
- Updates {+mdbagent+} to :ref:`11.13.0.7438 <11.13.0.7438>`.

.. _cloudmanager_20220216:

16 February 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Updates {+mdbagent+} to :ref:`11.12.0.7401 <11.12.0.7401>`.

.. _cloudmanager_20210125:

25 January 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Adds the ability to :ref:`set separate rules for server log rotation and audit log rotation <configure-mms-log-rotation>`.

- Adds new API endpoints for :doc:`federated authentication configuration </reference/api/federation-configuration>`.

- Adds a Microsoft Teams alerts integration.

- Removes workaround to use an X.509 CommonName instead of a |san-dns|.

.. _cloudmanager_20210105:

5 January 2022 Release
~~~~~~~~~~~~~~~~~~~~~~~

- Adds support for ``tlsLogVersions`` in :ref:`Advanced Configuration Options <deployment-advanced-options-net>`.
  
- Updates {+mdbagent+} to :ref:`11.10.0.7307 <11.10.0.7307>`.
