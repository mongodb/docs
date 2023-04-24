The following restrictions apply to a replica set configuration when used
for config servers:

- Must have zero :ref:`arbiters <replica-set-arbiter-configuration>`.

- Must have no :doc:`delayed members
  </core/replica-set-delayed-member>`.

- Must build indexes (i.e. no member should have
  :rsconf:`members[n].buildIndexes` setting set to false).
