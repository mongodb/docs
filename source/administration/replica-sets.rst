==========================
Replica Set Administration
==========================

The replica set functionality in MongoDB automates the vast majority
of the administrative complexity typically associated with database
replication, but there are some deployment and long term
administrative requirements that require administrator
intervention. This document provides an overview of these tasks as
well as general troubleshooting suggestions.

.. seealso::

   - :ref:`Replica Set Reconfiguration Process <replica-set-reconfiguration-usage>`
   - :js:func:`rs.conf()` and :js:func:`rs.reconfig()`
   - :doc:`/reference/replica-configuration`

   The following tutorials provide task-oriented instructions for
   specific administrative tasks related to replica set operation.

   - :doc:`/tutorial/convert-replica-set-to-replicated-shard-cluster`
   - :doc:`/tutorial/deploy-geographically-distributed-replica-set`
   - :doc:`/tutorial/deploy-replica-set`
   - :doc:`/tutorial/expand-replica-set`

Procedures
----------

.. _replica-set-admin-procedure-add-member:

Adding Members
~~~~~~~~~~~~~~

From to time, it may be necessary to add an additional node to an
existing replica set. The data directory for the new node can either:

- have no data. In this case, all data must be copied as part of the
  replication process before the node can exit ":term:`recovering`"
  status, and become a :term:`secondary` node.

- copy the data directory from an existing node to limit the amount
  of time that the recovery process takes.

  If the difference in the amount of time between the most recent
  operation and the most recent operation to the database exceeds the
  length of the :term:`oplog` on the existing nodes, then node will
  have to completely re-synchronize. Ensure that you can copy the data
  to the new system and begin replication within the window allowed
  by the :term:`oplog`.

To add a member to an existing :term:`replica set`, deploy a new
:option:`mongod` instance, specifying the name of the replica set
(i.e. "setname" or ``replSet``) on the command line with the
:option:`--replSet <mongod --replSet>` option or in the configuration
with the :mongodb:setting:`replSet`. Take note of the host name and
port information for the new :option:`mongod` instance.

Then, log in to the current primary using the :option:`mongo`
shell. Issue the :js:func:`db.isMaster()` command when connected to
*any* node to determine the current primary node. Issue the following
command to add the new node.

.. code-block:: javascript

   rs.add("mongo2.example.net:27017")

Alternately you can specify an entire configuration document, with
some or all of the fields in a :js:data:`members` document, for
example:

.. code-block:: javascript

   rs.add({host: "mongo2.example.net:27017", priority: 0, hidden: true})

This configures a :term:`hidden node` that is accessible at
``mongo2.example.net:27018``. See ":js:data:`host <members.host>`,"
":js:data:`priority <members.priority>`," and ":js:data:`hidden
<members.hidden>`" for more information about these settings.

.. seealso:: :doc:`/tutorial/expand-replica-set`

.. _replica-set-admin-procedure-remove-member:

Removing Members
~~~~~~~~~~~~~~~~

Any node can be removed from a replica set at any time, for any
operational reason. Use the :js:func:`rs.remove()` function in the
:option:`mongo` shell while connected to the current
:term:`primary`. Issue the :js:func:`db.isMaster()` command when
connected to *any* node to determine the current primary node. Issue a
command in one of the following forms to remove the node.

.. code-block:: javascript

   rs.remove("mongo2.example.net:27018")
   rs.remove("mongo3.example.net")

This operation disconnects the shell briefly and forces a
re-connection as the :term:`replica set` renegotiates negotiates which
node will be :term:`primary`. The shell will display an error even if
this command succeeds.

You can re-add a removed node to a replica set at any time using the :ref:`

You can use the :ref:`replica set reconfiguration procedure
<replica-set-reconfiguration-usage>`

Replacing a Member
~~~~~~~~~~~~~~~~~~

Adjusting a Member's Priority
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Troubleshooting
---------------

Replication Lag
~~~~~~~~~~~~~~~

Failover and Recovery
~~~~~~~~~~~~~~~~~~~~~
