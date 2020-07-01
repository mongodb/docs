.. list-table::
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``id``
     - string
     - Unique identifier of the alert configuration.

   * - ``groupId``
     - string
     - Unique identifier of the project that owns this alert
       configuration.

   * - ``eventTypeName``
     - string
     - Type of event that triggers an alert.

       For a complete list of alert events, see :atlas:`Alert Conditions
       </reference/alert-conditions/>`.

   * - ``created``
     - string
     - |iso8601-time| when this alert configuration was created.

   * - ``updated``
     - string
     - |iso8601-time| when this alert configuration was last
       updated.

   * - ``enabled``
     - boolean
     - If set to ``true``, the alert configuration is enabled.

       If ``enabled`` is not specified in a ``POST`` command, it
       defaults to ``false``.

   * - ``matchers``
     - object array
     - Rules to apply when matching an object against this alert
       configuration. Only entities that match *all* these rules
       are checked for an alert condition.

       You can filter using the ``matchers`` array only when the
       ``eventTypeName`` specifies an event for a host, replica
       set, or sharded cluster.

   * - | ``matchers``
       | ``.fieldName``
     - string
     - Name of the field in the target object to match on.

       - Host alerts support these fields:

         - ``TYPE_NAME``
         - ``HOSTNAME``
         - ``PORT``
         - ``HOSTNAME_AND_PORT``
         - ``REPLICA_SET_NAME``

       - Replica set alerts support these fields:

         - ``REPLICA_SET_NAME``
         - ``SHARD_NAME``
         - ``CLUSTER_NAME``

       - Sharded cluster alerts support these fields:

         - ``CLUSTER_NAME``
         - ``SHARD_NAME``

       All other types of alerts do not support matchers.

   * - | ``matchers``
       | ``.operator``
     - string
     - Operator to test the field's value. Accepted values are:

       - ``EQUALS``
       - ``NOT_EQUALS``
       - ``CONTAINS``
       - ``NOT_CONTAINS``
       - ``STARTS_WITH``
       - ``ENDS_WITH``
       - ``REGEX``

   * - | ``matchers``
       | ``.value``
     - string
     - Value to test with the specified operator.

       If ``"matchers.fieldName" : "TYPE_NAME"``, you can match on
       the following values:

       - ``PRIMARY``
       - ``SECONDARY``
       - ``STANDALONE``
       - ``CONFIG``
       - ``MONGOS``

   * - ``metricThreshold``
     - object
     - Threshold that causes an alert to be triggered.
       Populated if ``"eventTypeName" :
       "OUTSIDE_METRIC_THRESHOLD"``.

   * - | ``metricThreshold``
       | ``.metricName``
     - string
     - The name of the metric whose value went outside the threshold. Only
       applicable if ``--event`` is ``OUTSIDE_METRIC_THRESHOLD``. Possible
       values are:

       .. include:: /includes/metricName-list.rst

   * - | ``metricThreshold``
       | ``.operator``
     - string
     - Operator to apply when checking the current metric value
       against the threshold value. Accepted values are:

       - ``GREATER_THAN``
       - ``LESS_THAN``

   * - | ``metricThreshold``
       | ``.threshold``
     - integer
     - Threshold value outside of which an alert will be triggered.

   * - | ``metricThreshold``
       | ``.units``
     - string
     - Units for the threshold value. Depends on the type of
       metric.

       .. example::

          A metric that measures memory consumption would have a
          byte measurement, while a metric that measures time would
          have a time unit.

       Accepted values are:

       .. include:: /includes/possibleValues-api-units.rst

   * - | ``metricThreshold``
       | ``.mode``
     - string
     - ``AVERAGE``. |service| computes the current metric value as
       an average.

   * - ``notifications``
     - object array
     - Notifications to send when an alert condition is detected.

   * - | ``notifications``
       | ``.typeName``
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
       - ``SMS```
       - ``USER``
       - ``VICTOR_OPS``

   * - | ``notifications``
       | ``.intervalMin``
     - integer
     - Number of minutes to wait between successive
       notifications for unacknowledged alerts that are not
       resolved.

   * - | ``notifications``
       | ``.delayMin``
     - integer
     - Number of minutes to wait after an alert condition is
       detected before sending out the first notification.

   * - | ``notifications``
       | ``.emailEnabled``
     - boolean
     - Flag indicating if email notifications should be sent.
       Returned with ``ORG``, ``GROUP``, and ``USER`` notifications
       types.

   * - | ``notifications``
       | ``.smsEnabled``
     - boolean
     - Flag indicating if text message notifications should be sent.
       Returned with ``ORG``, ``GROUP``, and ``USER`` notifications
       types.

   * - | ``notifications``
       | ``.username``
     - string
     - Name of the |service| user to which to send notifications.
       Only a user in the project that owns the alert configuration
       is allowed here. Returned with the ``USER`` notifications
       type.

   * - | ``notifications``
       | ``.roles``
     - array of strings
     - One or more project roles that receive
       the configured alert. Accepted values include:

       .. include:: /includes/project-roles-atlas.rst

   * - | ``notifications``
       | ``.teamId``
     - string
     - Unique identifier of a team.

   * - | ``notifications``
       | ``.emailAddress``
     - string
     - Email address to which alert notifications are sent.
       Returned with the ``EMAIL`` notifications type.

   * - | ``notifications``
       | ``.mobileNumber``
     - string
     - Mobile number to which alert notifications are sent.
       Returned with the ``SMS`` notifications type.

   * - | ``notifications``
       | ``.channelName``
     - string
     - Slack channel name.
       Returned with the ``SLACK`` notifications type.

   * - | ``notifications``
       | ``.apiToken``
     - string
     - Slack API token or Bot token.
       Returned with the ``SLACK`` notifications type.
       If the token later becomes invalid, |service| sends an email
       to the project owner and eventually removes the token.

   * - | ``notifications``
       | ``.orgName``
     - string
     - Flowdock organization name in lower-case letters. This is the
       name that appears after ``www.flowdock.com/app/`` in the URL
       string. Returned with the ``FLOWDOCK`` notifications type.

   * - | ``notifications``
       | ``.flowName``
     - string
     - Flowdock flow name in lower-case letters.
       The flow name appears after the
       organization name in the URL string:

       ``www.flowdock.com/app/<organization-name>/<flow-name>``.

       Returned with the ``FLOWDOCK`` notifications type.

   * - | ``notifications``
       | ``.flowdockApiToken``
     - string
     - Flowdock personal API token. Returned with the
       ``FLOWDOCK`` notifications type. If the token later becomes
       invalid, |service| sends an email to the project owner and
       eventually removes the token.

   * - | ``notifications``
       | ``.serviceKey``
     - string
     - PagerDuty service key. Returned with the ``PAGER_DUTY``
       notifications type. If the key later becomes invalid,
       |service| sends an email to the project owner and eventually
       removes the key.

   * - | ``notifications``
       | ``.victorOpsApiKey``
     - string
     - VictorOps API key.
       Returned with the ``VICTOR_OPS`` notifications type.
       If the key later becomes invalid, |service| sends an email
       to the project owner and eventually removes the key.

   * - | ``notifications``
       | ``.victorOpsRoutingKey``
     - string
     - VictorOps routing key.
       Returned with the ``VICTOR_OPS`` notifications type.
       If the key later becomes invalid, |service| sends an email
       to the project owner and eventually removes the key.

   * - | ``notifications``
       | ``.opsGenieApiKey``
     - string
     - Opsgenie API Key. Returned with the ``OPS_GENIE``
       notifications type. If the key later becomes invalid,
       |service| sends an email to the project owner and eventually
       removes the token.

   * - | ``notifications``
       | ``.opsGenieRegion``
     - string
     - Region that indicates which API URL to use. Accepted
       regions are:

       - ``US``

       - ``EU``

       The default Opsgenie region is ``US``.

   * - | ``notifications``
       | ``.datadogApiKey``
     - string
     - Datadog API Key. Found in the Datadog dashboard. Populated
       for the ``DATADOG`` notifications type.

   * - | ``notifications``
       | ``.datadogRegion``
     - string
     - Region that indicates which API URL to use. Accepted
       regions are:

       - ``US``

       - ``EU``

       The default Datadog region is ``US``.
