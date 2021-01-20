Sends the alert to a
`VictorOps <https://www.splunk.com/en_us/software/splunk-on-call.html>`_ account.

- In |mms|, enter the following VictorOps setting information:

  - :vo-docs:`API key </knowledge-base/rest-endpoint-integration-guide/>`.
    This integrates the VictorOps endpoint for alerts.
  - :vo-docs:`Routing key </knowledge-base/routing-keys/>`.
    This optional setting routes alerts to a specific VictorOps group.

- Click :guilabel:`Post Test Alert` to test VictorOps configuration.

- Define escalation and routing rules directly in VictorOps.

.. include:: /includes/alert-notifications/ack-alerts-only.rst

Acknowledge VictorOps alerts from the VictorOps dashboard.
