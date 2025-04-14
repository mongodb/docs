a. View the replica set configuration to determine the
   :rsconf:`members` array position for the member. Keep
   in mind the array position is not the same as the ``_id``:

   .. code-block:: javascript

      rs.conf()

b. Copy the replica set configuration object to a variable (to ``cfg`` in
   the example below). Then, in the variable, set the correct priority for
   the member. Then pass the variable to :method:`rs.reconfig()` to update
   the replica set configuration.

   For example, to set priority for the third member in the array (i.e.,
   the member at position 2), issue the following sequence of commands:

   .. code-block:: javascript

      cfg = rs.conf()
      cfg.members[2].priority = 0.5
      rs.reconfig(cfg)

   .. note::

      The :method:`rs.reconfig()` shell method can force the current
      primary to step down, causing an election. When the primary steps
      down, all clients will disconnect. This is the intended behavior.
      While median time to elect a new primary should not typically
      exceed 12 seconds, always make sure any replica configuration
      changes occur during scheduled maintenance periods.
