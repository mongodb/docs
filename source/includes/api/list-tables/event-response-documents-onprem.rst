.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - alertId
     - string
     - Unique identifier for the alert associated with this event.

   * - alertConfigId
     - string
     - Unique identifier for the alert configuration associated with
       the ``alertId``.

   * - clusterId
     - string
     - ID of the cluster to which this event applies.

   * - clusterName
     - string
     - Name of the cluster to which this event applies.

   * - created
     - string
     - |iso8601-time| when this event was triggered.

   * - currentValue
     - object
     - Current value of the metric that triggered this event.

   * - currentValue.number
     - number
     - Value of the metric.

   * - currentValue.units
     - string
     - Relevant units for the value.

       .. example::
          A metric that measures memory consumption would have a byte measurement, while a metric that measures time would have a time unit.

       Accepted values are:

       .. include:: /includes/possibleValues-api-units.rst

   * - eventTypeName
     - string
     - Name of the circumstance that triggered this event.
       Accepted values are:

       .. include:: /includes/extracts/possibleValues-api-eventTypeName.rst

   * - groupId
     - string
     - ID of the project in which this event occurred.

   * - hostId
     - string
     - ID of the host on which this event occurred.

   * - hostname
     - string
     - Hostname, |fqdn|, |ipv4| address, or |ipv6| address of the host
       on which this event occurred.

   * - id
     - string
     - Unique identifier for this event.

   * - isGlobalAdmin
     - boolean
     - Flag indicating whether the user who triggered this event has
       the :authrole:`Global Monitoring Administrator` role.

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - metricName
     - string
     - Name of the measurement whose value went outside the threshold.

       For possible values, see below.

   * - port
     - integer
     - Port of the host associated with this event.

   * - remoteAddress
     - string
     - IP address associated with the |mms| user (userId) who
       triggered the event.

   * - replicaSetName
     - string
     - Name of the replica set.

   * - shardName
     - string
     - The name of the shard associated with the event.

   * - targetUsername
     - string
     - Username for the |mms| user targeted by this event.

   * - teamId
     - string
     - Unique identifier for the |mms| team associated with this event.

   * - userId
     - string
     - Unique identifier for the |mms| user who triggered this event.

   * - username
     - string
     - Username for the |mms| user who triggered this event.

