Number of seconds that a custom resource can remain in a 
``Pending`` or ``Failed`` state before the |k8s-op-short| 
automatically recovers your ``MongoDB`` resources.

The default value
is **1200** seconds (20 minutes).

To disable automatic recovery, set the 
:ref:`MDB_AUTOMATIC_RECOVERY_ENABLE <mdb-automatic-recovery-enable>` 
environment variable to ``false``.
