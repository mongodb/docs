|mms| performs a :cloudmgr:`rolling restart </reference/glossary/#std-term-rolling-restart>` of the ``mongod`` processes in
your cluster when you enable or disable database profiling. If your
cluster is a replica set, a :ref:`replica set election <replica-set-election-internals>` occurs as a byproduct of the restart.
This one-time operation is in addition to the time required to
propogate configuration changes to the {+aagent+}.
