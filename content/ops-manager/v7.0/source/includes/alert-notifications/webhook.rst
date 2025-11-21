Sends an |http| POST request to an endpoint for programmatic
processing. The request body contains a |json| document that uses the
same format as the |mms| |api|
:doc:`Alerts resource </reference/api/alerts>`.

You can customize the webhook request headers and body content using
FreeMarker templates. This allows you to adapt the payload structure
to match your target system's requirements.

To configure this option, configure the Webhook settings on the
:ref:`Project Settings page <group-settings-page>`.

For detailed information about webhook templating, including available
template variables, regex helpers, and examples, see
:doc:`Configure Webhook Templating </tutorial/webhook-templating>`.
