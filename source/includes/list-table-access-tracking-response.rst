.. list-table::
   :header-rows: 1
   :widths: 25 15 60

   * - Name
     - Type
     - Description

   * - ``accessLogs``
     - object array
     - The authentication attempts made against the cluster. Each
       object is a separate attempt.

   * - ``authResult``
     - boolean
     - The result of the authentication attempt. Returns ``true`` if
       the authentication request was successful. Returns ``false`` if
       the authentication request resulted in failure.

   * - ``authSource``
     - string
     - The database that the request attempted to authenticate against.
       Returns ``admin`` if the authentication source for the user is
       ``SCRAM-SHA``.
       Returns ``$external`` if the authentication source for the user is LDAP.

   * - ``failureReason``
     - string
     - The reason that the request failed to authenticate. Returns
       ``null`` if the authentication request was successful.

   * - ``groupId``
     - string
     - The unique identifier for the :ref:`project <group-id>`.

   * - ``hostname``
     - string
     - The hostname of the target node that received the authentication
       attempt.

   * - ``clusterName``
     - string
     - The name associated with the cluster.

   * - ``ipAddress``
     - string
     - The IP address that the authentication attempt originated from.

   * - ``logLine``
     - string
     - The text of the server log concerning the authentication
       attempt.

   * - ``timestamp``
     - string
     - The UTC timestamp of the authentication attempt.

   * - ``username``
     - string
     - The username that attempted to authenticate.
