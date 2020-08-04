.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``acknowledgedUntil``
     - string
     - |iso8601-time| through which the alert has been acknowledged. 
       |mms| presents this field if a user acknowledged this alert.

   * - ``acknowledgementComment``
     - string
     - Comment that the user who acknowledged this alert left.
       |mms| presents this field if a user acknowledged this alert.

   * - ``acknowledgingUsername``
     - string
     - |mms| username of the user who acknowledged the alert.
       |mms| presents this field if a user acknowledged this alert.

   * - ``alertConfigId``
     - string
     - Unique identifier of the global alert configuration that triggered this alert.

   * - ``clusterId``
     - string
     - Unique identifier of the cluster to which this alert 
       applies. |mms| returns this field for global 
       alerts in the categories of:
       
       - :ref:`backup <alerts-list-backup>`
       - :ref:`replica set <alerts-list-replica-set>`
       - :ref:`sharded cluster <alerts-list-cluster>`

   * - ``clusterName``
     - string
     - Name the cluster to which this alert applies. |mms| returns this field for global 
       alerts in the categories of:
       
       - :ref:`backup <alerts-list-backup>`
       - :ref:`replica set <alerts-list-replica-set>`
       - :ref:`sharded cluster <alerts-list-cluster>`

   * - ``created``
     - string
     - |iso8601-time| when the alert was created.

   * - ``currentValue``
     - object
     - Current value of the metric that triggered the alert.
       |mms| returns this field for global alerts in the category of
       :ref:`host <alerts-list-host>`.

   * - ``currentValue.number``
     - number
     - Current value of the metric.

   * - ``currentValue.units``
     - string
     - Units in which this value is expressed. Depends on the type of metric.

       .. example::
       
          - A metric that measures memory consumption would have a byte measurement
          - A metric that measures time would have a time unit.
          
       Possible values that can be returned include:

       .. include:: /includes/possibleValues-api-units.rst

   * - ``eventTypeName``
     - string
     - Name of the event that triggered the alert.

       .. include:: /includes/api/facts/event-type-values.rst

   * - ``groupId``
     - string
     - Unique identifier of the project for which this alert was opened.

   * - ``hostId``
     - string
     - Unique identifier of the host to which the metric pertains.
       |mms| returns this field for global alerts in the categories of:
       
       - :ref:`host <alerts-list-host>`
       - :ref:`replica set <alerts-list-replica-set>`

   * - ``hostnameAndPort``
     - string
     - Hostname and port of each host to which the alert applies. The
       hostname can be only a hostname, an |fqdn|, an |ipv4| address,
       or an |ipv6| address. |mms| returns this field for global alerts in
       the categories of:
       
       - :ref:`host <alerts-list-host>`
       - :ref:`replica set <alerts-list-replica-set>`

   * - ``id``
     - string
     - Unique identifier of the alert.

   * - ``lastNotified``
     - string
     - |iso8601-time| when the last notification was sent for this
       alert. |mms| displays this if |mms| sent notifications.

   * - ``metricName``
     - string
     - Name of the measurement whose value went outside the threshold.
       |mms| returns this field if ``"eventTypeName" : "OUTSIDE_METRIC_THRESHOLD"``.

       For possible values, see 
       :ref:`measurement-types-for-global-alerts-api`.

   * - ``replicaSetName``
     - string
     - Name of the replica set. |mms| returns this field for global 
       alerts in the categories of:
       
       - :ref:`host <alerts-list-host>`
       - :ref:`backup<alerts-list-backup>`
       - :ref:`replica set <alerts-list-replica-set>`

   * - ``resolved``
     - string
     - |iso8601-time| when the alert was closed. |mms| returns this field for global
       alerts when ``"status" : "CLOSED"``.

   * - ``sourceTypeName``
     - string
     - Type of host being backed up. |mms| returns this field for global alerts in
       the category of :ref:`backup <alerts-list-backup>`. Possible values that can
       be returned include:

       - ``REPLICA_SET``
       - ``SHARDED_CLUSTER``
       - ``CONFIG_SERVER``

   * - ``status``
     - string
     - Current state of the alert. Possible values that can be returned include:

       .. list-table::
          :widths: 20 80
          :stub-columns: 1

          * - ``TRACKING``
            - Alert conditions exist, but the condition hasn't
              persisted for long enough to trigger an alert.
          * - ``OPEN``
            - Alert is open.
          * - ``CLOSED``
            - Alert is closed.
          * - ``CANCELLED``
            - Alert is cancelled.

   * - ``tags``
     - array of strings
     - Tags associated with this alert.

   * - ``typeName``
     - string
     - *This field is deprecated and will be ignored.*

   * - ``updated``
     - string
     - |iso8601-time| when this alert was last updated.
