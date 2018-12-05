.. list-table::
   :widths: 30 70

   * - :guilabel:`Hostname`

     - The hostname of the machine where the ``mongod`` instance is
       running.

   * - :guilabel:`Port`
     - The port on which ``mongod`` is running.

   * - :guilabel:`Authentication`

     - .. include:: /includes/fact-connect-auth-info.rst

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
