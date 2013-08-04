.. <cmd-name> specified in the including file

.. important:: On secondaries, the |cmd-name| command forces
   the secondary to enter :replstate:`RECOVERING` state. This prevents
   clients from reading during compaction. Once the operation
   finishes, the secondary returns to :replstate:`SECONDARY` state.

   See :doc:`/reference/replica-states/` for more information about
   replica set member states. Refer to the "`partial script for
   automating step down and compaction`_" for an example of this
   procedure.

   .. _`partial script for automating step down and compaction`: https://github.com/mongodb/mongo-snippets/blob/master/js/compact-example.js
