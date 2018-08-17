.. list-table::
   :widths: 30 70

   * - :guilabel:`Hostname`

     - The hostname of the machine where the ``mongod`` instance is
       running.

       .. tip::

          Starting with version 1.8.0, MongoDB Compass can detect
          whether you have a MongoDB
          :manual:`URI connection string </reference/connection-string>`
          in your system clipboard and auto-populate the connection
          dialog from the URI. Open MongoDB Compass with a URI
          connection string in your clipboard and click :guilabel:`Yes`
          when prompted to auto-populate the dialog.

   * - :guilabel:`Port`
     - The port on which ``mongod`` is running.

   * - :guilabel:`Authentication`

     - The authentication to use if the ``mongod`` instance
       requires authentication. Select:

       - :guilabel:`Username / Password` if the ``mongod`` instance
         uses either MongoDB-CR or SCRAM-SHA-1 as its
         authentication mechanism.

       - :guilabel:`X.509` if the ``mongod`` instance uses
         X.509 as its authentication mechanism.

         *Not Available in Compass Community Edition*

       - :guilabel:`Kerberos` if the ``mongod`` instance uses
         Kerberos as its authentication mechanism.

         *Not Available in Compass Community Edition*

       - :guilabel:`LDAP` if the ``mongod`` instance uses LDAP as
         its authentication mechanism.

         *Not Available in Compass Community Edition*

       For MongoDB access required, see :ref:`required-access`.

   * - :guilabel:`Replica Set Name`

     - The name of the MongoDB replica set to which you want to connect.

   * - :guilabel:`Read Preference`

     - Specifies how Compass directs read operations. Options are
       ``Primary``, ``Primary Preferred``, ``Secondary``,
       ``Secondary Preferred``, and ``Nearest``. See `Read Preference <https://docs.mongodb.com/manual/core/read-preference/>`_.

   * - :guilabel:`Favorite Name`

     - *Optional*. A name for the connection. To save the current
       connection entered as a favorite connection, enter a name
       in the input and click :guilabel:`Create Favorite`. For more
       information on favorite connections, see the
       :ref:`Favorite Connections <favorite-connections>`
       documentation.

       .. note::

          The :guilabel:`Create Favorite` button only appears once
          you have entered text into the :guilabel:`Favorite Name`
          input.

          Although you can save multiple connections with the same
          :guilabel:`Favorite Name`, it is recommended to use
          unique names for each connection to easily find your
          desired connections.
