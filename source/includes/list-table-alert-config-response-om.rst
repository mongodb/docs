.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - created
     - string
     - |iso8601-time| when this alert configuration was created.

   * - enabled
     - boolean
     - Flag indicating this alert configuration enabled.

   * - eventTypeName
     - string
     - Type of event that triggers an alert.
       
       For a complete list of alert events, see :opsmgr:`Alert Conditions
       </reference/alerts/>`.

   * - groupId
     - string
     - Unique identifier of the Project that owns this alert
       configuration.

   * - id
     - string
     - Unique identifier for this alert configuration.

   * - matchers.fieldName
     - string
     - Name of the field in the target object to match on.
       
       Use the :ref:`List alert configuration matcher fields 
       <mcli-om-alert-config-fields-type-command>` to return the 
       possible values.

   * - matchers.operator
     - string
     - Operator to test the field's value. Accepted values are:
       
       .. include:: /includes/possibleValues-api-matchers.operator.rst

   * - matchers.value
     - string
     - Value to test with the specified operator.
       
       .. include:: /includes/possibleValues-api-matchers.value.rst

   * - matchers
     - object array
     - Rules to apply when matching an object against this alert 
       configuration. Only entities that match *all* these rules
       are checked for an alert condition.

       You can filter using the ``matchers`` array only when the
       **eventTypeName** specifies an event for a host, replica
       set, or sharded cluster.

   * - metricThreshold.metricName
     - string
     - The name of the metric whose value went outside the threshold. Only
       applicable if ``--event`` is ``OUTSIDE_METRIC_THRESHOLD``. Possible
       values are:

       .. include:: /includes/metricName-list.rst

   * - metricThreshold.mode
     - string
     - Average value of this metric.

   * - metricThreshold.operator
     - string
     - Operator to apply when checking the current metric value
       against the threshold value. Accepted values are:

       - ``GREATER_THAN``

       - ``LESS_THAN``

   * - metricThreshold.threshold
     - number
     - Threshold value outside of which an alert is triggered.

   * - metricThreshold.units
     - string
     - Units for the threshold value. Depends on the type of 
       metric. 
       
       .. example:: 

          A metric that measures memory consumption would have a 
          byte measurement, while a metric that measures time would 
          have a time unit.
       
       Accepted values are:
       
       .. include:: /includes/possibleValues-api-units.rst

   * - metricThreshold
     - object
     - Threshold that will cause an alert to be triggered.
       Populated if ``"eventTypeName" :
       "OUTSIDE_METRIC_THRESHOLD"``.

   * - notifications.apiToken
     - string
     - Slack API token or Bot token. Populated for ``SLACK``
       notifications. If the token later becomes invalid, |onprem|
       sends an email to the Project owner and eventually removes
       the token.

   * - notifications.channelName
     - string
     - Slack channel name. Populated for ``SLACK`` notifications.

   * - notifications.datadogApiKey
     - string
     - DataDog API Key. Found in the DataDog dashboard. Populated
       for ``DATADOG`` notifications.

   * - notifications.delayMin
     - number
     - Number of minutes to wait after an alert condition is 
       detected before sending out the first notification.

   * - notifications.emailAddress
     - string
     - Email address to which to send notification. Populated for
       ``EMAIL`` notifications.

   * - notifications.emailEnabled
     - boolean
     - Flag indicating email notifications must be sent. Populated
       for ``ORG``, ``GROUP``, and ``USER`` notifications.

   * - notifications.flowdockApiToken
     - string
     - Flowdock "personal API token." Populated for 
       ``FLOWDOCK`` notifications. If the token later becomes 
       invalid, |onprem| sends an email to the Project owner and 
       eventually removes the token.

   * - notifications.flowName
     - string
     - Flow name, in lower-case letters. Populated for
       ``FLOWDOCK`` notifications. The flow name appears after the
       organization name in the URL string:
       ``www.flowdock.com/app/<organization-name>/<flow-name>``.

   * - notifications.intervalMin
     - number
     - Number of minutes to wait between successive notifications 
       for unacknowledged alerts that are not resolved.

   * - notifications.notificationToken
     - string
     - HipChat API token. Populated for ``HIP_CHAT`` notifications.
       If the token later becomes invalid, |onprem| sends an email to
       the Project owner and eventually removes the token.

   * - notifications.orgName
     - string
     - Flowdock organization name in lower-case letters. This is
       the name that appears after ``www.flowdock.com/app/`` in the
       URL string. Populated for ``FLOWDOCK`` notifications.

   * - notifications.role
     - string
     - |onprem| role in current Project. Populated for ``GROUP``
       notifications.

   * - notifications.roomName
     - string
     - HipChat room name. Populated for ``HIP_CHAT`` notifications.

   * - notifications.serviceKey
     - string
     - PagerDuty service key. Populated for ``PAGER_DUTY`` 
       notifications. If the key later becomes invalid, |onprem| sends 
       an email to the Project owner and eventually removes the key.

   * - notifications.smsEnabled
     - boolean
     - Flag indicating SMS notifications must be sent. Populated
       for ``ORG``, ``GROUP``, and ``USER`` notifications.

   * - notifications.snmpAddress
     - string
     - Hostname and port to send |snmp| traps to. At this time,
       |onprem| is only able to send |snmp| traps to the standard
       |snmp| port (162). Populated for ``SNMP`` notifications.
       |onprem| uses |snmp| v2c.

   * - notifications.typeName
     - string
     - Type of alert notification. Accepted values are:
       
       - ``DATADOG``
       - ``EMAIL``
       - ``FLOWDOCK``
       - ``GROUP`` (Project)
       - ``HIPCHAT``
       - ``OPS_GENIE``
       - ``ORG``
       - ``PAGER_DUTY``
       - ``SLACK``
       - ``SMS``
       - ``SNMP``
       - ``USER``
       - ``VICTOR_OPS``
       - ``WEBHOOK``

   * - notifications.username
     - string
     - Name of an |onprem| user to which to send notifications. Only
       a user in the Project that owns the alert configuration is
       allowed here. Populated for ``USER`` notifications.

   * - notifications
     - object array
     - Notifications to send when an alert condition is detected.

   * - threshold.operator
     - string
     - Operator to apply when checking the current metric value
       against the threshold value.

       - ``GREATER_THAN``

       - ``LESS_THAN``

   * - threshold.threshold
     - number
     - Threshold value outside of which an alert is triggered.

   * - threshold
     - object
     - Threshold that will cause an alert to be triggered. Populated if

       - ``"eventTypeName" : "TOO_FEW_HEALTHY_MEMBERS"``

       - ``"eventTypeName" : "TOO_MANY_UNHEALTHY_MEMBERS"``

   * - typeName
     - string
     - *This field is deprecated and are ignored.*

   * - updated
     - string
     - |iso8601-time| when this alert configuration was last updated.
