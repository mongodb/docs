.. option:: --mongo-versionCompatibility <version-number>

   
   Restricts :program:`mongosqld` to using features that the specified version of
   MongoDB supports. Only necessary when used with replica sets in which
   members use different MongoDB versions or when performing a rolling
   upgrade of MongoDB. Only supports MongoDB version 3.2 or later.
   
   For example, if your replica set contains members running MongoDB
   3.2 and other members running MongoDB 3.4, set the following
   option to restrict :program:`mongosqld` to only use features
   supported by MongoDB 3.2:
   
   .. code-block:: sh
   
      mongosqld --mongo-versionCompatibility 3.2

