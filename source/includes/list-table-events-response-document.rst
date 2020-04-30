.. list-table::
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``alertId``
     - string
     - Unique identifier for the alert associated with the event.

   * - ``alertConfigId``
     - string
     - Unique identifier for the alert configuration associated with the
       ``alertId``.

   * - ``apiKeyId``
     - string
     - Unique identifier for the API Key
       that triggered the event. If this field is
       present in the response, the command does not return the
       ``userId`` field.

   * - ``collection``
     - string
     - Name of the collection on which the event occurred. This field
       can be present when the ``eventTypeName`` is either
       ``DATA_EXPLORER`` or ``DATA_EXPLORER_CRUD``.

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

   * - ``database``
     - string
     - Name of the database on which the event occurred. This field
       can be present when the ``eventTypeName`` is either
       ``DATA_EXPLORER`` or ``DATA_EXPLORER_CRUD``.

   * - ``eventTypeName``
     - string
     - The type of event.

       Possible values are:

       .. include:: /includes/possibleValues-eventTypeName.rst

   * - ``groupId``
     - string
     - The unique identifier for the project in which the event
       occurred.

   * - ``hostname``
     - string
     - The hostname of the host machine associated with the
       event.

   * - ``id``
     - string
     - The unique identifier for the event.

   * - ``invoiceId``
     - string
     - The unique identifier of the invoice associated with the event.

   * - ``isGlobalAdmin``
     - boolean
     - Indicates whether the user who triggered the event is a
       MongoDB employee.

   * - ``links``
     - array
     - .. include:: /includes/links-explanation.rst

   * - ``metricName``
     - string
     - The name of the metric associated with the ``alertId``.

   * - ``opType``
     - string
     - Type of operation that occurred. This field is present when the
       ``eventTypeName`` is either ``DATA_EXPLORER`` or
       ``DATA_EXPLORER_CRUD``.

   * - ``orgId``
     - string
     - The unique identifier for the organization in which the
       event occurred.

   * - ``paymentId``
     - string
     - The unique identifier of the invoice payment associated with the
       event.

   * - ``port``
     - int
     - The port on which the :manual:`mongod </reference/program/mongod/#bin.mongod>` or
       :manual:`mongos </reference/program/mongos/#bin.mongos>` listens.

   * - ``publicKey``
     - string
     - Public key associated with the API Key
       that triggered the event. If this field
       is present in the response, the command does not return the
       ``username`` field.

   * - ``remoteAddress``
     - string
     - IP address of the ``userId`` user who triggered the
       event.

   * - ``replicaSetName``
     - string
     - The name of the replica set associated with the event.

   * - ``shardName``
     - string
     - The name of the shard associated with the event.

   * - ``targetPublicKey``
     - string
     - The public key of the API Key targeted by the event.

   * - ``targetUsername``
     - string
     - The username for the user targeted by the
       event.

   * - ``teamId``
     - string
     - The unique identifier for the team associated with the
       event.

   * - ``userId``
     - string
     - The unique identifier for the user who triggered the
       event. If this field is present in the response,
       does not return the ``apiKeyId`` field.

   * - ``username``
     - string
     - The username for the user who triggered the event.
       If this field is present in the response,
       the command does not return the ``publicKey`` field.

   * - ``whitelistEntry``
     - string
     - The whitelist entry of the API Key targeted by the event.

   * - ``totalCount``
     - number
     - The number of events returned.
