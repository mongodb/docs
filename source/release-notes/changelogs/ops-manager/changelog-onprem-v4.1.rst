.. _opsmgr-server-4.1.6:

|onprem| Rapid Release 4.1.6
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Released 2019-05-09*

- Ubuntu 14.04 (EOL) has been deprecated and it is not supported in this
  release.
- |bic-short| updated to version 2.10.
- Agent Upgrades:
  :ref:`backup-7.8.0.1107`

.. _opsmgr-server-4.1.5:

|onprem| Rapid Release 4.1.5
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Released 2019-04-18*

- Agent Upgrades:
  :ref:`monitoring-7.2.0.488`

.. _opsmgr-server-4.1.4:

|onprem| Rapid Release 4.1.4
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Released 2019-03-28*

- Adds support for managing MongoDB deployments on IBM zSeries for the
  Ubuntu 18.04, SUSE12, and RHEL7 operating systems.
- Numerous improvements to Automation Agent logging and UI feedback to
  users.

- Agent Upgrades:
  :ref:`automation-6.4.0.5657`,
  :ref:`backup-7.6.0.1059`,
  :ref:`monitoring-7.1.0.487`

.. _opsmgr-server-4.1.3:

|onprem| Rapid Release 4.1.3
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Released 2019-03-07*

- Agent Upgrades:
  :ref:`automation-6.3.0.5643`,
  :ref:`backup-7.5.0.1051`,
  :ref:`monitoring-7.0.0.481`

.. _opsmgr-server-4.1.2:

|onprem| Rapid Release 4.1.2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Released 2019-02-21*

- Improved Deployment: List view. Now shows automation status, easy
  individual process log collection, topological deployment grouping,
  and BI Connectors.
- Adds support for IPv6 deployments.
- Allows creation of :ref:`API Keys <mms-prog-api-key>` that are scoped to
  an organization and are not tied to a human.
- Users can now remove themselves from a project.
- Agent Upgrades: 
  :ref:`automation-6.2.0.5620-1`, 
  :ref:`backup-7.4.0.1036-1`,
  :ref:`monitoring-6.9.0.477-1`

.. _opsmgr-server-4.1.1:

|onprem| Rapid Release 4.1.1
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Released 2019-01-31*

- Deprecated Monitoring "Display Name" has been removed from the user
  interface and |api|.
- Updates JDK to
  `AdoptOpenJDK 11.0.1+13 <https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/tag/jdk-11.0.1%2B13>`__.
- Agent Upgrades:
  :ref:`automation-6.1.0.5603`,
  :ref:`backup-7.3.0.1023`,
  :ref:`monitoring-6.8.0.472`

.. _opsmgr-server-4.1.0:

|onprem| Rapid Release 4.1.0
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Released 2018-12-13*

MongoDB, Inc. has released its first |onprem| Rapid Release. This type
of release will happen approximately every 3 weeks, trailing three weeks
behind |cloud| feature releases.

.. important::

   Before using a Rapid Release version of |onprem| in production,
   please arrange a readiness review with the MongoDB Technical Services
   or Professional Services teams.

Deployment Management
`````````````````````

- Improves performance on the Deployment page.
- Adds the ability to manage balancer settings.
- Removes index management support from "Deployments" and
  adds it to :doc:`/data-explorer`.
- Adds the ability to manage the version of Monitoring and Backup
  Agents via the Public API.
- Adds the ability for an Organization to disable the
  :doc:`/data-explorer` feature for a Project.
- Adds Public API support for
  :doc:`/reference/api/performance-advisor`.

Backup
``````

- Improves the administrative interface and makes it searchable.
- Adds the ability to perform a point in time, automated restore via
  the Public API.
- Improves performance for Queryable Restores, especially for restores
  of data sets with many collections or indexes.

Usage Data
``````````

- Collects data on how participating customers use |onprem| and sends it
  to MongoDB, Inc. It gives the |onprem| development team visibility
  into MongoDB and |onprem| usage patterns to help inform decisions on
  features and development direction.

Agent Upgrades
``````````````

- :ref:`automation-5.9.1.5566`
- :ref:`backup-7.1.0.1011`
- :ref:`monitoring-6.7.0.466`
