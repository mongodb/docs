.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

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

   * - apiKeyId
     - string
     - Unique identifier for the :ref:`API Key <mms-prog-api-key>`
       that triggered this event.

       If this field is present in the response, |mms| does not return
       the ``userId`` field.

   * - clusterId
     - string
     - ID of the cluster to which this event applies.

   * - clusterName
     - string
     - Name of the cluster to which this event applies.

   * - collection
     - string
     - Name of the collection on which the event occurred. This field
       can be present when the ``eventTypeName`` is either
       ``DATA_EXPLORER`` or ``DATA_EXPLORER_CRUD``.

   * - created
     - string
     - |iso8601-time| when this event was triggered.

   * - currentValue
     - object
     - Current value of the metric that triggered this event.

   * - | currentValue
       | .number
     - number
     - Value of the metric.

   * - | currentValue
       | .units
     - string
     - Relevant units for the value.

       .. example::
          A metric that measures memory consumption would have a byte measurement, while a metric that measures time would have a time unit.

       Accepted values are:

       .. include:: /includes/possibleValues-api-units.rst

   * - database
     - string
     - Name of the database on which the event occurred. This field
       can be present when the ``eventTypeName`` is either
       ``DATA_EXPLORER`` or ``DATA_EXPLORER_CRUD``.

   * - eventTypeName
     - string
     - Name of the circumstance that triggered this event.

       .. include:: /includes/api/facts/event-type-values.rst

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

   * - invoiceId
     - string
     - Unique identifier of the invoice associated with this event.

   * - isGlobalAdmin
     - boolean
     - Flag indicating whether the user who triggered this event is a
       MongoDB employee.

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - metricName
     - string
     - Name of the measurement whose value went outside the threshold.

       For possible values, see below.

   * - opType
     - string
     - Type of operation that generated the event. This field is
       present when the ``eventTypeName`` is either ``DATA_EXPLORER``
       or ``DATA_EXPLORER_CRUD``.

   * - paymentId
     - string
     - Unique identifier of the invoice payment associated with this
       event.

   * - port
     - integer
     - Port of the host associated with this event.

   * - publicKey
     - string
     - Public key associated with the
       :ref:`API Key <mms-prog-api-key>` that triggered this event.

       If this field is present in the response, |mms| does not return
       the ``username`` field.

   * - raw
     - document
     - Additional meta information about the event. This field only
       appears when the ``includeRaw`` query parameter is ``true``.

       .. important::

          The values in the ``raw`` document are subject to change. Do
          not rely on ``raw`` values for formal monitoring.

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

   * - targetPublicKey
     - string
     - Public key of the API Key targeted by the event.

   * - targetUsername
     - string
     - Username for the |mms| user targeted by this event.

   * - teamId
     - string
     - Unique identifier for the |mms| team associated with this event.

   * - userId
     - string
     - Unique identifier for the |mms| user who triggered this
       event.

       If this field is present in the response, |mms| does not
       return the ``apiKeyId`` field.

   * - username
     - string
     - Username for the |mms| user who triggered this event.

       If this field is present in the response, |mms| does not return
       ``publicKey`` field.

   * - whitelistEntry
     - string
     - Whitelist entry of the API Key targeted by the event.

