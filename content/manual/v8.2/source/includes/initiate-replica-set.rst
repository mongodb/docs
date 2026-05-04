From :binary:`~bin.mongosh`, run the :method:`rs.initiate()` method.

:method:`rs.initiate()` can take an optional :doc:`replica set
configuration document </reference/replica-configuration>`. In the
:doc:`replica set configuration document
</reference/replica-configuration>`, include:

- The :rsconf:`_id` field set to the replica set name specified in
  either the :setting:`replication.replSetName` or the ``--replSet``
  option.

- The :rsconf:`members` array with a document per each member of the
  replica set.

