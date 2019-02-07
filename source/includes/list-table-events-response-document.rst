.. list-table::
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``alertId``
     - string
     - Unique identifier for the alert associated to the event.

   * - ``alertConfigId``
     - string
     - Unique identifier for the alert configuration associated to the
       ``alertId``.

   * - ``apiKeyId``
     - string
     - Unique identifier for the :ref:`API Key
       <atlas-app-api-key>` that triggered the event. If this field is
       present in the response, |service| does not return the
       ``userId`` field.

   * - ``created``
     - date
     - `ISO 8601-formatted <https://en.wikipedia.org/wiki/ISO_8601>`_
       UTC date when the event occurred.

   * - ``currentValue``
     - document
     - Describes the value of the ``metricName`` at the time of the
       event.

   * - ``currentValue.number``
     - int
     - The value of the ``metricName`` at the time of the event.

   * - ``currentValue.units``
     - string
     - The unit of measurement of the ``currentValue.number``.

       Possible values are:

       .. include:: /includes/possibleValues-api-units.rst

   * - ``eventTypeName``
     - string
     - The type of event.

       Possible values are:

       .. include:: /includes/possibleValues-api-eventTypeName.rst

   * - ``groupId``
     - string
     - The unique identifier for the project in which the event
       occurred.

   * - ``hostname``
     - string
     - The hostname of the |service| host machine associated to the
       event.

   * - ``id``
     - string
     - The unique identifier for the event.

   * - ``invoiceId``
     - string
     - The unique identifier of the invoice associated to the event.

   * - ``isGlobalAdmin``
     - boolean
     - Indicates whether the user who triggered the event is a
       MongoDB employee.

   * - ``links``
     - array
     - .. include:: /includes/links-explanation.rst

   * - ``metricName``
     - string
     - The name of the metric associated to the ``alertId``.

   * - ``orgId``
     - string
     - The unique identifier for the organization in which the
       event occurred.

   * - ``paymentId``
     - string
     - The unique identifier of the invoice payment associated to the
       event.

   * - ``port``
     - int
     - The port on which the :binary:`~bin.mongod` or
       :binary:`~bin.mongos` listens.

   * - ``publicKey``
     - string
     - Public key associated with the :ref:`API Key
       <atlas-app-api-key>` that triggered the event. If this field
       is present in the response, |service| does not return the
       ``username`` field.

   * - ``remoteAddress``
     - string
     - IP address of the ``userId`` |service| user who triggered the
       event.

   * - ``replicaSetName``
     - string
     - The name of the replica set associated to the event.

   * - ``shardName``
     - string
     - The name of the shard associated to the event.

   * - ``targetUsername``
     - string
     - The username for the |service| user targeted by the
       event.

   * - ``teamId``
     - string
     - The unique identifier for the |service| team associated to the
       event.

   * - ``userId``
     - string
     - The unique identifier for the |service| user who triggered the
       event. If this field is present in the response,
       |service| does not return the ``apiKeyId`` field.

   * - ``username``
     - string
     - The username for the |service| user who triggered the event.
       If this field is present in the response,
       |service| does not return the `publicKey`` field.

