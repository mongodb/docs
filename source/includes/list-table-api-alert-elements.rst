.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``acknowledgedUntil``
     - string
     - |Epoch-time| when the alert has been acknowledged. Only
       displayed if the alert has never been acknowledged.

   * - ``acknowledgementComment``
     - string
     - Comment left by the user who acknowledged the alert. Only
       displayed if the alert has never been acknowledged.

   * - ``acknowledgingUsername``
     - string
     - Username of the user who acknowledged the alert. Only displayed
       if the alert has never been acknowledged.

   * - ``alertConfigId``
     - string
     - Unique identifier for the alert configuration that triggered
       this alert.

   * - ``clusterId``
     - string
     - unique identifier for the cluster to which this alert applies.
       Only displayed for alerts of type ``BACKUP``, ``REPLICA_SET``,
       and ``CLUSTER``.

   * - ``clusterName``
     - string
     - Name the cluster to which this alert applies. Only present
       for alerts of type ``BACKUP``, ``REPLICA_SET``, and ``CLUSTER``.

   * - ``created``
     - string
     - |Epoch-time| when the alert was opened.

   * - ``currentValue``
     - object
     - Current value of the metric that triggered the alert. Only
       present for alerts of type ``HOST_METRIC``.

   * - ``currentValue.number``
     - number
     - Value of the metric.

   * - ``currentValue.units``
     - string
     - Units for the value. Value depends on the type of metric.

       .. example::

          A metric that measures memory consumption would have a byte
          measurement, while a metric that measures time would have a
          time unit.

       Possible values are:

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
       Only displayed for alerts of type ``HOST``, ``HOST_METRIC``, and
       ``REPLICA_SET``.

   * - ``hostnameAndPort``
     - string
     - Hostname and port of each host to which the alert applies. This
       can be a hostname, an |fqdn|, an |ipv4| address, or an |ipv6|
       address. Only displayed for alerts of type ``HOST``,
       ``HOST_METRIC``, and ``REPLICA_SET``.

   * - ``id``
     - string
     - Unique identifier for this alert.

   * - ``lastNotified``
     - string
     - |Epoch-time| when the last notification was sent for this alert.
       Only displayed if notifications have been sent.

   * - ``links``
     - object array
     - This array includes one or more links to sub-resources
       and/or related resources. The relations between URLs are
       explained in the :rfc:`Web Linking Specification <5988>`.

   * - ``metricName``
     - string
     - Name of the measurement whose value went outside the
       threshold. Only displayed if ``eventTypeName`` is set to
       ``OUTSIDE_METRIC_THRESHOLD``.

       For possible values, see :ref:`measurement-types-for-alerts-api`.

   * - ``replicaSetName``
     - string
     - Name of the replica set. Only displayed for alerts of type
       ``HOST``, ``HOST_METRIC``, ``BACKUP``, and ``REPLICA_SET``.

   * - ``resolved``
     - string
     - |Epoch-time| when the alert was closed. Only displayed if the
       status is ``CLOSED``.

   * - ``status``
     - string
     - Current state of the alert. Possible values are:

       - ``TRACKING``

         The alert condition exists but has not persisted beyond the
         defined notification delay. For details, see
         :ref:`api-alert-status`.

       - ``OPEN``
       - ``CLOSED``
       - ``CANCELLED``

   * - ``sourceTypeName``
     - string
     - Type of server being backed up when alerts are ``"type" :
       "BACKUP"``. Possible values are:

       - ``REPLICA_SET``
       - ``SHARDED_CLUSTER``
       - ``CONFIG_SERVER``

   * - ``tags``
     - string array
     - Identifying labels set for this alert.

   * - ``typeName``
     - string
     - *This field is deprecated and will be ignored.*

   * - ``updated``
     - string
     - |Epoch-time| when the alert was last updated.
