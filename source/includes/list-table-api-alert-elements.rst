.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``acknowledgedUntil``
     - string
     - |iso8601-time| through which the alert has been acknowledged.
       Returned if the alert has been acknowledged.

   * - ``acknowledgementComment``
     - string
     - Comment left by the user who acknowledged the alert. Returned if
       the alert has been acknowledged.

   * - ``acknowledgingUsername``
     - string
     - Username of the user who acknowledged the alert. Returned if the
       alert has been acknowledged.

   * - ``alertConfigId``
     - string
     - Unique identifier of the alert configuration that triggered this
       alert.

   * - ``clusterName``
     - string
     - Name the cluster to which this alert applies.

   * - ``created``
     - string
     - |iso8601-time| when the alert was opened.

   * - ``currentValue``
     - object
     - Current value of the metric that triggered the alert.

   * - ``currentValue.number``
     - number
     - Value.

   * - ``currentValue.units``
     - string
     - Units for the value. Possible units are:

       .. include:: /includes/possibleValues-api-units.rst

   * - ``eventTypeName``
     - string
     - Name of the event that triggered the alert.

   * - ``id``
     - string
     - Unique identifier for the alert.

   * - ``groupId``
     - string
     - Unique identifier of the project that this alert was opened for.

   * - ``hostnameAndPort``
     - string
     - Hostname and port of the host to which the alert applies.

   * - ``lastNotified``
     - string
     - |iso8601-time| when the last notification was sent for this
       alert. Returned if notifications have been sent.

   * - ``metricName``
     - string
     - Name of the metric whose value went outside the threshold.

       Possible values are:

       .. include:: /includes/api/list-tables/options/alert-metrics.rst

   * - ``replicaSetName``
     - string
     - Name of the replica set, if applicable.

   * - ``resolved``
     - string
     - |iso8601-time| when the alert was closed. Returned if
       ``"status" : "CLOSED"``.

   * - ``status``
     - string
     - Current state of the alert. Possible values are:

       - ``TRACKING``

         Alert condition exists but hasn't persisted beyond the
         defined notification delay.

         .. seealso:: 
         
            :ref:`api-alert-status`.

       - ``OPEN``
       - ``CLOSED``
       - ``CANCELLED``

   * - ``updated``
     - string
     - |iso8601-time| when the alert was last updated.

