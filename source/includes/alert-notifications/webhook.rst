Sends an |http| POST request to an endpoint for programmatic
processing. The request body contains a |json| document that uses the
same format as the |mms| |api|
:doc:`Alerts resource </reference/api/alerts>`.

To configure this option, configure the Webhook settings on the
:ref:`Project Settings page <group-settings-page>`.

.. cond:: cloud

   To ensure your Webhooks work,
   :ref:`configure your firewall <alerts-webhook-ips>` to permit the
   Webhooks to access |mms|.
