In-progress Operations
~~~~~~~~~~~~~~~~~~~~~~

Killing a session kills any in-progress operations in the session and
closes any open cursors associated with these operations.

Killed Session Availability
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The killed session may still be listed as a current session, and future
operations may use the killed session. To view existing sessions, see
:pipeline:`$listSessions` operation or :pipeline:`$listLocalSessions`.

Sessions with Transactions in Prepared State
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The |command| operation ignores sessions that have :ref:`transactions` in
prepared state. Transactions in prepared state refer to transactions
with write operations that span multiple shards whose commit
coordinator has completed the :data:`"sendingPrepare" action <$currentOp.twoPhaseCommitCoordinator.action>`.
