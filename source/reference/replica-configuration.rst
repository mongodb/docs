=========================
Replica Set Configuration
=========================

Synopsis
--------

This reference provides an overview of all possible replica set
configuration options and settings.

Use :js:func:`rs.conf()` in the :option:`mongo` shell to retrieve this
configuration. Note that default values are not explicitly displayed.

.. _replica-set-configuration-variables:

Configuration Variables
-----------------------

.. js:data:: rs.conf._id:

   **Type**: string

   **Value**: <setname>

   An ``_id`` field holding the name of the replica set. This reflects
   the set name configured with :mongodb:setting:`replSet` or
   :option:`mongod --replSet`.

.. js:data:: rs.conf.members

   **Type**: array

   Contains an array holding an embeded :term:`JSON document` for each
   member of the replica set. The ``members`` document contains a
   number of fields that describe the configuration of each member of
   the replica set.

.. js:data:: members._id

   **Type**: ordinal

   Provides a zero-indexed identifier of every member in the replica
   set.

.. js:data:: members.host

   **Type**: <hostname>:<port>

   Identifies the host name of the set member with a hostname and port
   number. This name must be resolvable for every host in the replica
   set.

.. js:data:: members.arbiterOnly

   *Optional*.

   **Type**: boolean

   **Default**: false

   Identifies an arbiter. For arbiters, this value is "``true``", and
   is automatically configured by :js:func:`rs.addArb()`".

.. js:data:: members.buildIndexes

   *Optional*.

   **Type**: boolean

   **Default**: true

   Determines weather :term:`indexes` will be built on this member. Do
   not set to "``false``", if a replica set *can* become a master, or
   if any queries will be performed against this instance.

   Omitting index creation, and thus this setting, may be useful,
   **if**:

   - You are only using this instance to perform backups using
     :option:`mongodump`,

   - no queries will ever be directed toward this
     instance, *and*

   - index creation and maintenance overburdens the host
     system.

.. js:data:: members.hidden

   *Optional*.

   **Type**: boolean

   **Default**: false

   When this value is "``true``", the node is hidden and will not be
   displayed in the output of :js:func:`db.isMaster()` or
   :mongodb:dbcommand:`isMaster`. This prevents read operations
   (i.e. queries) from ever reaching this host by way of secondary
   :term:`read preference`.

   .. seealso:: ":ref:`Hidden Replica Set Members <replica-set-hidden-nodes>`"

.. js:data:: members.priority

   *Optional*.

   **Type**: Number, between 0 and 1000 including decimals.

   **Default**: 1

   Specify higher values to make a node *more* eligible to become
   :term:`primary`, and lower values to make the node *less* eligible
   to become primary. Priorities are only used in comparison to each
   other, members of the set will veto elections from nodes when
   another eligible node has a higher absolute priority value.

   A ``members.priority`` value of 0 will prevent this node from
   *ever* being considered eligible to become primary. .

   .. seealso:: ":ref:`Replica Set Node Priority
      <replica-set-node-priority>`" and ":ref:`Replica Set Elections
      <replica-set-elections>`."

.. js:data:: members.tags

   *Optional*.

   **Type**: term:`JSON document`

   **Default**: none

   Used to represent arbitrary values for describing or tagging nodes
   for the purposes of extending :ref:`write propagation
   <replica-set-write-propagation>` to allow configurable data center
   awareness.

   Use in conjunction with :js:data:`settings.getLastErrorModes` and
   :js:data:`settings.getLastErrorDefaults` and
   :js:func:`db.getLastError()`
   (i.e. :mongodb:dbcommand:`getLastError`.)

.. js:data:: members.slaveDelay

   *Optional*.

   **Type**: Integer. (seconds.)

   **Default**: 0

   Describes the number of seconds "behind" the master that this
   replica set member should "lag." This option is used to create
   :ref:`delayed nodes <replica-set-delayed-nodes>`, that are used to
   maintain a copy of the data that reflects the state of the data set
   some amount of time (specified in seconds.) Typically these nodes
   are used to protect against human error, and provide some measure
   of insurance against the unforeseen consequences of changes and
   updates.

.. js:data:: members.votes

   *Optional*.

   **Type**: Integer

   **Default**: 1

   Controls the number of votes a server has in a :ref:`replica set
   election <replica-set-elections>`. If you need more than 7 nodes,
   use, this setting to add additional non-voting nodes with a
   ``members.votes`` value of ``0``. In nearly all scenarios, this
   value should be ``1``, the default.

.. js:data:: settings

   *Optional*.

   **Type**: :term:`JSON`

   The setting document holds two optional fields, which affect the
   available :term:`write propagation` options and default
   configurations.

.. js:data:: settings.getLastErrorDefaults

   *Optional*.

   **Type**: :term:`JSON`

   Specify arguments to the :mongodb:dbcommand:`getLastError` that will
   be used for members of this replica set when no arguments to
   :mongodb:dbcommand:`getLastError` are used. If you specify *any*
   arguments, then these settings will be ignored.

.. js:data:: settings.getLastErrorModes

   *Optional*.

   **Type**: :term:`JSON`

   Defines the names and combination of :js:data:`tags <members.tags>`
   that can be used by the application layer to guarantee :term:`write
   propagation` to database using the :mongodb:dbcommand:`getLastError`
   command to provide :term:`data center awareness`.

.. _replica-set-reconfiguration-usage:

Usage
-----

In general replica set configuration is modified using the
:option:`mongo` shell. Consider the following example:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[0].priority = 0.5
   cfg.members[1].priority = 2
   cfg.members[2].priority = 2
   rs.reconfig(cfg)

Here, the current replica set configuration is saved to the local
variable "``cfg``" using the :js:func:`rs.conf()`. Then priority
values are added to :term:`JSON document` when :js:data:`members._id`
has a value of ``0``, ``1``, or ``2``. Finally the
:js:func:`rs.reconfig()` is called with the argument of ``cfg`` to
initialize this new configuration.

Using this "dot notation," you can modify any existing setting or
specify any of optional :ref:`replica set configuration variables
<replica-set-configuration-variables>`. Until you run
"``rs.reconfig(cfg)``" at the shell, no changes will take effect. You
can issue "``cfg = rs.conf()``" at any time before using
:js:func:`rs.reconfig()` to undo your changes and start from the
current configuration. If you issue "``cfg``" at any point, the :option:`mongo`
shell at any point will output the complete :term:`JSON document` with
modifications for your review.

.. note::

   The :js:func:`rs.reconfig()` shell command can force the current
   primary to step down and causes an election in some
   situations. When the primary node steps down, all clients will
   disconnect. Do not be alarmed. While, this typically takes 10-20
   seconds, attempt to make these changes during scheduled maintenance
   periods.
