If :data:`~local.system.replset.settings.chainingAllowed` is enabled,
allowing secondary members to sync from other secondaries, MongoDB will
by default choose non-hidden members over hidden members and will only
choose hidden members as a last resort. In cases where you want a
secondary to sync from a hidden member first, use the
:dbcommand:`replSetSyncFrom` database command. The command has several
caveats. Refer to the documentation for :dbcommand:`replSetSyncFrom`
before using the command.

.. seealso:: :doc:`/tutorial/manage-chained-replication`
