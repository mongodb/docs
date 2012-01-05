========================
Replica Status Reference
========================

The :mongodb:command:`replSetGetStatus` provides an overview of the
current status of a :term:`replica set`. Issue the following command against
the "``admin``" database, in the :option:`mongo` shell: ::

     db.runCommand({ replSetGetStatus: 1 } )

The value specified (e.g "``1``" above,) does not effect the output of
the command.

.. note::

   The :option:`mongod` that you issue the
   :mongodb:command:`replSetGetStatus` command to needs to have
   replication enabled, and be a member of a replica set for this
   command to return successfully.

.. seealso:: The ":js:func:`rs.status()`" function in the
   :option:`mongo` shell and the ":doc:`/replication`" documentation
   index.

Statuses
--------

.. js:data:: rs.status.set

   The ``set`` value is the name of the replica set, configured in the
   :mongodb:setting:`replSet` setting.

.. js:data:: rs.status.date

   The value of the ``date`` field is an :term:`ISODate` of the
   current time, according to the current server. Compare this to the
   value of the :js:data:`members.lastHeartbeat` to find the
   operational lag between the current host and the other hosts in the
   set.

.. js:data:: rs.status.myState

   The value of the ``myState`` value reflect state of the current
   replica set member. An integer between ``0`` and ``9``represents
   the state of the member. These integers map to states, as described
   in the following table:

   ==========  ==========================================================
   **Number**  **State**
   ----------  ----------------------------------------------------------
   0           Starting up, phase 1 (parsing configuration)
   1           Primary
   2           Secondary
   3           Recovering (initial syncing, post-rollback, stale members)
   4           Fatal error
   5           Starting up, phase 2 (forking threads)
   6           Unknown state (member has never been reached)
   7           Arbiter
   8           Down
   9           Rollback
   ==========  ==========================================================

.. js:data:: rs.status.members

   The ``members`` field holds an array that contains a document for
   every member in the replica set. See the ":ref:`Member Statuses
   <repl-set-member-statuses>`" for an overview of the values included
   in these documents.

.. _repl-set-member-statuses:

Member Statuses
---------------

.. js:data:: members.name

   The ``name`` field holds the name of the server.

.. js:data:: members.self

   The ``self`` field is only included in the document for the
   current ``mongod`` instance in the members array. It's value is
   "``true``".

.. js:data:: members.errmsg

   This field contains the most recent error or status message received from
   the member. This field may be empty (e.g. ``""``) in some cases.

.. js:data:: members.health

   The ``health`` value is only present for the other members of the
   replica set (i.e. not the member that returns
   :js:func:`rs.status`.) This field conveys if the member is up
   (i.e. ``1``) or down (i.e. ``0``.)

.. js:data:: members.uptime

   The ``uptime`` field holds a value that reflects the number of
   seconds that this member has been online.

   This value does not appear for the member that returns the
   :js:func:`rs.status()` data.

.. js:data:: members.optime

   A document that contains information regarding the last operation
   from the operation log that this member has applied.

   .. js:data:: members.optime.t

      A 64-bit timestamp of the last operation applied to this member
      of the replica set from the :term:`oplog`.

   .. js:data:: members.optime.i

TODO figure out what ``optime.i`` is?

.. js:data:: members.optimeDate

   An :term:`ISODate` formatted date string that reflects the last
   entry from the :term:`oplog` that this member applied. If this
   differs significantly from :js:data:`members.lastHeartbeat` this
   member is either experiencing "replication lag" *or* there have not
   been any new operations since the last update. Compare
   ``members.optimeDate`` between all of the members of the set.

.. js:data:: members.lastHeartbeat

   The ``lastHeartbeat`` value provides an :term:`ISODate` formatted
   date of the last heartbeat received from this member. Compare this
   value to the value of the :js:data:`date` field to track
   latency between these members.

   This value does not appear for the member that returns the
   :js:func:`rs.status()` data.

.. js:data:: members.pingMS

   The ``pingMS`` represents the number of milliseconds (ms) that a
   round-trip packet takes to travel between the remote member and the
   local instance.

   This value does not appear for the member that returns the
   :js:func:`rs.status()` data.
