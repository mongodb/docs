.. note::

   Alert configurations vary. An alert configuration may only
   include a subset of these elements.

.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``created``
     - string
     - |iso8601-time| when this alert configuration was created.

   * - ``enabled``
     - boolean
     - Flag indicating this alert configuration enabled.

   * - ``eventTypeName``
     - string
     - Type of event that triggers an alert.

   * - ``groupId``
     - string
     - Unique identifier of the Project that owns this alert
       configuration.

   * - ``id``
     - string
     - Unique identifier of the alert configuration.

   * - ``matchers``
     - array of objects
     - Rules to apply when matching an object against this alert
       configuration.

   * - | ``matchers``
       | ``.fieldName``
     - string
     - Name of the field in the target object that you wanted this
       configuration to match.

   * - | ``matchers``
       | ``.operator``
     - string
     - Operator to test the field's value.

   * - | ``matchers``
       | ``.value``
     - string
     - Value to test with the specified operator.

   * - ``metricThreshold``
     - object
     - Threshold that triggers an alert. Returned if ``"eventTypeName"
       : "OUTSIDE_METRIC_THRESHOLD"``.

   * - | ``metricThreshold``
       | ``.metricName``
     - string
     - Name of the metric to check. Supports the same values as
       the ``metricName`` field of the ``alerts`` resource.

   * - | ``metricThreshold``
       | ``.mode``
     - string
     - Average value of this metric.

   * - | ``metricThreshold``
       | ``.operator``
     - string
     - Operator to apply when checking the current metric value
       against the threshold value.

   * - | ``metricThreshold``
       | ``.threshold``
     - number
     - Value that, when exceeded, triggers an alert.

   * - | ``metricThreshold``
       | ``.units``
     - string
     - Units for the threshold value.

   * - ``notifications``
     - array of objects
     - One or more targets for |service| to send notifications when an
       alert condition is detected.

   * - | ``notifications``
       | ``.apiToken``
     - string
     - Slack API token token. Returned if ``"notifications.typeName" :
       "SLACK"``.

   * - | ``notifications``
       | ``.channelName``
     - string
     - Slack channel name. Returned if ``"notifications.typeName" :
       "SLACK"``.

   * - | ``notifications``
       | ``.datadogApiKey``
     - string
     - DataDog API Key. Returned if ``"notifications.typeName" :
       "DATADOG"``.

   * - | ``notifications``
       | ``.datadogRegion``
     - string
     - Region that indicates which |api| |url| to use.

   * - | ``notifications``
       | ``.delayMin``
     - number
     - Number of minutes to wait after an alert condition is detected
       before sending out the first notification.

   * - | ``notifications``
       | ``.emailAddress``
     - string
     - Email address to which to send notification. Returned if
       ``"notifications.typeName" : "EMAIL"``.

   * - | ``notifications``
       | ``.emailEnabled``
     - boolean
     - Flag indicating email notifications must be sent. Returned if
       ``"notifications.typeName" : "ORG"``, ``GROUP``, or ``USER``.

   * - | ``notifications``
       | ``.flowdockApiToken``
     - string
     - Flowdock personal |api| token. Returned if
       ``"notifications.typeName" : "FLOWDOCK"``.

   * - | ``notifications``
       | ``.flowName``
     - string
     - Name of the Flowdock flow. Returned if
       ``"notifications.typeName" : "FLOWDOCK"``.

   * - | ``notifications``
       | ``.intervalMin``
     - number
     - Number of minutes to wait between successive notifications
       for unacknowledged alerts that are not resolved.

   * - | ``notifications``
       | ``.mobileNumber``
     - string
     - Mobile number to which alert notifications are sent. Set this
       value if ``"notifications.typeName" : "SMS"``.

   * - | ``notifications``
       | ``.opsGenieApiKey``
     - string
     - Opsgenie |api| Key. Set this value if ``"notifications.typeName"
       : "OPS_GENIE"``.

   * - | ``notifications``
       | ``.opsGenieRegion``
     - string
     - Region that indicates which |api| |url| to use. Set this value
       if ``"notifications.typeName" : "OPS_GENIE"``.

   * - | ``notifications``
       | ``.orgName``
     - string
     - Name of the Flowdock organization. Returned if
       ``"notifications.typeName" : "FLOWDOCK"``.

   * - | ``notifications``
       | ``.roles``
     - array of strings
     - |service| role in current Project or Organization. Returned if
       ``"notifications.typeName" : "ORG"`` or ``GROUP``.

   * - | ``notifications``
       | ``.serviceKey``
     - string
     - PagerDuty service key. Returned if ``"notifications.typeName" :
       "PAGER_DUTY"``.

   * - | ``notifications``
       | ``.smsEnabled``
     - boolean
     - Flag indicating text notifications must be sent. Returned if
       ``"notifications.typeName" : "ORG"``, ``GROUP``, or ``USER``.

   * - | ``notifications``
       | ``.teamId``
     - string
     - Unique identifier of a team.

   * - | ``notifications``
       | ``.typeName``
     - string
     - Type of alert notification.

   * - | ``notifications``
       | ``.username``
     - string
     - Name of |a-service| user to which to send notifications.
       Returned if ``"notifications.typeName" : "USER"``.

   * - ``threshold``
     - object
     - Threshold that triggers an alert. Returned if ``eventTypeName``
       is any value other than ``OUTSIDE_METRIC_THRESHOLD``.

   * - | ``threshold``
       | ``.operator``
     - string
     - Operator to apply when checking the current metric value
       against the threshold value.

   * - | ``threshold``
       | ``.threshold``
     - number
     - Threshold value outside of which an alert is triggered.

   * - ``typeName``
     - string
     - *This field is deprecated and is ignored.*

   * - ``updated``
     - string
     - |iso8601-time| when this alert configuration was last updated.
