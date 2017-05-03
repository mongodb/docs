The ``replicaSets`` array defines each replica set's configuration. This
field is required for deployments with replica sets. 

.. code-block:: cfg

   "replicaSets" : [
       {
           "_id" : <string>,
           "version" : <integer>
           "members" : [
               {
                   "_id" : <integer>,
                   "host" : <string>
               },
               ...
           ],
           "force" : {
               "currentVersion" : <integer>
           }
       },
       ...
   ]

.. list-table::
   :widths: 30 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``replicaSets``
     - array of objects
     - *Optional*. Objects that define the configuration of each
       :term:`replica set`. The Automation Agent uses the values in this
       array to create valid :manual:`replica set configuration documents
       </reference/replica-configuration>`. The agent regularly checks
       that replica sets are configured correctly. If a problem occurs,
       the agent reconfigures the replica set according to its
       configuration document. The array can contain the following
       top-level fields from a replica set configuration document:
       ``_id``; ``version``; and ``members``. For more information on the
       configuration documents, see :manual:`replSetGetConfig
       </reference/command/replSetGetConfig>` in the MongoDB manual.

   * - ``replicaSets._id``
     - string
     - The name of the replica set.

   * - ``replicaSets.version``
     - integer
     - The version of the replica set configuration.

   * - ``replicaSets.members``
     - array of objects
     - Objects that define each member of the replica set. The
       ``members.host`` field must specify the host's name as listed in
       ``processes.name``. The Automation Agent expands the ``host`` field
       to create a valid replica set configuration. For more information
       on ``members`` objects, see :manual:`replSetGetConfig
       </reference/command/replSetGetConfig>` in the MongoDB manual.

   * - ``replicaSets.force``
     - object
     - *Optional*. An object that contains the ``currentVersion`` field
       set to a version number. Automation will force a reconfiguration of
       the replica set if and only if the value of ``currentVersion``
       equals the current version of the replica set. You can use
       ``force`` to reconfigure a replica set that has lost members and
       can't reach a majority of votes.
