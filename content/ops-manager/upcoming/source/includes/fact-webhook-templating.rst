.. _om-webhook-templating:

Webhook Templating
~~~~~~~~~~~~~~~~~~

|mms| supports webhook templating using `FreeMarker <https://freemarker.apache.org/docs/dgui_template_exp.html>`__
template syntax. You can customize both the HTTP headers and request body
content sent to your webhook endpoint. Both templates must produce valid JSON output.

**Template Variables**

You can use a variety of variables in both the headers and body templates.
For more details, check the :doc:`Alert Model documentation </reference/api/alerts-get-alert>`,
click the :guilabel:`post test message` button (random data) or save an aler
and inspect the webhook payload (variable names match the JSON keys).

.. note::
   Not all variables are included in every webhook call. Available fields depend
   on the alert type and status. Make sure your templates handle null values to
   avoid rendering errors.

The following variables are available in webhook templates:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Variable
     - Description

   * - ``${acknowledgedUntil}``
     - Timestamp in ISO 8601 date and time format in UTC until which the alert has been acknowledged.

   * - ``${acknowledgementComment}``
     - Comment left by the user who acknowledged the alert.

   * - ``${acknowledgingUsername}``
     - Username of the user who acknowledged the alert.

   * - ``${alertConfigId}``
     - Unique identifier for the alert configuration that triggered this alert.

   * - ``${clusterId}``
     - Unique identifier for the cluster to which this alert applies.

   * - ``${clusterName}``
     - Name of the cluster to which this alert applies.

   * - ``${created}``
     - Timestamp in ISO 8601 date and time format in UTC when the alert was opened.

   * - ``${currentValue}``
     - (Object) Current value of the metric that triggered the alert.

   * - ``${currentValue.number}``
     - Value of the metric.

   * - ``${currentValue.units}``
     - Units for the value. Value depends on the type of metric.

   * - ``${event}``
     - The action or state change for this alert notification (Default ``X-Mms-Event`` header - ``alert.opened``, ``alert.closed``, ``alert.update``, ``alert.acknowledge``, ``alert.cancel``, ``alert.inform``).

   * - ``${eventTypeName}``
     - Name of the event that triggered the alert.

   * - ``${groupId}``
     - Unique identifier of the group (project) for which this alert was opened.

   * - ``${hostId}``
     - Unique identifier for the host to which the metric pertains.

   * - ``${hostnameAndPort}``
     - Hostname and port of each host to which the alert applies. This can be a hostname, an FQDN, an IPv4 address, or an IPv6 address.

   * - ``${humanReadable}``
     - Human readable description of the alert.

   * - ``${id}``
     - Unique identifier for the alert.

   * - ``${lastNotified}``
     - Timestamp in ISO 8601 date and time format in UTC when the last notification was sent for this alert.

   * - ``${links}``
     - (Array of Object) One or more links to sub-resources and/or related resources.

   * - ``${links[i].rel}``
     - Describes the relationship type of the linked resource (e.g., ``self`` for the current resource).

   * - ``${links[i].href}``
     - Link to the resource.

   * - ``${metricName}``
     - Name of the measurement whose value went outside the threshold.

   * - ``${orgId}``
     - Unique identifier of the organization for which this alert was opened.

   * - ``${orgName}``
     - Name of the organization for which this alert was opened.

   * - ``${projectName}``
     - Name of the project (group) for which this alert was opened.

   * - ``${replicaSetName}``
     - Name of the replica set.

   * - ``${requestId}``
     - Unique identifier for the request. (Default ``X-Mms-Request-Id`` header).

   * - ``${resolved}``
     - Timestamp in ISO 8601 date and time format in UTC when the alert was closed.

   * - ``${signature}``
     - Request signature, only available in the headers template. (Default ``X-Mms-Signature`` header).

   * - ``${status}``
     - Current state of the alert (``TRACKING`` | ``OPEN`` | ``CLOSED`` | ``CANCELLED`` | ``INFORMATIONAL``)

   * - ``${sourceTypeName}``
     - Type of host being backed up when ``eventTypeName`` : ``BACKUP``

   * - ``${tags}``
     - Identifying labels set for this alert.

   * - ``${updated}``
     - Timestamp in ISO 8601 date and time format in UTC when the alert was last updated.

**Regex Helper**

Additionally, there is a custom helper available, the ``re`` helper, that lets you
use regular expressions to extract data from text within your templates.

- ``re.group(input, regex, group)``

  Returns the specified capture group from the first match. If no match, returns an empty string.

  **Example:** ``${re.group("abc-123", "([a-z]+)-(\\d+)", 2)}`` → ``123``

- ``re.findAllGroup(input, regex, group)``

  Returns a list of all group matches.

  **Example:**

  .. code-block:: freemarker

     <#list re.findAllGroup("error1:12;error2:98;error3:33", "error\\d+:(\\d+)", 1) as val>${val} </#list>

  Outputs: ``12 98 33``

.. note::
   The ``group`` index is ``1-based``. If no matches are found, returns an empty string or empty list.

**Template Examples**

**Custom Headers Template:**

.. code-block:: json

   {
     "X-Static": "static-value",
     "X-Secret": "${signature}",
     "X-Request-Id": "${requestId}",
     "X-Event": "${event}",
     "X-Org-Name": "${orgName!''}",
     "X-Test-Regex-Helper": "${re.group(\"abc-123\", \"([a-z]+)-(\\d+)\", 2)}"
   }

**Custom Body Template:**

.. code-block:: json

   {
     "staticValue": "This value is static",
     "testRegexHelper": [
       <#list re.findAllGroup("error1:12;error2:98;error3:33", "error\\d+:(\\d+)", 1) as val> "${val}"<#if val_has_next>,</#if></#list>
     ],
     "replicaSetName": "${replicaSetName!''}",
     "metricName": "${metricName!''}",
     "orgName": "${orgName!''}",
     "created": "${created!''}",
     "groupId": "${groupId!''}",
     "hostId": "${hostId!''}",
     "hostnameAndPort": "${hostnameAndPort!''}",
     "humanReadable": "${humanReadable?js_string}",
     "orgId": "${orgId!''}",
     "alertConfigId": "${alertConfigId!''}",
     "eventTypeName": "${eventTypeName!''}",
     "links": [
       <#list links![] as link>
       {
         "rel": "${link.rel!''}",
         "href": "${link.href!''}"
       }<#if link_has_next>,</#if>
       </#list>
     ],
     "id": "${id!''}",
     "projectName": "${projectName!''}",
     "updated": "${updated!''}",
     "currentValue": {
       "number": ${(currentValue.number)!0},
       "units": "${(currentValue.units)!''}"
     },
     "status": "${status!''}"
   }

**Testing Webhook Templates**

After configuring your webhook templates, you can test them using the
:guilabel:`Test Alert` button in the alert configuration interface.
This sends a test notification with sample data to verify your
template renders correctly.