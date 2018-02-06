|mms| performs a rolling restart of the ``mongod`` processes in
your cluster when you enable database profiling. If your cluster is a
replica set, a :manual:`replica set election </core/replica-set-elections>`
occurs as a byproduct of the restart. This one-time operation is in
addition to the time required to propogate configuration changes to
the Automation Agent.