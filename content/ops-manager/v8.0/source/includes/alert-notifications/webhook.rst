Sends an |http| POST request to an endpoint for programmatic
processing. The request body contains a |json| document that uses the
same format as the |mms| |api|
:doc:`Alerts resource </reference/api/alerts>`.

You can authenticate webhook requests with a webhook secret, OAuth 2.0
client credentials, or both.

For detailed information about webhook request headers, request
body structure, templates, authentication, and limitations, see
:doc:`Integrate with Webhooks </tutorial/webhook-integration>`.

To configure this option, configure the Webhook settings on the
:ref:`Project Settings page <group-settings-page>`.
