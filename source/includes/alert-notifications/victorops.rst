Sends the alert to a
`VictorOps <https://www.splunk.com/en_us/software/splunk-on-call.html>`_ account.

- In |mms|, enter the following VictorOps setting information:

  - `API key <https://help.victorops.com/knowledge-base/rest-endpoint-integration-guide/>`__.
    This integrates the VictorOps endpoint for alerts.
  - `Routing key <https://help.victorops.com/knowledge-base/routing-keys/>`__.
    This optional setting routes alerts to a specific VictorOps group.

- Click :guilabel:`Post Test Alert` to test VictorOps configuration.

- Define escalation and routing rules directly in VictorOps.

.. include:: /includes/alert-notifications/ack-alerts-only.rst

Acknowledge VictorOps alerts from the VictorOps dashboard.
