.. note::

   .. deprecated:: 2.6
      :data:`~local.system.replset.members[n].votes` values greater
      than ``1``.

   Earlier versions of MongoDB allowed a member
   to have more than ``1`` vote by setting
   :data:`~local.system.replset.members[n].votes` to a value greater
   than ``1``. Setting :data:`~local.system.replset.members[n].votes` 
   to value greater than ``1`` now produces a warning message.
