|mms| performs a :term:`rolling restart` of the ``mongod`` processes in
your cluster when you enable or disable database profiling. If your
cluster is a replica set, a :manual:`replica set election
</core/replica-set-elections>` occurs as a byproduct of the restart.
This one-time operation is in addition to the time required to
propogate configuration changes to the {+aagent+}.
