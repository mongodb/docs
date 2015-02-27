.. note::

   .. deprecated:: 2.6
      :data:`~replSetGetConfig.members[n].votes` values greater
      than ``1``.

   Earlier versions of MongoDB allowed a member
   to have more than ``1`` vote by setting
   :data:`~replSetGetConfig.members[n].votes` to a value greater
   than ``1``. Setting :data:`~replSetGetConfig.members[n].votes`
   to value greater than ``1`` now produces a warning message.
