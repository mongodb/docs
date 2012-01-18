==========================
Replica Set Administration
==========================

:term:`Replica sets <replica set>` in MongoDB automate the vast
majority of the administrative complexity typically associated with
database replication and management. Nevertheless, some deployment and
long term administrative requirements that require administrator
intervention. This document provides an overview of these tasks as in
addition to general troubleshooting suggestions.

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

From to time, it may be necessary to add an additional member to an
existing :term:`replica set`. The data directory for the new member
can either:

- have no data. In this case, all data must be copied as part of the
  replication process before the member can exit ":term:`recovering`"
  status, and become a :term:`secondary` member.

- copy the data directory from an existing member to limit the amount
  of time that the recovery process takes.

  If the difference in the amount of time between the most recent
  operation and the most recent operation to the database exceeds the
  length of the :term:`oplog` on the existing members, then the new
  instance will have to completely re-synchronize. Ensure that you can
  copy the data to the new system and begin replication within the
  window allowed by the :term:`oplog`.

To add a member to an existing :term:`replica set`, deploy a new
:option:`mongod` instance, specifying the name of the replica set
(i.e. "setname" or ``replSet``) on the command line with the
:option:`--replSet <mongod --replSet>` option or in the configuration
with the :mongodb:setting:`replSet`. Take note of the host name and
port information for the new :option:`mongod` instance.

Then, log in to the current primary using the :option:`mongo`
shell. Issue the :js:func:`db.isMaster()` command when connected to
*any* member of the set to determine the current
:term:`primary`. Issue the following command to add the new member to
the set.

.. code-block:: javascript

   rs.add("mongo2.example.net:27017")

Alternately, specify an entire configuration document with some or all
of the fields in a :js:data:`members` document, for example:

.. code-block:: javascript

   rs.add({host: "mongo2.example.net:27017", priority: 0, hidden: true})

