.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``created``
     - string
     - |iso8601-time| when the alert configuration was created.

   * - ``enabled``
     - boolean
     - Toggle that specifies whether the alert configuration is enabled.

   * - ``eventTypeName``
     - string
     - Type of event for which this alert configuration triggers
       an alert.

       .. include:: /includes/api/facts/event-type-values.rst

   * - ``forAllGroups``
     - boolean
     - Toggle that specifies whether the global alert configuration 
       applies to all groups. Also affects whether you can use the 
       ``tags`` array to target the configuration to specific groups.

       If ``true``, the configuration applies to all groups. You can 
       target the alert configuration to specific groups through the 
       ``tags`` array.

       If ``false``, the configuration applies only to the groups
       specified in the ``groupIds`` array. You must specify at 
       least one project in the ``groupIds`` array. You can't use the 
       ``tags`` array for this alert configuration.

   * - ``groupIds``
     - array of strings
     - IDs of the groups to which this alert configuration applies. 
       This field applies only if ``forAllGroups`` is set to ``false``.

   * - ``id``
     - string
     - Unique identifier of the alert configuration.

   * - ``matchers``
     - array of objects
     - Rules to apply when matching an object against this global alert
       configuration. |mms| only checks entities that match *all* these 
       rules for an alert condition.

       You can filter using the ``matchers`` array only when the
       ``eventTypeName`` specifies an event for a host, replica set, or
       sharded cluster.

   * - ``matchers.fieldName``
     - string
     - Name of the field in the target object on which to match.

       .. include:: /includes/possibleValues-api-matchers.fieldName.rst

   * - ``matchers.operator``
     - string
     - Operator to test the field's value. Possible values are:

       .. include:: /includes/possibleValues-api-matchers.operator.rst

   * - ``matchers.value``
     - string
     - Value to test with the specified operator.

       .. include:: /includes/possibleValues-api-matchers.value.rst

   * - ``metricThreshold``
     - object
     - Threshold that causes this alert configuration to trigger
       an alert. Only present if ``eventTypeName`` is set to 
       ``OUTSIDE_METRIC_THRESHOLD``.

   * - ``metricThreshold.metricName``
     - string
     - Name of the metric to check. Supports the same values as the
       ``metricName`` field of the ``globalAlerts`` resource. For a list 
       of possible values, see 
       :ref:`measurement-types-for-global-alerts-api`.

   * - ``metricThreshold.mode``
     - string
     - This is set to ``AVERAGE`` and computes the current metric value 
       as an average.

   * - ``metricThreshold.operator``
     - string
     - Operator to apply when checking the current metric value 
       against ``metricThreshold.threshold``. Possible values are:

       - ``GREATER_THAN``
       - ``LESS_THAN``

   * - ``metricThreshold.threshold``
     - number
     - Threshold value outside of which this alert configuration
       triggers an alert.

   * - ``metricThreshold.units``
     - string
     - Units for ``metricThreshold.threshold``. The units depend on
       the type of metric. 

       Accepted values are:

       .. include:: /includes/possibleValues-api-units.rst

       For example, a metric that measures memory consumption can use ``BYTES``, 
       while a metric that measures time can use ``HOURS``. 

   * - ``notifications``
     - array of objects
     - Notifications |mms| sends when it detects an alert that this 
       alert configuration describes.

   * - ``notifications.apiToken``
     - string
     - Slack API token or Bot token. Only present for ``SLACK``
       notifications. If the token later becomes invalid, |mms| sends an
       email to the project owner and removes the token.

       .. include:: /includes/fact-api-key-redacted.rst

   * - ``notifications.channelName``
     - string
     - Slack channel name. Only present for ``SLACK`` notifications.

   * - ``notifications.delayMin``
     - number
     - Number of minutes to wait after an alert condition is 
       detected before |mms| sends out the first notification.

   * - ``notifications.emailAddress``
     - string
     - Email address to which to send notification. Only present for
       ``EMAIL`` notifications.

   * - ``notifications.emailEnabled``
     - boolean
     - Toggle specifying whether |mms| sends email notifications. 
       Only present for ``GROUP`` and ``USER`` notifications.

   * - ``notifications.intervalMin``
     - number
     - Number of minutes to wait between successive notifications 
       for unacknowledged, unresolved alerts that this alert 
       configuration triggers.

   * - | notifications.[n]
       | .webhookSecret
     - string
     - A value used to authenticate with the Webhook that accepts and
       forwards the notification.

       |mms| returns this value if you set
       ``notifications.[n].typeName`` to ``WEBHOOK`` and either:

       - You set ``notification.[n].webhookSecret`` to a non-empty 
         string
        
       - You set a default ``webhookSecret`` on the 
         :ref:`Admin Console <mms-manage-global-alerts>`.

       .. include:: /includes/fact-webhook-redacted.rst

   * - | notifications.[n]
       | .webhookUrl
     - string
     - |url| for the webhook that triggers this notification.

       |mms| returns this value if you set
       ``notifications.[n].typeName`` to ``WEBHOOK`` and either:

       - You set ``notification.[n].webhookURL`` to a non-empty string

       - You set a default ``webhookUrl`` on the 
         :ref:`Admin Console <mms-manage-global-alerts>` page.

       .. include:: /includes/fact-webhook-redacted.rst

   * - ``notifications.microsoftTeamsWebhookUrl``
     - string
     - Microsoft Teams channel incoming webhook URL. Only present 
       for ``MICROSOFT_TEAMS`` notifications.

       .. include:: /includes/fact-microsoft-redacted.rst

   * - ``notifications.notificationToken``
     - string
     - HipChat API token. Only present for ``HIP_CHAT`` notifications.
       If the token later becomes invalid, |mms| sends an email to the 
       project owner and removes the token.

       .. include:: /includes/fact-api-key-redacted.rst

   * - ``notifications.roomName``
     - string
     - HipChat room name. Only present for ``HIP_CHAT`` notifications.

   * - ``notifications.serviceKey``
     - string
     - PagerDuty integration key. Only present for ``PAGER_DUTY`` 
       notifications. If the key later becomes invalid, |mms| sends an 
       email to the project owner and removes the key.

       .. include:: /includes/fact-api-key-redacted.rst

   * - ``notifications.smsEnabled``
     - boolean
     - Toggle specifying whether |mms| sends SMS notifications. Only 
       present for ``GROUP`` and ``USER`` notifications.

   * - ``notifications.snmpAddress``
     - string
     - Hostname and port to send SNMP traps to. At this time |mms| can 
       send SNMP traps only to the standard SNMP port (162). Only 
       present for ``SNMP`` notifications.

       .. include:: /includes/fact-snmp-alerts-deprecated.rst

       .. note::

          |mms| uses SNMP v2c.

   * - ``notifications.typeName``
     - string
     - Type of alert notification this alert configuration triggers. 
       Possible values are:

       - ``ADMIN``
       - ``GROUP``
       - ``USER``
       - ``SNMP``

         .. include:: /includes/fact-snmp-alerts-deprecated.rst

       - ``EMAIL``
       - ``SMS`` (Available only if |mms| is configured for :ref:`Twilio integration <twilio-sms-alert-settings>`.)
       - ``HIPCHAT``
       - ``SLACK``
       - ``PAGER_DUTY``

   * - ``notifications.username``
     - string
     - Name of the |onprem| user to whom to send notifications. Only
       present for ``USER`` notifications.

   * - ``threshold``
     - object
     - Threshold that causes this alert configuration to trigger
       an alert. Only present if ``eventTypeName`` is set to one of the 
       following values:

       - ``TOO_FEW_HEALTHY_MEMBERS``
       - ``TOO_MANY_UNHEALTHY_MEMBERS``

   * - ``threshold.operator``
     - string
     - Operator to apply when checking the current metric value against
       ``threshold.threshold``. Possible values are:

       - ``GREATER_THAN``
       - ``LESS_THAN``

   * - ``threshold.threshold``
     - number
     - Threshold value outside of which this alert configuration
       triggers an alert.

   * - ``tags``
     - array of strings
     - Tags associated with this alert configuration.

   * - ``typeName``
     - string
     - *This field is deprecated and will be ignored.*

   * - ``updated``
     - string
     - |iso8601-time| when this alert configuration was last updated.
