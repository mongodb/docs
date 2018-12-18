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
