.. tabs::

   .. tab:: Standard
      :tabid: standardString

      If you choose a standard connection string, include all members
      of the replica set in the |uri|. If you omit the port number,
      |onprem| uses the default **27017** port for all hosts.

      .. include:: /includes/tabsets/connstring/replset-standard-auth.rst

      .. note::

         |onprem| doesn't require the :ref:`replicaSet <replica-set-option>`
         option in the |uri|.

   .. tab:: DNS Seedlist
      :tabid: seedlistString

      .. versionadded:: {+onprem+} 4.4.0

      If you choose a |dns| seedlist connection string, include the
      |dns-srv| record that describes your database's backing instance
      replica set. The connection string uses the **mongodb+srv:**
      protocol, not the **mongodb:** protocol.

      .. include:: /includes/tabsets/connstring/replset-srv-auth.rst

      This option requires a |dns-srv| record for the application
      database. The |dns| entry uses the |dns| seedlist string format.
      Make sure |mms| can connect to this application database.

      .. seealso::

         :manual:`DNS Seedlist Connection Format </reference/connection-string/#dns-seedlist-connection-format>`

