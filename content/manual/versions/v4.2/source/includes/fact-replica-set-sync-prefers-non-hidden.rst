If the :rsconf:`settings.chainingAllowed` setting
allows secondary members to sync from other secondaries, MongoDB by
default prefers non-hidden members over hidden members when selecting
a sync target. MongoDB will only choose hidden members as a last
resort. If you want a secondary to sync from a hidden member, use the
:dbcommand:`replSetSyncFrom` database command to override the default
sync target. See the documentation for :dbcommand:`replSetSyncFrom`
before using the command.

.. seealso:: :doc:`/tutorial/manage-chained-replication`
