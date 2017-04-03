.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - Name
     - Type
     - Description
   * - ``id``
     - string
     - Unique identifier.
   * - ``groupId``
     - string
     - ID of the group that this alert was opened for.
   * - ``alertConfigId``
     - string
     - ID of the alert configuration that triggered this alert.

   * - ``eventTypeName``
     - string
     - The name of the event that triggered the alert.

       .. include:: /includes/extracts/possibleValues-api-eventTypeName.rst

   * - ``typeName``
     - string
     - *This field is deprecated and will be ignored.*

   * - ``status``
     - string
     - The current state of the alert. Possible values are:

       - ``TRACKING``

         The alert condition exists but has not persisted beyond the defined
         notification delay. For details, see :ref:`api-alert-status`.

       - ``OPEN``
       - ``CLOSED``
       - ``CANCELLED``

   * - ``acknowledgedUntil``
     - date
     - The date through which the alert has been acknowledged. Will not be
       present if the alert has never been acknowledged.
   * - ``acknowledgementComment``
     - string
     - The comment left by the user who acknowledged the alert. Will not be
       present if the alert has never been acknowledged.
   * - ``acknowledgingUsername``
     - string
     - The username of the user who acknowledged the alert. Will not be
       present if the alert has never been acknowledged.
   * - ``created``
     - date
     - When the alert was opened.
   * - ``updated``
     - date
     - When the alert was last updated.
   * - ``resolved``
     - date
     - When the alert was closed. Only present if the status is ``CLOSED``.
   * - ``lastNotified``
     - date
     - When the last notification was sent for this alert. Only present if
       notifications have been sent.
   * - ``hostnameAndPort``
     - string
     - The hostname and port of each host to which the alert applies. Only
       present for alerts of type ``HOST``, ``HOST_METRIC``, and
       ``REPLICA_SET``.

   * - ``hostId``
     - string
     - ID of the host to which the metric pertains. Only present for
       alerts of type ``HOST``, ``HOST_METRIC``, and ``REPLICA_SET``.

   * - ``replicaSetName``
     - string
     - Name of the replica set. Only present for alerts of type ``HOST``,
       ``HOST_METRIC``, ``BACKUP``, and ``REPLICA_SET``.

   * - ``metricName``
     - string
     - The name of the measurement whose value went outside the threshold. Only
       present if ``eventTypeName`` is set to ``OUTSIDE_METRIC_THRESHOLD``.

       For possible values, see below.

   * - ``currentValue``
     - object
     - The current value of the metric that triggered the alert. Only present for
       alerts of type ``HOST_METRIC``.
   * - ``currentValue.number``
     - number
     - The value of the metric.
   * - ``currentValue.units``
     - string
     - The units for the value. Depends on the type of metric. For example, a
       metric that measures memory consumption would have a byte measurement,
       while a metric that measures time would have a time unit. Possible values
       are:

       .. include:: /includes/possibleValues-api-units.rst

   * - ``clusterId``
     - string
     - The ID of the cluster to which this alert applies. Only present for
       alerts of type ``BACKUP``, ``REPLICA_SET``, and ``CLUSTER``.

   * - ``clusterName``
     - string
     - The name the cluster to which this alert applies. Only present for
       alerts of type ``BACKUP``, ``REPLICA_SET``, and ``CLUSTER``.

   * - ``sourceTypeName``
     - string
     - For alerts of the type ``BACKUP``, the type of server being backed
       up. Possible values are:

       - ``REPLICA_SET``
       - ``SHARDED_CLUSTER``
       - ``CONFIG_SERVER``
