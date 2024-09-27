a. Start each member of the config server replica set.

   When starting *each* :binary:`~bin.mongod`, specify the ``mongod`` 
   settings using either a configuration file or the command line.
 
   .. tabs::
 
      .. tab:: Configuration File
         :tabid: config-file
 
         If using a configuration file, set:
 
         .. code-block:: yaml
 
            sharding:
              clusterRole: configsvr
            replication:
              replSetName: <replica set name>
            net:
              bindIp: localhost,<hostname(s)|ip address(es)>

         - :setting:`sharding.clusterRole` to ``configsvr``.
         - :setting:`replication.replSetName` to the desired name of the
           config server replica set.
         - :setting:`net.bindIp` option to one of:

           - The hostname/ip address.
           - A comma-delimited list of hostnames or ip addresses that 
             remote clients can use to connect to the instance (including 
             the other members of the config server replica set as well 
             as other members of the sharded  cluster).
 
           .. include:: /includes/warning-bind-ip-security-considerations.rst
 
         - Additional settings as appropriate to your deployment, such as
           :setting:`storage.dbPath` and :setting:`net.port`. For more
           information on the configuration file, see :ref:`configuration
           options <configuration-options>`.
 
         Start the ``mongod`` with the ``--config`` option set to the 
         configuration file path.
 
         .. code-block:: bash
 
            mongod --config <path-to-config-file>
 
      .. tab:: Command Line
         :tabid: command-line
 
         If using the command line options, start the
         ``mongod`` with the ``--configsvr``, ``--replSet``,
         ``--bind_ip``, and other options as appropriate to your
         deployment. For example:
 
         .. code-block:: bash
 
            mongod --configsvr --replSet <replica set name> --dbpath <path> --bind_ip localhost,<hostname(s)|ip address(es)>
         
         .. include:: /includes/warning-bind-ip-security-considerations.rst
 
         For more information on startup parameters, see the
         :binary:`~bin.mongod` reference page.
 
#. Connect mongosh to one of the config server members.
   
   .. code-block:: javascript
      
      mongosh --host <hostname> --port <port>
 
#. Initiate the replica set.
 
   From ``mongosh``, run the :method:`rs.initiate()` method.
 
   ``rs.initiate()`` can take an optional :ref:`replica set
   configuration document <self-managed-replset-configuration>`. In 
   the replica set configuration document, include:
 
   - The :rsconf:`_id` set to the replica set name specified in either
     the :setting:`replication.replSetName` or the ``--replSet`` option.
   - The :rsconf:`configsvr` field  set to ``true`` for the config server replica set.
   - The :rsconf:`members` array with a document per each member of the replica set.
 
   .. important::
       
      .. include:: /includes/fact-rs-initiate-once-only.rst          
 
   .. code-block:: javascript
 
      rs.initiate(
        {
          _id: "myReplSet",
          configsvr: true,
          members: [
            { _id : 0, host : "cfg1.example.net:27019" },
            { _id : 1, host : "cfg2.example.net:27019" },
            { _id : 2, host : "cfg3.example.net:27019" }
          ]
        }
      )
 
   See :ref:`<self-managed-replset-configuration>` for more 
   information on replica set configuration documents.
