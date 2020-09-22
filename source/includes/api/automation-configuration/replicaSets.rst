The **replicaSets** array defines each replica set's configuration.
This field is required for deployments with replica sets.

.. code-block:: json
   :linenos:

   "replicaSets": [{
     "_id": "<string>",
     "protocolVersion": "<integer>",
     "members": [{
       "_id": "<integer>",
       "host": "<string>",
       "force": {
         "currentVersion": "<integer>"
       }
     }]
   }]

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - replicaSets
     - array of objects
     - Optional
     - Configuration of each
       :term:`replica set`. The {+mdbagent+} uses the values in this
       array to create valid :manual:`replica set configuration
       documents </reference/replica-configuration>`. The agent
       regularly checks that replica sets are configured correctly.
       If a problem occurs, the agent reconfigures the replica set
       according to its configuration document. The array can
       contain the following top-level fields from a replica set
       configuration document: **_id**; **version**; and
       **members**.

       .. seealso:: :manual:`replSetGetConfig </reference/command/replSetGetConfig>`

   * - replicaSets[n]._id
     - string
     - Required
     - The name of the replica set.

   * - replicaSets[n].protocolVersion
     - integer
     - Optional
     - :manual:`Protocol version </reference/replica-set-protocol-versions>`
       of the replica set.

   * - replicaSets[n].members
     - array of objects
     - Optional
     - Objects that define each member of the replica set. The
       **members.host** field must specify the host's name as listed in
       **processes.name**. The {+mdbagent+} expands the **host** field
       to create a valid replica set configuration.

       .. seealso:: :manual:`replSetGetConfig </reference/command/replSetGetConfig>`.

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

       .. warning::

          Forcing a replica set reconfiguration might lead to a
          :term:`rollback` of majority-committed writes.

          Proceed with caution. Contact |mdb-support| if you have
          questions about the potential impacts of this operation.
