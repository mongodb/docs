The **replicaSets** array defines each replica set's configuration.
This field is required for deployments with replica sets.

.. code-block:: json
   :linenos:

   "replicaSets":
   [
     {
       "_id": "<string>",
       "protocolVersion": "<string>",
       "members":
       [
         {
           "_id": "<integer>",
           "host": "<string>",
           "arbiterOnly": "<boolean>",
           "buildIndexes": "<boolean>",
           "hidden": "<boolean>",
           "priority": "<number>",
           "tags": "<object>",
           "secondaryDelaySecs": "<integer>",
           "votes": "<number>"
         },{
           "_id": "<integer>",
           "host": "<string>",
           "arbiterOnly": "<boolean>",
           "buildIndexes": "<boolean>",
           "hidden": "<boolean>",
           "priority": "<number>",
           "tags": "<object>",
           "secondaryDelaySecs": "<integer>",
           "votes": "<number>"
         },{
           "_id": "<integer>",
           "host": "<string>",
           "arbiterOnly": "<boolean>",
           "buildIndexes": "<boolean>",
           "hidden": "<boolean>",
           "priority": "<number>",
           "tags": "<object>",
           "secondaryDelaySecs": "<integer>",
           "votes": "<number>"
         }
       ],
       "force":
       {
         "currentVersion": "<integer>"
       }
     }
   ]

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - replicaSets
     - array
     - Optional
     - Configuration of each
       :manual:`replica set </reference/glossary/#std-term-replica-set>`. The {+mdbagent+} uses the values in this
       array to create valid :manual:`replica set configuration
       documents </reference/replica-configuration>`. The agent
       regularly checks that replica sets are configured correctly.
       If a problem occurs, the agent reconfigures the replica set
       according to its configuration document. The array can
       contain the following top-level fields from a replica set
       configuration document: **_id**; **version**; and
       **members**.

       To learn more, see :manual:`replSetGetConfig </reference/command/replSetGetConfig>`.

   * - replicaSets[n]._id
     - string
     - Required
     - The name of the replica set.

   * - replicaSets[n].protocolVersion
     - string
     - Optional
     - :manual:`Protocol version </reference/replica-set-protocol-versions>`
       of the replica set.

   * - replicaSets[n].members
     - array
     - Optional
     - Objects that define each member of the replica set. The
       **members.host** field must specify the host

       To learn more, see :manual:`replSetGetConfig </reference/command/replSetGetConfig>` and :manual:`replSetGetConfig </reference/command/replSetGetConfig>`.

   * - replicaSets[n].members[m]._id
     - integer
     - Required
     - Any positive integer that indicates the member of the replica
       set.

   * - replicaSets[n].members[m].host
     - string
     - Optional
     - Hostname, and port number when applicable, that serves this
       replica set member.

   * - replicaSets[n].members[m].arbiterOnly
     - boolean
     - Optional
     - Flag that indicates whether this replica set member acts as an
       arbiter.

   * - replicaSets[n].members[m].buildIndexes
     - boolean
     - Optional
     - Flag that indicates whether the |mongod| process builds indexes
       on this replica set member.

   * - replicaSets[n].members[m].hidden
     - boolean
     - Optional
     - Flag that indicates whether the replica set allows this member to
       accept read operations.

   * - replicaSets[n].members[m].priority
     - number
     - Optional
     - Relative eligibility for |mms| to select this replica set member
       as a primary. Larger number increase eligibility. This value can
       be between 0 and 1000, inclusive for data-bearing nodes.
       Arbiters can have values of 0 or 1.

   * - replicaSets[n].members[m].tags
     - object
     - Optional
     - List of user-defined labels and their values applied to this
       replica set member.

   * - replicaSets[n].members[m].secondaryDelaySecs
     - integer
     - Optional
     - Amount of time in seconds that this replica set memberr should
       lag behind the primary.

   * - replicaSets[n].members[m].votes
     - number
     - Optional
     - Quantity of votes this replica set member can cast for a replica
       set election. All data bearing nodes can have 0 or 1 votes.
       Arbiters always have 1 vote.

   * - replicaSets[n].force
     - object
     - Optional
     - Instructions to the {+mdbagent+} to force a replica set to use
       the :ref:`automation-config-api-config-version` specified in
       **replicaSets.force.CurrentVersion**.

       With this object, the {+mdbagent+} can force a replica set to
       accept a new configuration to recover from a state in which a
       minority of its members are available.

   * - replicaSets[n].force.currentVersion
     - integer
     - Optional
     - :ref:`automation-config-api-config-version` that the
       {+mdbagent+} forces the replica set to use. Set to **-1** to
       force a replica set to accept a new configuration.

       :red:`WARNING:` Forcing a replica set reconfiguration might lead
       to a :term:`rollback` of majority-committed writes. Proceed with caution. Contact |mdb-support| if you have
       questions about the potential impacts of this operation.
