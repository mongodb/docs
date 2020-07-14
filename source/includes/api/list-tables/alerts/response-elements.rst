.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - | ``acknowledged``
       | ``Until``
     - string
     - |iso8601-time| until which the alert has been acknowledged.

       |mms| returns this value if the alert has been acknowledged.

   * - | ``acknowledgement``
       | ``Comment``
     - string
     - Comment left by the user who acknowledged the alert.

       |mms| returns this value if the alert has been acknowledged.

   * - | ``acknowledging``
       | ``Username``
     - string
     - Username of the user who acknowledged the alert.

       |mms| returns this value if the alert has been acknowledged.

   * - ``alertConfigId``
     - string
     - Unique identifier for the alert configuration that triggered
       this alert.

   * - ``clusterId``
     - string
     - Unique identifier for the cluster to which this alert applies.

       |mms| returns this value if ``"eventTypeName"`` was set to one
       of the following:

       - ``BACKUP``
       - ``REPLICA_SET``
       - ``CLUSTER``

   * - ``clusterName``
     - string
     - Name of the cluster to which this alert applies.

       |mms| returns this value if ``"eventTypeName"`` was set to one
       of the following:

       - ``BACKUP``
       - ``REPLICA_SET``
       - ``CLUSTER``
       - ``OUTSIDE_METRIC_THRESHOLD``

   * - ``created``
     - string
     - |iso8601-time| when the alert was opened.

   * - ``currentValue``
     - object
     - Current value of the metric that triggered the alert.

       |mms| returns this value if
       ``"eventTypeName" : "OUTSIDE_METRIC_THRESHOLD"``.

   * - | ``currentValue``
       | ``.number``
     - number
     - Value of the metric.

   * - | ``currentValue``
       | ``.units``
     - string
     - Units for the value. Value depends on the type of metric.

       .. example::

          A metric that measures memory consumption would have a byte
          measurement, while a metric that measures time would have a
          time unit.

       |mms| can return:

       .. include:: /includes/possibleValues-api-units.rst

   * - ``eventTypeName``
     - string
     - Name of the event that triggered the alert.

       .. include:: /includes/extracts/possibleValues-api-eventTypeName.rst

   * - ``groupId``
     - string
     - Unique identifier of the group for which this alert was opened.

   * - ``hostId``
     - string
     - unique identifier for the host to which the metric pertains.

       |mms| returns this value if ``"eventTypeName"`` was set to one
       of the following:

       - ``HOST_DOWN``
       - ``OUTSIDE_METRIC_THRESHOLD``
       - ``REPLICA_SET``

   * - ``hostnameAndPort``
     - string
     - Hostname and port of each host to which the alert applies. This
       can be a hostname, an |fqdn|, an |ipv4| address, or an |ipv6|
       address.

       |mms| returns this value if ``"eventTypeName"`` was set to one
       of the following:

       - ``HOST_DOWN``
       - ``OUTSIDE_METRIC_THRESHOLD``
       - ``REPLICA_SET``

   * - ``id``
     - string
     - Unique identifier for the alert.

   * - ``lastNotified``
     - string
     - |iso8601-time| when the last notification was sent for this
       alert. |mms| returns this value if notifications have been sent.

   * - ``links``
     - array of objects
     - .. include:: /includes/api/links-explanation.rst

   * - ``metricName``
     - string
     - Name of the measurement whose value went outside the
       threshold.

       |mms| returns this value if ``"eventTypeName"`` was set to
       ``OUTSIDE_METRIC_THRESHOLD``.

       For possible values, see :ref:`measurement-types-for-alerts-api`.

   * - ``replicaSetName``
     - string
     - Name of the replica set.

       |mms| returns this value if ``"eventTypeName"`` was set to one
       of the following:

       - ``BACKUP``
       - ``HOST_DOWN``
       - ``OUTSIDE_METRIC_THRESHOLD``
       - ``REPLICA_SET``

   * - ``resolved``
     - string
     - |iso8601-time| when the alert was closed.

       |mms| returns this value if ``"status" : "CLOSED"``.

   * - ``status``
     - string
     - Current state of the alert. |mms| can return one of the
       following:

       - ``TRACKING``

         The alert condition exists but has not persisted beyond the
         defined notification delay. For details, see
         :ref:`api-alert-status`.

       - ``OPEN``
       - ``CLOSED``
       - ``CANCELLED``

   * - ``sourceTypeName``
     - string
     - Type of host being backed up when ``"eventTypeName" :
       "BACKUP"``. |mms| can return one of the following:

       - ``REPLICA_SET``
       - ``SHARDED_CLUSTER``
       - ``CONFIG_SERVER``

   * - ``tags``
     - string array
     - Identifying labels set for this alert.

   * - ``typeName``
     - string
     - *Deprecated field. |mms| ignores it.*

   * - ``updated``
     - string
     - |iso8601-time| when the alert was last updated.
