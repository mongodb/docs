.. option:: --host <hostname><:port>, -h <hostname><:port>

   *Default*: localhost:27017

   Specifies a resolvable hostname for the :binary:`~bin.mongod` to which to
   connect. By default, the :program:`mongodrdl` attempts to connect to a MongoDB
   instance running on the localhost on port number ``27017``.
   
   To connect to a replica set, specify the
   :setting:`~replication.replSetName` and a seed list of set members, as in
   the following:
   
   .. code-block:: none
   
      <replSetName>/<hostname1><:port>,<hostname2><:port>,<...>
   
   You can always connect directly to a single MongoDB instance by
   specifying the host and port number directly.

