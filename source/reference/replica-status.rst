========================
Replica Status Reference
========================

The :command:`replSetGetStatus` provides an overview of the current
status of a replica set. Issue the following command against the
"``admin``" database, in the ``mongo`` shell: ::

     db.runCommand({ replSetGetStatus: 1 } )

The value specified (e.g "``1``" above,) does not effect the output of
the command.

.. note::

   The ``mongod`` that you issue the ``replSetGetStatus`` command to
   needs to have replication enabled, and be connected to a replica
   set for this command to return successfully.

Top Level Statuses
------------------

.. describe:: set

   The ``set`` value is the name of the replica set, configured in the
   :setting:`replSet` setting.

.. describe:: date

   The value of the ``date`` field is an :term:`ISODate` of the
   current time, according to the current server. Compare this to the
   value of the :status:`lastHeartbeat` to find the operational lag
   between the current host and the other hosts in the set.

.. describe:: myState

   The value of the ``myState`` value reflect state of the current
   node. State is specified as an integer between ``0`` and
   ``9``. These integers map to states, as described in the following
   chart.

   ==========  ==========================================================
   **Number**  **State**
   ----------  ----------------------------------------------------------
   0 	       Starting up, phase 1 (parsing configuration)
   1 	       Primary
   2 	       Secondary
   3 	       Recovering (initial syncing, post-rollback, stale members)
   4 	       Fatal error
   5 	       Starting up, phase 2 (forking threads)
   6 	       Unknown state (member has never been reached)
   7 	       Arbiter
   8 	       Down
   9 	       Rollback
   ==========  ==========================================================

.. describe:: members

   The ``members`` field holds an array that contains a document for
   every in node the replica set. See the ":ref:`Member Statuses
   <repl-set-member-statuses>`" for an overview of the values included
   in these documents.

.. _repl-set-member-statuses:

Member Statuses
---------------

.. describe:: name

   The ``name`` field holds the name of the server.

.. describe:: self

   The ``self`` field is only included in the document for the
   current ``mongod`` instance in the members array. It's value is
   "``true``".

.. describe:: errmsg

   This contains the most recent error or status message received from
   the node. This field may be empty (e.g. ``""``) in some cases.

.. describe:: health

   The ``health`` value is only present for remote nodes. This field
   conveys if the node is up (i.e. ``1``) or down (i.e. ``0``) from
   the perspective of the current server.

.. describe:: uptime

   The value of the ``uptime`` field reflects the number of seconds
   that this node has been up or active. This value is only present
   for remote nodes.

TODO determine if this is from the perspective of the current server or reported by the set member.

.. describe:: lastHeartbeat

   The ``lastHeartbeat`` value provides an :term:`ISODate` formatted
   date of the last heartbeat received from this node. Compare this
   value to the value of the :status:`date` field to track latency
   between these nodes.

   This value is only present for remote nodes.

.. describe:: pingMS

   The ``pingMS`` represents the number of milliseconds (ms) that a
   round-trip packet takes to travel between the remote node and the
   current node.

   This value is only present for remote nodes.
