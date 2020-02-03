.. list-table:: 
   :header-rows: 1
   :widths: 30 70

   * - Field
     - Description 

   * - ``mongoURI``
     - The connection string used to access the |mms| 
       Application Database.

   * - ``name``
     - The name of the cluster.

   * - ``processes``
     - Configuration information for 
       :manual:`mongod </reference/program/mongod/#bin.mongod>` processes 
       on the cluster. 

   * - ``processes.arbiterOnly``
     - The flag that indicates whether or not the replica 
       set member is an :manual:`arbiter </core/replica-set-arbiter/>` 
       node. Value can be: 

       - ``true`` if the member is an arbiter node 
       - ``false`` if the member is a non-arbiter node

   * - ``processes.buildIndexes``
     - The flag that indicates whether to direct 
       :manual:`mongod </reference/program/mongod/#bin.mongod>` to 
       build :manual:`indexes </indexes/>`. This setting corresponds 
       to the :manual:`buildIndexes 
       </reference/replica-configuration/#rsconf.members[n].buildIndexes>`
       :manual:`mongod </reference/program/mongod/#bin.mongod>` replica set 
       configuration option.

   * - ``processes.dbPath``
     - The location and name of the MongoDB log files.

   * - ``processes.disabled``
     - The flag that indicates whether or not the process is 
       disabled. Value can be: 

       - ``true`` if disabled 
       - ``false`` if enabled

   * - ``processes.featureCompatibilityVersion``
     - The :manual:`Feature Compatibility 
       Version </reference/command/setFeatureCompatibilityVersion/#dbcmd.setFeatureCompatibilityVersion>` of the deployment.

   * - ``processes.hidden``
     - The flag that indicates whether or not the replica set 
       member is :manual:`hidden </core/replica-set-hidden-member/>`. 
       Value can be: 

       - ``true`` if the member is hidden 
       - ``false`` if the member is not hidden

   * - ``processes.hostname``
     - The hostname of the replica set member.

   * - ``processes.logPath``
     - The full path to the 
       :manual:`mongod </reference/program/mongod/#bin.mongod>` log 
       file, including the log file name and extension.

   * - ``processes.name``
     - Hostname and port of the 
       :manual:`mongod </reference/program/mongod/#bin.mongod>` process.

   * - ``processes.port``
     - The |iana| port number for the 
       :manual:`mongod </reference/program/mongod/#bin.mongod>` process.

   * - ``processes.priority``
     - The priority of the member during elections.

   * - ``processes.processType``
     - The type of process. Value will be 
       :manual:`mongod </reference/program/mongod/#bin.mongod>`.

   * - ``processes.slaveDelay``
     - The number of seconds behind the primary that the replica set 
       member should lag. 

   * - ``processes.version``
     - The MongoDB server version of the 
       :manual:`mongod </reference/program/mongod/#bin.mongod>` process.

   * - ``processes.votes``
     - The number of votes that the replica set member 
       has during elections.
       