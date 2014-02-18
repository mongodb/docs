.. <cmd-name> specified in the including file

- On secondaries, the |cmd-name| command forces
  the secondary to enter :replstate:`RECOVERING` state. This prevents
  clients from reading during compaction. Once the operation
  finishes, the secondary returns to :replstate:`SECONDARY` state.

- See :doc:`/reference/replica-states/` for more information about
  replica set member states. 

See :doc:`/tutorial/perform-maintence-on-replica-set-members` for an
example replica set maintenance procedure to maximize availability
during maintenance operations.
