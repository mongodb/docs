The manual restore process has the following high-level stages that you
perform with help from MongoDB Support:

1. Connect to each replica set and the Config Server Replica Set (CSRS)
   with either the legacy |mongo| shell or {+mongosh+}.

2. (Optional). :v4.0:`Review the configuration file of each replica set and CSRS </tutorial/restore-sharded-cluster/#a-optional-review-replica-set-configurations>`.
   After you complete the restore process, you can reconstruct the
   configuration on the restored replica sets using the saved
   configuration files.

3. :v4.0:`Prepare the target hosts </tutorial/restore-sharded-cluster/#b-prepare-the-target-host-for-restoration>`.
  
   - Stop all |mongod| processes running on the target hosts.
   - Provision enough storage space to hold the restored data.
   - Prepare directories for data and logs.
   - Add a :ref:`configuration file <configuration-file>` to your
     MongoDB Server directory with the target host's storage and log
     paths, and configuration for replicas and sharding roles.

4. :v4.0:`Restore the CSRS </tutorial/restore-sharded-cluster/#c-restore-config-server-replica-set>`.
5. :v4.0:`Restore each shard's replica set </tutorial/restore-sharded-cluster#d-restore-each-shard-replica-set>`.
6. :v4.0:`Restart each mongos process in the target cluster </tutorial/restore-sharded-cluster/#e-restart-each-mongos>`.
7. :v4.0:`Verify that you can connect to the cluster </tutorial/restore-sharded-cluster/#f-validate-cluster-accessibility>`.

The full manual restore procedure can be found in the
:v4.0:`MongoDB Server documentation </tutorial/restore-sharded-cluster/>`.