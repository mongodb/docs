Alert configurations depend why you want |service| to raise an alert.
Alerts can be triggered if either:

- a particular condition is met or
- a particular metric exceeded a particular value.

To simplify the differences between condition and metrics, click one of
the following tabs:

.. tabs::

   .. tab:: Condition
      :tabid: condition

      .. include:: /includes/api/list-tables/requests/alert-configurations/event-type-condition.rst

   .. tab:: Metrics
      :tabid: metrics

      .. include:: /includes/api/list-tables/requests/alert-configurations/event-type-metric.rst

.. include:: /includes/api/list-tables/requests/alert-configurations/match-and-notify.rst

Trigger Alerts
~~~~~~~~~~~~~~

.. tabs::
   :hidden:

   .. tab:: Condition
      :tabid: condition

      .. include:: /includes/api/list-tables/requests/alert-configurations/threshold.rst

   .. tab:: Metrics
      :tabid: metrics

      .. include:: /includes/api/list-tables/requests/alert-configurations/metric-thresholds.rst

Filter Results
~~~~~~~~~~~~~~

.. include:: /includes/api/list-tables/requests/alert-configurations/matchers.rst

Set Notifications
~~~~~~~~~~~~~~~~~

.. include:: /includes/api/list-tables/requests/alert-configurations/notifications.rst

