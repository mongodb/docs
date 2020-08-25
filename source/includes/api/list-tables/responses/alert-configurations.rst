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

   * - created
     - string
     - |iso8601-time| when this alert configuration was created.

   * - enabled
     - boolean
     - Flag indicating this alert configuration enabled.

   * - eventTypeName
     - string
     - Type of event that triggers an alert.

   * - groupId
     - string
     - Unique identifier of the Project that owns this alert
       configuration.

   * - id
     - string
     - Unique identifier of the alert configuration.

   * - links
     - array of objects
     - .. include:: /includes/links-explanation.rst

   * - matchers
     - array of objects
     - Rules to apply when matching an object against this alert
       configuration.

   * - | matchers
       | .[n].fieldName
     - string
     - Name of the field in the target object that you wanted this
       configuration to match.

   * - | matchers
       | .[n].operator
     - string
     - Comparison operator to apply when checking the current metric
       value against **matcher.[n].value**.

   * - | matchers
       | .[n].value
     - string
     - Value to match or exceed using **matchers.[n].operator**.

   * - metricThreshold
     - object
     - Value and means of comparison that triggers an alert.

   * - | metricThreshold
       | .metricName
     - string
     - Name of the metric to check. Supports the same values as
       the **metricName** field of the **alerts** resource.

   * - | metricThreshold
       | .mode
     - string
     - Average value of this metric.

   * - | metricThreshold
       | .operator
     - string
     - Comparison operator that |service| applied when checking the
       current metric value against the threshold value.

   * - | metricThreshold
       | .threshold
     - number
     - Value of **metricThreshold.metricName** that, when exceeded,
       triggers an alert.

   * - | metricThreshold
       | .units
     - string
     - Units of capacity or time that define the scope of the
       **metricThreshold.threshold**.

   * - notifications
     - array of objects
     - One or more targets for |service| to send notifications when an
       alert condition is detected.

   * - | notifications.[n]
       | .apiToken
     - string
     - Slack API token token. |service| returns this value if you set
       **notifications.[n].typeName** to **SLACK**.

   * - | notifications.[n]
       | .channelName
     - string
     - Slack channel name. |service| returns this value if you set
       **notifications.[n].typeName** to **SLACK**.

   * - | notifications.[n]
       | .datadogApiKey
     - string
     - DataDog API Key. |service| returns this value if you set
       **notifications.[n].typeName** to **DATADOG**.

   * - | notifications.[n]
       | .datadogRegion
     - string
     - Region that indicates which |api| |url| to use.

   * - | notifications.[n]
       | .delayMin
     - number
     - Number of minutes to wait after an alert condition is detected
       before sending out the first notification.

   * - | notifications.[n]
       | .emailAddress
     - string
     - Email address to which to send notification. |service| returns
       this value if you set **notifications.[n].typeName** to
       **EMAIL**.

   * - | notifications.[n]
       | .emailEnabled
     - boolean
     - Flag indicating email notifications must be sent. |service|
       returns this value if you set **notifications.[n].typeName** to
       **ORG**, **GROUP**, or **USER**.

   * - | notifications.[n]
       | .flowdockApiToken
     - string
     - Flowdock personal |api| token. |service| returns this value if
       you set **notifications.[n].typeName** to **FLOWDOCK**.

   * - | notifications.[n]
       | .flowName
     - string
     - Name of the Flowdock flow. |service| returns this value if
       you set **notifications.[n].typeName** to **FLOWDOCK**.

   * - | notifications.[n]
       | .intervalMin
     - number
     - Number of minutes to wait between successive notifications
       for unacknowledged alerts that are not resolved.

   * - | notifications.[n]
       | .mobileNumber
     - string
     - Mobile number to which alert notifications are sent. |service|
       returns this value if you set **notifications.[n].typeName** to
       **SMS**.

   * - | notifications.[n]
       | .notificationToken
     - string
     - HipChat API token. |service| returns this value if you set
       **notifications.[n].typeName** to **HIP_CHAT**.

       .. include:: /includes/api/facts/invalid-integration-api-token.rst

   * - | notifications.[n]
       | .opsGenieApiKey
     - string
     - Opsgenie |api| Key. |service| returns this value if
       you set **notifications.[n].typeName** to **OPS_GENIE**.

   * - | notifications.[n]
       | .opsGenieRegion
     - string
     - Region that indicates which |api| |url| to use. |service| returns
       this value if you set **notifications.[n].typeName** to
       **OPS_GENIE**.

   * - | notifications.[n]
       | .orgName
     - string
     - Name of the Flowdock organization. |service| returns this value
       if you set **notifications.[n].typeName** to **FLOWDOCK**.

   * - | notifications.[n]
       | .roles
     - array of strings
     - |service| role in current Project or Organization. |service|
       returns this value if you set **notifications.[n].typeName** to
       **ORG** or **GROUP**.

   * - | notifications.[n]
       | .roomName
     - string
     - HipChat room name. |service| returns this value if
       **"notifications.typeName" : "HIP_CHAT**.

   * - | notifications.[n]
       | .serviceKey
     - string
     - PagerDuty service key. |service| returns this value if
       you set **notifications.[n].typeName** to **PAGER_DUTY**.

   * - | notifications.[n]
       | .severity
     - string
     - Degree of seriousness of this notification.

   * - | notifications.[n]
       | .smsEnabled
     - boolean
     - Flag indicating text notifications must be sent. |service|
       returns this value if you set **notifications.[n].typeName** to
       **ORG**, **GROUP**, or **USER**.

   * - | notifications.[n]
       | .teamId
     - string
     - Unique identifier of the team that receives this notification.

   * - | notifications.[n]
       | .teamName
     - string
     - Label for the team that receives this notification.

   * - | notifications.[n]
       | .typeName
     - string
     - Means by which you want |service| to send you notification of an
       alert.

   * - | notifications.[n]
       | .username
     - string
     - Name of |a-service| user to which to send notifications.
       |service| returns this value if you set
       **notifications.[n].typeName** to **USER**.

   * - | notifications.[n]
       | .victorOpsApiKey
     - string
     - VictorOps |api| key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       |service| returns this value if you set
       **notifications.[n].typeName** to **VICTOR_OPS**.

   * - | notifications.[n]
       | .victorOpsRoutingKey
     - string
     - VictorOps routing key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       |service| returns this value if you set
       **notifications.[n].typeName** to **VICTOR_OPS**.

   * - threshold
     - object
     - Threshold that triggers an alert. |service| returns this value if
       **eventTypeName** is any value other than
       **OUTSIDE_METRIC_THRESHOLD**.

   * - | threshold
       | .operator
     - string
     - Comparison operator that |service| applied when checking the
       current metric value against the threshold value.

   * - | threshold
       | .threshold
     - number
     - Value that, when exceeded, |service| triggers an alert.

   * - | threshold
       | .units
     - string
     - Units of capacity or time that define the scope of the
       **threshold.threshold**.

   * - typeName
     - string
     - *This field is deprecated and is ignored.*

   * - updated
     - string
     - |iso8601-time| when this alert configuration was last updated.
