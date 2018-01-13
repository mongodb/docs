a. Issue the following command to determine the
   :data:`~local.system.replset.members` array position for the member:

   .. code-block:: javascript

      rs.conf()

#. In the :data:`~local.system.replset.members` array, save the
   position of the member whose priority you wish to change. The example in
   the next step assumes this value is ``2``, for the third item
   in the list. You must record *array position*, not ``_id``, as these
   ordinals will be different if you remove a member.

#. In the :binary:`~bin.mongo` shell connected to the replica set's
   primary, issue a command sequence similar to the following:

   .. code-block:: javascript

      cfg = rs.conf()
      cfg.members[2].priority = 0.5
      rs.reconfig(cfg)

   When the operations return, ``mongodb2.example.net`` has a priority
   of 0. It cannot become primary.

   .. note::

      The :method:`rs.reconfig()` shell method can force the current
      primary to step down, causing an election. When the primary steps
      down, all clients will disconnect. This is the intended behavior.
      While most elections complete within a minute, always make sure
      any replica configuration changes occur during scheduled
      maintenance periods.
