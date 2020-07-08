The ``replicaSets`` array defines each replica set's configuration.
This field is required for deployments with replica sets.

.. code-block:: json

   "replicaSets": [{
     "_id": "<string>",
     "protocolVersion": "<integer>",
     "members": [{
       "_id": <integer>,
       "host": "<string>",
     "force": {
       "currentVersion": <integer>
     }]
   }]

.. list-table::
   :widths: 30 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``replicaSets``
     - object array
     - *Optional*. Objects that define the configuration of each
       :term:`replica set`. The {+aagent+} uses the values in this
       array to create valid :manual:`replica set configuration documents
       </reference/replica-configuration>`. The agent regularly checks
       that replica sets are configured correctly. If a problem occurs,
       the agent reconfigures the replica set according to its
       configuration document. The array can contain the following
       top-level fields from a replica set configuration document:
       ``_id``; ``version``; and ``members``. For more information on the
       configuration documents, see :manual:`replSetGetConfig
       </reference/command/replSetGetConfig>` in the MongoDB manual.

   * - | ``replicaSets``
       | ``._id``
     - string
     - The name of the replica set.

   * - | ``replicaSets``
       | ``.protocolVersion``
     - integer
     - The :manual:`protocol version </reference/replica-set-protocol-versions>`
       of the replica set.

   * - | ``replicaSets``
       | ``.members``
     - object array
     - Objects that define each member of the replica set. The
       ``members.host`` field must specify the host's name as listed in
       ``processes.name``. The {+aagent+} expands the ``host`` field
       to create a valid replica set configuration. For more information
       on ``members`` objects, see :manual:`replSetGetConfig
       </reference/command/replSetGetConfig>` in the MongoDB manual.

   * - | ``replicaSets``
       | ``.force``
     - object
     - Object that instructs the {+mdbagent+} to force a replica set 
       to use the :ref:`automation-config-api-config-version` specified
       in ``replicaSets.force.CurrentVersion``.

       With this object, the {+mdbagent+} can force a replica set to
       accept a new configuration to recover from a state in which a
       minority of its members are available.

   * - | ``replicaSets``
       | ``.force``
       | ``.currentVersion``
     - integer
     - The :ref:`automation-config-api-config-version` that the
       {+mdbagent+} forces the replica set to use. Set to ``-1`` to
       force a replica set to accept a new configuration.

       .. warning::

          Forcing a replica set reconfiguration might lead to a
          :manual:`rollback </reference/glossary/#term-rollback>` of
          majority-committed writes.

          Proceed with caution. Contact |mdb-support| if you have
          questions about the potential impacts of this operation.
