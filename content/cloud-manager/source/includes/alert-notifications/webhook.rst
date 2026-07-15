Sends an |http| POST request to an endpoint for programmatic
processing. The request body contains a |json| document that uses the
same format as the |mms| |api|
:doc:`Alerts resource </reference/api/alerts>`.

You can customize the webhook request headers and body content by
setting the ``webhookHeadersTemplate`` and ``webhookBodyTemplate``
fields on the webhook notification. Each template supports
``${field}`` interpolation: |mms| replaces each ``${field}``
placeholder with the value of the matching field from the alert
document when it sends the notification.

You can interpolate any field that the alert document returns, such
as ``${eventTypeName}``, ``${clusterName}``, ``${status}``, and
``${created}``. For the complete list of fields you can interpolate,
see the response fields for the :doc:`Get One Alert
</reference/api/alerts-get-alert>` endpoint.

For example, the body template
``{"event": "${eventTypeName}", "cluster": "${clusterName}"}``
renders each placeholder with its alert value before |mms| sends the
request.

The rendered body must be valid |json| and is sent with the
``Content-Type: application/json`` header. The rendered headers must
form a |json| object that maps each header name to its value. |mms|
doesn't expose the webhook secret or signature header to templates,
and redacts both template fields in |api| responses.

If a template fails to render, exceeds the size limit, or produces
invalid output, |mms| sends its default payload and headers instead
and still delivers the notification. |mms| also emits a
``WEBHOOK_TEMPLATE_RENDER_FAILED`` informational alert so you know
your template didn't render and the default payload was sent. |mms|
doesn't emit this alert for test messages, and limits it to three
alerts per alert configuration each hour.

To preview the rendered output before you save the alert, click the
:guilabel:`Post test message to webhook` button, which renders your
templates against sample alert data.

To configure this option, configure the Webhook settings on the
:ref:`Project Settings page <group-settings-page>`.

To ensure your Webhooks work, :ref:`configure your firewall
<alerts-webhook-ips>` to permit the Webhooks to access |mms|.
