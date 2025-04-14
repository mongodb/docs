There are important differences between :ref:`commit quorums
<createIndexes-cmd-commitQuorum>` and :ref:`write concerns
<write-concern>`:

- Index builds use commit quorums.
- Write operations use write concerns.

Each data-bearing node in a cluster is a voting member.

The commit quorum specifies how many data-bearing voting members, or
which voting members, including the primary, must be prepared to commit
a :ref:`simultaneous index build <index-operations-simultaneous-build>`
before the primary will execute the commit.

The write concern is the level of acknowledgment that the write has
propagated to the specified number of instances.

.. versionchanged:: 8.0 The commit quorum specifies how many
   nodes must be ready to finish the index build before the
   primary commits the index build. In contrast, when the
   primary has committed the index build, the write concern
   specifies how many nodes must replicate the index build oplog
   entry before the command returns success.

   In previous releases, when the primary committed the index
   build, the write concern specified how many nodes must finish
   the index build before the command returned success.