This configures a :term:`hidden node` that is accessible at
``mongo2.example.net:27018``. See ":js:data:`host <members.host>`,"
":js:data:`priority <members.priority>`," and ":js:data:`hidden
<members.hidden>`" for more information about these settings.

.. seealso:: :doc:`/tutorial/expand-replica-set`

.. _replica-set-admin-procedure-remove-members:

Removing Members
~~~~~~~~~~~~~~~~

Administrators can remove any member of a replica set at any time, for
a number of operational reasons. Use the :js:func:`rs.remove()`
function in the :option:`mongo` shell while connected to the current
:term:`primary`. Issue the :js:func:`db.isMaster()` command when
connected to *any* member of the set to determine the current
:term:`primary`. Use a command in either of the following forms to
remove the member:

.. code-block:: javascript

   rs.remove("mongo2.example.net:27017")
   rs.remove("mongo3.example.net")

This operation disconnects the shell briefly and forces a
re-connection as the :term:`replica set` renegotiates which member
will be :term:`primary`. The shell will display an error even if this
command succeeds.

You can re-add a removed member to a replica set at any time using the
:ref:`procedure for adding replica set members
<replica-set-admin-procedure-add-member>`. Additionally, consider
using the :ref:`replica set reconfiguration procedure
<replica-set-reconfiguration-usage>` to change the
:js:data:`members.host` value to rename a host in a replica set
directly.

Replacing a Member
~~~~~~~~~~~~~~~~~~

There are two methods for replacing a member of a replica set. First,
you may remove and then re-add a member using the following procedure
in the :option:`mongo` shell:

.. code-block:: javascript

   rs.remove("mongo2.example.net:27018")
   rs.add({host: "mongo2.example.net:27019", priority: 0, hidden: true})

Second, you may consider using the following procedure to use
:js:func:`rs.reconfig()` to change the value of the
:js:data:`members.host` field to reflect the new hostname or port
number. In this case, the :js:data:`members._id` field is not reused
by the new nenber.

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[0].host = "mongo2.example.net:27019"
   rs.reconfig(cfg)

The second method may be useful if you have an existing configuration
and only want to change the hostname of a member rather than
completely remove all configuration related to the existing/previous
set member. The :js:data:`members._id` field does not change as a
result of this operation.

.. note::

   Replica set configurations can trigger the current :term:`primary`
   to step down forcing an :term:`election`. This causes the current
   shell session to produce an error even when the operation
   succeeds. Clients connected to this replica set will also
   disconnect.

Adjusting a Member's Priority
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To change the value of the :js:data:`members.priority` value in the
replica set configuration, use the following sequence of commands in
the :option:`mongo` shell:

.. code-block:: javascript

   cfg = rs.conf()
   cfg.members[0].priority = 0.5
   cfg.members[1].priority = 2
   cfg.members[2].priority = 2
   rs.reconfig(cfg)

The first operation sets the local variable "``cfg``" to the contents
of the current replica set configuration using the
:js:func:`rs.conf()`, which is a :term:`JSON document`. The next three
operations change the :js:data:`members.priority` value in the ``cfg``
document for :js:data:`members._id` of ``0``, ``1``, or ``2``. The
final operation calls :js:func:`rs.reconfig()` with the argument of
``cfg`` to initialize the new configuration.

.. seealso:: The ":ref:`Replica Reconfiguration Usage
   <replica-set-reconfiguration-usage>`" example revolves around
   changing the priorities of the :js:data:`members` of a replica set.

Troubleshooting
---------------

This section defines reasonable troubleshooting processes for common
operational challenges that you may encounter with replica sets. While
there is no single causes or guaranteed response strategies for any of
these symptoms, the following sections provide good places to start a
troubleshooting investigation.

.. seealso:: ":doc:`/administration/monitoring`."

Replication Lag
~~~~~~~~~~~~~~~

Replication lag is a delay between an operation on the :term:`primary`
and the application of that operation from :term:`oplog` to the
:term:`secondary`. Such lag can be a significant issue, and can
seriously affect MongoDB replica set deployments. Excessive
replication lag makes "lagged" members ineligible to become
:term:`primary` quickly and increases the possibility that distributed
read operations will be inconsistent.

Identify replication lag by checking the values of
:js:data:`members.optimeDate` for each member of the replica set using
the :js:func:`rs.status()` function in the :option:`mongo` shell.

Possible causes of replication lag include:

- **Network Latency.**

  Check the network routes between the members of your set, to ensure
  that there is no packet loss or network routing issue.

  Use tools including :dbcommand:`ping` to test latency between set
  members and :dbcommand:`traceroute` to expose the routing of packets
  network endpoints.

- **Disk Throughput.**

  If the file system and disk device on the :term:`secondary` is
  unable to flush data to disk as quickly as the :term:`primary`, then
  the secondary will have difficulty keeping state. Disk related
  issues are incredibly prevalent on multi-tenant systems, including
  vitalized instances, and can be transient if the system accesses
  disk devices are over an IP network (as is the case with Amazon's
  EBS system.)

  Use system-level tools to assess disk status including
  :dbcommand:`iostat` or :dbcommand:`vmstat`.

- **Concurrency.**

  In some cases, long running operations on the primary can block
  replication on :term:`secondaries <secondary>`. You can use
  :term:`write propagation` to prevent write operations from returning
  unless replication can keep up with the write load.

  Use the :term:`database profiler` to see if there are slow queries
  or long running operations that correspond to the incidences of lag.

Failover and Recovery
~~~~~~~~~~~~~~~~~~~~~

In most cases failover occurs with out administrator intervention,
seconds after the :term:`primary` steps down or becomes inaccessible
and ineligible to act as primary. If your MongoDB deployment does not
failover according to expectations, consider the following operational
errors:

- No remaining member is able to form a majority. This can happen as a
  result of network portions that render some members
  inaccessible. Architect your systems to ensure that a majority of
  members can elect a primary in the same facility as core application
  systems.

- No member is eligible to become :term:`primary`. Members must have a
  :js:data:`members.priority` setting greater than 0, be less than ten
  seconds behind the last operation to the :term:`replica set`, and
  generally be *more* up to date than the voting members.

In many senses, :ref:`rollbacks <replica-set-rollbacks>` represent a
graceful recovery from an impossible failover and recovery
situation.

Rollbacks occur when a primary accepts writes that other members of
the set do not successfully replicate before the primary steps
down. When the former primary begins replicating again it performs a
"rollback" to discard those operations that were never replicated to
the set so that the data set is in a consistent state.

You can prevent Rollbacks prevented by ensuring :term:`write
propagation`.

.. seealso:: ":ref:`Replica Set Elections <replica-set-elections>`"
