.. option:: --mongo-uri <uri>

   *Default*: mongodb://localhost:27017

   Specifies a MongoDB :ref:`connection string <mongodb-uri>` to connect to.
   
   The :option:`--mongo-uri` option supports the following options within the connection
   string:
   
   - :urioption:`~urioption.readPreference`
   - :urioption:`~urioption.readPreferenceTags`
   - :urioption:`~urioption.replicaSet`
   - ``connect``
   
   For more information on these URI options see
   :ref:`Read Preference Options <connections-read-preference>` and
   :ref:`Replica Set Option <replica-set-option>`.
   
   For options set in the Mongo URI not included in the list above, use the
   equivalent :program:`mongosqld` option. For the complete list of :program:`mongosqld` options,
   see :ref:`Command Line Options <mongosqld-command-line-options>`.
   
   .. note::
   
      Instead of specifying a :urioption:`username` and :urioption:`password` in
      your connection string, run :program:`mongosqld` with the :option:`--auth` option to
      direct :program:`mongosqld` to pass the authentication credentials provided by the
      SQL client to the MongoDB server.
   
      Similarly, instead of enabling :urioption:`ssl` in the connection string,
      run :program:`mongosqld` with :option:`--mongo-ssl <mongosqld --mongo-ssl>`.
   
   To disable automatic replica set server discovery logic and force a
   connection to the specified server, use the ``connect=direct``
   option.
   
   .. code-block:: shell
   
      mongosqld --mongo-uri "mongodb://<hostname>:<port>/?connect=direct"
   
   URI options not in the list above *nor* in the list of supported :program:`mongosqld`
   :ref:`options <mongosqld-command-line-options>` are not supported.

