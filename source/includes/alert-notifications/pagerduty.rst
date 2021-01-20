Sends the alert to a `PagerDuty <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`_
account. Enter only the PagerDuty integration key. Define escalation
rules and alert assignments directly in PagerDuty.

This option is available only for alerts that require an
acknowledgement. Information alerts, such as
:alert-type:`User joined the organization <JOINED_ORG>`, can't use
this notification method.

Acknowledge PagerDuty alerts from the PagerDuty dashboard.

.. include:: /includes/fact-pagerduty-decommission.rst
