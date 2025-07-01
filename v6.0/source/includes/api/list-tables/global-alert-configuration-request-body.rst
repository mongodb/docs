.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 15 10 10 65

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - ``enabled``
     - boolean
     - Optional
     - Toggle that specifies whether the alert configuration is enabled.

   * - ``eventTypeName``
     - string
     - Required
     - Type of event for which this alert configuration triggers
       an alert.

       .. include:: /includes/api/facts/event-type-values.rst

   * - ``forAllGroups``
     - boolean
     - Required
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
     - Optional
     - IDs of the groups to which this alert configuration applies. 
       This field applies only if ``forAllGroups`` is set to ``false``.

   * - ``matchers``
     - array of objects
     - Conditional
     - Rules to apply when matching an object against this global alert
       configuration. |mms| only checks entities that match *all* these 
       rules for an alert condition.

       You can filter using the ``matchers`` array only when the
       ``eventTypeName`` specifies an event for a host, replica set, or
       sharded cluster.

   * - | ``matchers``
       | ``.fieldName``
     - string
     - Conditional
     - Name of the field in the target object on which to match.

       .. include:: /includes/possibleValues-api-matchers.fieldName.rst

   * - | ``matchers``
       | ``.operator``
     - string
     - Conditional
     - Operator to test the field's value. Accepted values are:

       .. include:: /includes/possibleValues-api-matchers.operator.rst

   * - | ``matchers``
       | ``.value``
     - string
     - Conditional
     - Value to test with the specified operator.

       .. include:: /includes/possibleValues-api-matchers.value.rst

   * - ``metricThreshold``
     - object
     - Conditional
     - Threshold that causes this alert configuration to trigger
       an alert. Only required if ``eventTypeName`` is set to 
       ``OUTSIDE_METRIC_THRESHOLD``.

   * - | ``metricThreshold``
       | ``.metricName``
     - string
     - Conditional
     - Name of the metric to check. Supports the same values as the
       ``metricName`` field of the ``globalAlerts`` resource. For a list 
       of possible values, see 
       :ref:`measurement-types-for-global-alerts-api`.

   * - | ``metricThreshold``
       | ``.mode``
     - string
     - Conditional
     - This is set to ``AVERAGE`` and computes the current metric value 
       as an average.

   * - | ``metricThreshold``
       | ``.operator``
     - string
     - Conditional
     - Operator to apply when checking the current metric value 
       against ``metricThreshold.threshold``. Possible values are:

       - ``GREATER_THAN``
       - ``LESS_THAN``

   * - | ``metricThreshold``
       | ``.threshold``
     - number
     - Conditional
     - Threshold value outside of which this alert configuration
       triggers an alert.

   * - | ``metricThreshold``
       | ``.units``
     - string
     - Conditional
     - Units for ``metricThreshold.threshold``. The units depend on
       the type of metric. 
       
       Accepted values are:

       .. include:: /includes/possibleValues-api-units.rst

       For example, a metric that measures memory consumption can use ``BYTES``, 
       while a metric that measures time can use ``HOURS``. 

   * - ``notifications``
     - array of objects
     - Required
     - Notifications |mms| sends when it detects an alert that this 
       alert configuration describes.

   * - | ``notifications``
       | ``.apiToken``
     - string
     - Conditional
     - Slack API token or Bot token. Only accepted for ``SLACK``
       notifications. If the token later becomes invalid, |mms| sends an
       email to the project owner and removes the token.

   * - | ``notifications``
       | ``.channelName``
     - string
     - Conditional
     - Slack channel name. Only accepted for ``SLACK`` notifications.

   * - | ``notifications``
       | ``.delayMin``
     - number
     - Conditional
     - Number of minutes to wait after an alert condition is 
       detected before |mms| sends out the first notification.

   * - | ``notifications``
       | ``.emailAddress``
     - Conditional
     - Optional
     - Email address to which to send notification. Only accepted for
       ``EMAIL`` notifications.

   * - | ``notifications``
       | ``.emailEnabled``
     - boolean
     - Conditional
     - Toggle specifying whether |mms| sends email notifications. 
       Only accepted for ``GROUP`` and ``USER`` notifications.

   * - | ``notifications``
       | ``.intervalMin``
     - number
     - Conditional
     - Number of minutes to wait between successive notifications 
       for unacknowledged, unresolved alerts that this alert 
       configuration triggers.

   * - | ``notifications``
       | ``.webhookSecret``
     - string
     - Conditional
     - A value used to authenticate with the Webhook that accepts and
       forwards the notification. You can explicitly declare a secret 
       only in a request that has both:

       - A ``notifications.typeName`` of ``WEBHOOK``

       - An explicitly declared ``notifications.webhookURL``

       You can configure a ``webhookSecret`` for a default 
       ``webhookURL`` only with the
       :ref:`Admin Console <mms-manage-global-alerts>`.

       To explicitly declare a ``webhookURL`` without a 
       ``webhookSecret``, omit this field.

   * - | ``notifications``
       | ``.webhookUrl``
     - string
     - Optional
     - |url| for the webhook that triggers this notification. If you do
       not explicitly declare a ``webhookUrl``, your request will use
       the default ``webhookUrl`` set in the
       :ref:`Admin Console <mms-manage-global-alerts>`.

   * - | ``notifications``
       | ``.microsoftTeamsWebhookUrl``
     - string
     - Conditional
     - Microsoft Teams channel incoming webhook URL. Only accepted 
       for ``MICROSOFT_TEAMS`` notifications.

   * - | ``notifications``
       | ``.notificationToken``
     - string
     - Conditional
     - HipChat API token. Only accepted for ``HIP_CHAT`` notifications.
       If the token later becomes invalid, |mms| sends an email to the 
       project owner and removes the token.

   * - | ``notifications``
       | ``.roomName``
     - string
     - Conditional
     - HipChat room name. Only accepted for ``HIP_CHAT`` notifications.

   * - | ``notifications``
       | ``.serviceKey``
     - string
     - Conditional
     - PagerDuty integration key. Only accepted for ``PAGER_DUTY`` 
       notifications. If the key later becomes invalid, |mms| sends an 
       email to the project owner and removes the key.

       .. include:: /includes/fact-pagerduty-decommission.rst

   * - | ``notifications``
       | ``.smsEnabled``
     - boolean
     - Conditional
     - Toggle specifying whether |mms| sends SMS notifications. Only 
       accepted for ``GROUP`` and ``USER`` notifications.

   * - | ``notifications``
       | ``.snmpAddress``
     - string
     - Conditional
     - Hostname and port to send SNMP traps to. At this time |mms| can 
       send SNMP traps only to the standard SNMP port (162). Only 
       accepted for ``SNMP`` notifications. 

       .. include:: /includes/fact-snmp-alerts-deprecated.rst

       .. note::

          |mms| uses SNMP v2c.

   * - | ``notifications``
       | ``.typeName``
     - string
     - Required
     - Type of alert notification this alert configuration triggers. 
       Accepted values are:

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

   * - | ``notifications``
       | ``.username``
     - string
     - Conditional
     - Name of the |mms| user to whom to send notifications. Only
       present for ``USER`` notifications.

   * - ``threshold``
     - object
     - Conditional
     - Threshold that causes this alert configuration to trigger
       an alert. Only required if ``eventTypeName`` is set to one of the 
       following values:

       - ``TOO_FEW_HEALTHY_MEMBERS``
       - ``TOO_MANY_UNHEALTHY_MEMBERS``

   * - | ``threshold``
       | ``.operator``
     - string
     - Conditional
     - Operator to apply when checking the current metric value against
       ``threshold.threshold``. Accepted values are:

       - ``GREATER_THAN``
       - ``LESS_THAN``

   * - | ``threshold``
       | ``.threshold``
     - number
     - Conditional
     - Threshold value outside of which this alert configuration
       triggers an alert.

   * - ``tags``
     - array of strings
     - Optional
     - Tags associated with this alert configuration.

   * - ``typeName``
     - string
     - Optional
     - *This field is deprecated and will be ignored.*
