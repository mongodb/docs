The following document provides a representation of a replica set
configuration document. The configuration of your replica set may
include only a subset of these settings:

.. code-block:: none

   {
     _id: <string>,
     version: <int>,
     members: [
       {
         _id: <int>,
         host: <string>,
         arbiterOnly: <boolean>,
         buildIndexes: <boolean>,
         hidden: <boolean>,
         priority: <number>,
         tags: <document>,
         slaveDelay: <int>,
         votes: <number>
       },
       ...
     ],
     settings: {
       getLastErrorDefaults : <document>,
       chainingAllowed : <boolean>,
       getLastErrorModes : <document>,
       heartbeatTimeoutSecs: <int>
     }
   }
