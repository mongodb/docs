.. list-table::
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``id``
     - string
     - Specifies the unique identifier of the cluster.

   * - ``groupId``
     - string
     - Specifies the unique identifier of the project. 
      
       .. note::

          Groups and projects are synonymous terms. Your 
          {GROUP-ID} is the same as your project ID. 

   * - ``eventTypeName``
     - string
     - Type of event that will trigger an alert.

       .. include:: /includes/possibleValues-eventTypeName.rst

   * - ``created``
     - string
     - |iso8601-time| when this alert configuration was created.

   * - ``updated``
     - string
     - |iso8601-time| when this alert configuration was last updated.

   * - ``enabled``
     - boolean
     - If set to ``true``, the alert configuration is enabled.

   * - ``metricThreshold``
     - object
     - The threshold that causes an alert to be triggered.
       Populated if ``"eventTypeName" is
       "OUTSIDE_METRIC_THRESHOLD"``.

   * - ``metricThreshold.metricName``
     - string
     - Name of the metric against which |service| checks the
       configured ``metricThreshold.threshold``.

   * - ``metricThreshold.operator``
     - string
     - Operator to apply when checking the current metric value
       against the threshold value. Accepted values are:

       - ``GREATER_THAN``
       - ``LESS_THAN``

   * - ``metricThreshold.threshold``
     - integer
     - Threshold value outside of which an alert will be triggered.

   * - ``metricThreshold.units``
     - string
     - The units for the threshold value. Depends on the type of
       metric. 

       .. example::

          A metric that measures memory consumption would have a
          byte measurement, while a metric that measures time would
          have a time unit.

       Thresholds may use the following units:

       .. include:: /includes/possibleValues-api-units.rst

   * - ``metricThreshold.mode``
     - string
     - ``AVERAGE``. |service| computes the current metric value as
       an average.

   * - ``notifications``
     - object array
     - Notifications to send when an alert condition is detected.

   * - ``notifications.delayMin``
     - integer
     - Number of minutes to wait after an alert condition is
       detected before sending out the first notification.

   * - ``notifications.intervalMin``
     - integer
     - Number of minutes to wait between successive
       notifications for unacknowledged alerts that are not
       resolved.

   * - ``notifications.emailEnabled``
     - boolean
     - Flag indicating if email notifications should be sent.
       Populated for ``ORG``, ``GROUP``, and ``USER`` notifications
       types.

   * - ``notifications.smsEnabled``
     - boolean
     - Flag indicating if text message notifications should be sent.
       Populated for ``ORG``, ``GROUP``, and ``USER`` notifications
       types.

   * - ``notifications.typeName``
     - string
     - Type of alert notification. Accepted values are:

       - ``DATADOG``
       - ``EMAIL``
       - ``FLOWDOCK``
       - ``GROUP`` (Project)
       - ``OPS_GENIE``
       - ``ORG``
       - ``PAGER_DUTY``
       - ``SLACK``
       - ``SMS``
       - ``TEAM``
       - ``USER``
       - ``VICTOR_OPS``
       - ``WEBHOOK``

