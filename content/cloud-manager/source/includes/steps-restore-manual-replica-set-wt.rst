.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-continuous-backup.rst
      
   .. step:: Click the :guilabel:`Overview` tab.

   .. step:: Click the deployment, then click :guilabel:`Restore or Download`.
      
   .. step:: Select the Restore Point.
      
      a. Choose the point from which you want to restore your backup.
      
         .. include:: /includes/backup/select-restore-point.rst
      
      b. Click :guilabel:`Next`.
      
   .. step:: Click :guilabel:`Download` to Restore the Files Manually.

   .. step:: Configure the snapshot download.
      
      a. Configure the following download options:
      
         .. list-table::
            :widths: 30 70
      
            * - :guilabel:`Pull Restore Usage Limit`
              - Select how many times the link can be used. If you select
                ``No Limit``, the link is re-usable until it expires.
      
            * - :guilabel:`Restore Link Expiration (in hours)`
              - Select the number of hours until the link expires. The
                default value is ``1``. The maximum value is the number of
                hours until the selected snapshot expires.
      
      b. Click :guilabel:`Finalize Request`.
      
      c. If you use :doc:`2FA </core/two-factor-authentication>`,
         |mms| prompts you for your 2FA code. Enter your 2FA code, then
         click :guilabel:`Finalize Request`.
      
   .. include:: /includes/nav/steps-continuous-backup.rst
   
   .. step:: Retrieve the Snapshots.
      
      |mms| creates links to the snapshot. By default, these links are
      available for an hour and you can use them just once.
      
      To download the snapshots:
      
      a. Click :guilabel:`Restore History`.
      
      b. When the restore job completes, click :guilabel:`(get link)`
         for each :manual:`replica set </reference/glossary/#std-term-replica-set>` that appears.
      
      c. Click:
      
         - The copy button to the right of the link to copy the link to
           use it later, or
         - :guilabel:`Download` to download the snapshot immediately.
      
   .. step:: Unmanage the Target Replica Set.
      
      Before attempting to restore the data manually, :doc:`remove the
      replica set from Automation </tutorial/unmanage-deployment>`.
      
      Choose the
      :guilabel:`Unmanage this item in Ops Managers but continue to 
      monitor` option.
      
   .. step:: Stop the Target Replica Set.
      
      Depending on your path, you may need to specify
      the path to {+mongosh+}. Run:
      
      .. code-block:: sh
      
         mongosh --port <port> \
               --eval "db.getSiblingDB('admin').shutdownServer()"
      
   .. step:: Verify Hardware and Software Requirements on the Target Replica Set.
      
      .. list-table::
         :widths: 30 70
         :stub-columns: 1
      
         * - Storage Capacity
           - The target host's hardware needs to have sufficient free storage
             space for storing the restored data. If you want to keep any
             existing cluster data on this host, make sure the host
             has sufficient free space for the cluster data and the
             restored data.
      
         * - MongoDB Version
           - The target host on which you are restoring and the source host
             from which you are restoring  must run the same MongoDB
             Server version. To check the MongoDB version, run ``mongod
             --version`` from a terminal or shell.
      
      To learn more, see :manual:`installation </installation>`.
      
   .. step:: Move the Snapshot Data Files to the Target Host.

      Before you move the snapshot's data files to the target host, check
      whether the target host contains any existing files, and delete all 
      the files except the ``automation-mongod.conf`` file.
      
      Unpack the snapshot files and move them to the target host as follows:
      
      .. code-block:: sh
      
         tar -xvf <backupSnapshot>.tar.gz
         mv <backupSnapshot> </path/to/datafiles>
      
   .. step:: Start the Temporary Standalone Instance on the Ephemeral Port.
      
      Start the |mongod| process in standalone mode as a temporary measure.
      This allows you to add new configuration parameters to the
      ``system.replset`` collection in subsequent steps.
      
      Use the ``<ephemeralPort>`` for the temporary standalone |mongod| process
      in all steps in this procedure  where it is mentioned. This port must
      differ from the source and target host ports.
      
      Run the |mongod| process as follows. Depending on your path, you may
      need to specify the path to the |mongod| binary.
      
      .. code-block:: sh
      
         mongod  --dbpath </path/to/datafiles> \
                 --port <ephemeralPort> \
      
      If you are restoring
      from a namespace-filtered snapshot, use the ``--restore`` option.
      
      .. code-block:: sh
      
         mongod --dbpath </path/to/datafiles> \
                --port <ephemeralPort> \
                --restore
      
      After the |mongod| process starts accepting connections, continue.
      
   .. step:: Connect to the Temporary Standalone Instance with {+mongosh+}.
      
      From the host running this |mongod| process, start {+mongosh+}. Depending 
      on your path, you may need to specify the path to {+mongosh+}.
      
      To connect to the |mongod| listening to localhost on
      the same ``<ephemeralPort>`` specified in the previous step, run:
      
      .. code-block:: sh
      
         mongosh  --port <ephemeralPort>
      
      After {+mongosh+} connects to |mongod|, continue.
      
   .. step:: Remove Replica Set-Related Collections from the ``local`` Database.
      
      .. include:: /includes/fact-restore-manual-user-role.rst
      
      Run the following commands to remove the previous replica set
      configuration and other non-oplog, replication-related collections.
      
      .. code-block:: javascript
      
         db.getSiblingDB("local").replset.minvalid.drop()
         db.getSiblingDB("local").replset.oplogTruncateAfterPoint.drop()
         db.getSiblingDB("local").replset.election.drop()
         db.getSiblingDB("local").system.replset.remove({})
      
      A successful response should look like this:
      
      .. code-block:: javascript
         :copyable: false
      
         > db.getSiblingDB("local").replset.minvalid.drop()
         true
         > db.getSiblingDB("local").replset.oplogTruncateAfterPoint.drop()
         true
         > db.getSiblingDB("local").replset.election.drop()
         true
         > db.getSiblingDB("local").system.replset.remove({})
         WriteResult({ "nRemoved" : 1 })
      
   .. step:: Add a New Replica Set Configuration.
      
      Insert the following document into the ``system.replset`` collection
      in the ``local`` database. Change the following variables:
      
      - ``<replaceMeWithTheReplicaSetName>`` to the name of your replica set. This
        name does not have to be the same as the old name.
      - ``<host>`` to the host serving this replica set member.
      - ``<ephemeralPortNewReplicaSet>`` to the ephemeral port for the new
        replica set. This must be a different port than the
        ``<ephemeralPort>`` that you specified in Step 11 of this procedure.
      
      .. code-block:: javascript
         :linenos:
      
         db.getSiblingDB("local").system.replset.insertOne({
           "_id" : "<replaceMeWithTheReplicaSetName>",
           "version" : NumberInt(1),
           "protocolVersion" : NumberInt(1),
           "members" : [
             {
               "_id" : NumberInt(0),
               "host" : "<host>:<ephemeralPortNewReplicaSet>"
             }
           ],
           "settings" : {
      
           }
         })
      
      A successful response should look like this:
      
      .. code-block:: javascript
         :copyable: false
      
         { "acknowledged" : true, "insertedId" : "<yourReplicaSetName>" }
      
   .. step:: Insert the Minimum Valid Timestamp.
      
      Issue the following command:
      
      .. code-block:: javascript
      
         db.getSiblingDB("local").replset.minvalid.insertOne({
           "_id" : ObjectId(),
           "t" : NumberLong(-1),
           "ts" : Timestamp(0,1)
         })
      
      A successful response should look like this:
      
      .. code-block:: javascript
         :copyable: false
      
         { "acknowledged" : true, "insertedId" : ObjectId("<yourObjectId>") }
      
   .. step:: Set the Restore Point to the Values in ``Restore Timestamp`` from ``restoreInfo.txt``.

      Set the ``oplogTruncateAfterPoint`` document to the
      values provided in the ``Restore Timestamp`` field of the
      :ref:`restoreInfo.txt <com-restore-info-rs>` file.
      
      The ``Restore Timestamp`` field in that file contains two
      values. In the following example, the first value is the
      timestamp, and the second value is the increment.
      
      .. code-block:: sh
         :copyable: false
         :linenos:
         :emphasize-lines: 2
         
         ...
         Restore timestamp:  (1609947369, 2)
         Last Oplog Applied: Wed Jan 06 15:36:09 GMT 2021 (1609947369, 1)
         MongoDB Version: 4.2.11
         ...
      
      The following example code uses the timestamp value and increment value from the previous example.
      
      .. code-block:: javascript
      
         truncateAfterPoint = Timestamp(1609947369,2)
         db.getSiblingDB("local").replset.oplogTruncateAfterPoint.insertOne({
            "_id": "oplogTruncateAfterPoint",
            "oplogTruncateAfterPoint": truncateAfterPoint
         })
      
      A successful response should look like this:
      
      .. code-block:: javascript
         :copyable: false
      
         WriteResult({ "nInserted" : 1 })
      
      .. note:: Restoring MongoDB 4.2 Snapshots using MongoDB 4.4
      
         If you try to restore a MongoDB 4.2 snapshot with a |mongod|
         running MongoDB 4.4, your oplog may contain unneeded documents.
      
         To resolve this issue, you can either:
      
         - Decrement the timestamp by 1.
         - Restore using MongoDB 4.2.
         - Have |mms| run an automated restore.
      
         This issue doesn't apply to MongoDB 4.4 or later snapshots.
      
   .. step:: Stop the Temporary Standalone Instance.
      
      Depending on your path, you may need to specify
      the path to {+mongosh+}. Run:
      
      .. code-block:: sh
      
         mongosh --port <ephemeralPort> \
               --eval "db.getSiblingDB('admin').shutdownServer()"
      
   .. step:: Restart the Instance to Recover the Oplog.
      
      Start the |mongod| using the following command, specifying these
      parameters:
      
      - ``<bind_ip>`` to the host serving this replica set member that you
        specified in step 14 of this procedure.
      - ``<port>`` to the <ephemeralPort> that you
        specified in Step 11 of this procedure.
      
      The |mongod| replays the oplog up to the ``Restore timestamp``.
      
      .. code-block:: sh
      
         mongod  --dbpath </path/to/datafiles> \
                 --port <ephemeralPort> \
                 --bind_ip <host-serving-this-replica-set-member> \
                 --replSet <replaceMeWithTheReplicaSetName>
      
   .. step:: Stop the Temporary Instance on the Ephemeral Port.

      Depending on your path, you may need to specify
      the path to {+mongosh+}. Run:
      
      .. code-block:: sh
      
         mongosh --port <ephemeralPort> \
               --eval "db.getSiblingDB('admin').shutdownServer()"
      
   .. step:: (Point-in-Time Restore Only) Run the MongoDB Backup Restore Utility.

      This step is optional. Run it if you need Point-in-Time Restore. If you
      need this step, complete it and then run steps 21 and 22. If you
      don't need this step, then proceed to step 23.
      In this step, you download and run the MongoDB Backup Restore Utility on the
      target instance for the replica set, and then stop the instance.
      
      a. Download the MongoDB Backup Restore Utility to your host.
         
         If you closed the restore panel, click :guilabel:`Continuous
         Backup in Deployment`, :guilabel:`More`, and then
         :guilabel:`Download MongoDB Backup Restore Utility`.
      
      #. Start a :binary:`~bin.mongod` instance without authentication
         enabled using the extracted snapshot directory as the data
         directory. Depending on your path, you may need to
         specify the path to the |mongod| binary.
      
         .. code-block:: sh
      
            mongod  --port <ephemeralPort> \
                    --dbpath </path/to/datafiles> \
                    --setParameter ttlMonitorEnabled=false
      
         .. warning::
         
            The MongoDB Backup Restore Utility doesn't support
            authentication, so you can't start this temporary database with
            authentication.
      
      #. Run the MongoDB Backup Restore Utility on your target host.
         Run it once for the replica set.
      
         .. include:: /includes/fact-pre-configured-mbru-command.rst
      
         The ``mongodb-backup-restore-util`` command uses the following
         options:
      
         .. include:: /includes/fact-restore-manual-replica-set-cloud.rst
      
         :icon:`check-circle` means that if you copied the
         ``mongodb-backup-restore-util`` command provided in
         |application|, this field is pre-configured.
      
      #. Stop the :binary:`~bin.mongod` on the instance. Depending on your path,
         you may need to specify the path to {+mongosh+}. Run:
      
         .. code-block:: sh
      
            mongosh --port <ephemeralPort> \
                  --eval "db.getSiblingDB('admin').shutdownServer()"
      
   .. step:: (Point-in-Time Restore Only) Restart the Instance to Recover the Oplog.

      This step is needed only if you ran step 20. If you didn't need to run
      step 20, then proceed to step 23.
      Start the |mongod| using the following command. The |mongod| replays the oplog
      up to the ``Restore timestamp``. Depending on your path, you may need to specify
      the path to the |mongod| binary.
      
      .. code-block:: sh
      
         mongod  --dbpath </path/to/datafiles> \
                 --port <ephemeralPort> \
                 --replSet <replaceMeWithTheReplicaSetName>
      
      After you complete this step, the actual restore process is completed. In the
      following steps, you restore the configuration of the replica set and reimport it.
      
   .. step:: (Point-in-Time Restore Only) Stop the Instance on the Ephemeral Port.

      This step is needed only if you ran step 20. If you didn't need to run
      step 20, then proceed to step 23.
      
      Depending on your path, you may need to specify
      the path to {+mongosh+}. Run:
      
      .. code-block:: sh
      
         mongosh--port <ephemeralPort> \
               --eval "db.getSiblingDB('admin').shutdownServer()"
      
   .. step:: Restart the Replica Set as a Standalone Instance.

      Start the |mongod| process as a standalone instance using the
      following command. For ``<port>``, use the actual port on which
      this node in the replica set is intended to run. Depending on your
      path, you may need to specify the path to the |mongod| binary.
      
      .. code-block:: sh
      
         mongod  --dbpath </path/to/datafiles> \
                 --port <port> 
      
      After the |mongod| process starts accepting connections, continue.
      
   .. step:: Remove the Temporary Replica Set Configuration.

      Run the following command:
      
      .. code-block:: sh
         
         mongosh --port <port> \
               --eval db.getSiblingDB("local").system.replset.remove({})
      
   .. step:: Stop the Standalone Instance.

      Depending on your path, you may need to specify
      the path to {+mongosh+}. Run:
      
      .. code-block:: sh
      
         mongosh --port <port> \
               --eval "db.getSiblingDB('admin').shutdownServer()"
      
   .. step:: Repeat Steps 10 to 25 for each node in the Replica Set.
      
   .. step:: Restart all nodes in a replica set.
      
      At this point, the data files in the replica set are in a consistent 
      state, but the replica set configuration needs to be updated so that 
      each node is aware of each other.
      
      Run the following command:
      
      .. code-block:: sh
      
         sudo -u mongod <path/to/target_mongod_binary> -f /path/to/datafiles/automation-mongod.conf
      
      The following example restarts all nodes with the version 4.4.12 
      enterprise with the data path ``/data6/node3``:
      
      .. code-block:: sh
      
         sudo -u mongod /var/lib/mongodb-mms-automation/mongodb-linux-x86_64-4.4.12-ent/bin/mongod -f /data6/node3/automation-mongod.conf
      
   .. step:: Set up your replica set configuration.
      
      Log into one of the nodes and run the following commands:
      
      .. code-block:: sh
      
         rs.initiate()
         rs.add( { host: "<host2>:<port>" } )
         rs.add( { host: "<host3>:<port>" } )

   .. include:: /includes/nav/steps-processes.rst   
   
   .. step:: Reimport the Replica Set.
      
      To manage the replica set with automation again,
      :doc:`import the replica set 
      </tutorial/add-existing-mongodb-processes>`
      back into |mms|.
      
      Click :guilabel:`Add`, select 
      :guilabel:`Existing MongoDB Deployment`, and proceed with adding 
      :guilabel:`Automation` back to your cluster.
      