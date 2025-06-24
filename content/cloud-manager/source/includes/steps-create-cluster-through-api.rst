.. procedure::
   :style: normal
      
   .. step:: Retrieve and validate the automation configuration from |mms|.
      
      a. Use the :doc:`automationConfig </reference/api/automation-config>`
         resource to retrieve the configuration. Issue the following
         command, replacing the placeholders with the Variables for Cluster Creation API Resources.
      
         .. code-block:: sh
      
            curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
                 --request GET "https://{+cloudmgr-url+}/api/public/v1.0/groups/{PROJECT-ID}/automationConfig?pretty=true" \
                 --output currentAutomationConfig.json
      
      b. Validate the downloaded Automation Configuration file.
      
         Compare the ``version`` field of the
         ``currentAutomationConfig.json`` with that of the Automation
         Configuration backup file, ``mms-cluster-config-backup.json``. The
         ``version`` value is the last element in both |json| documents.
         You can find this file on any host running the {+mdbagent+} at:
      
         - Linux and macOS: ``/var/lib/mongodb-mms-automation/mms-cluster-config-backup.json``
         - Windows: ``%SystemDrive%\MMSAutomation\versions\mms-cluster-config-backup.json``
      
         If the ``version`` values match, you are working with the current
         version of the Automation Configuration file.
      
   .. step:: Create the top level of the new automation configuration.

      Create a document with the following fields. As you build the
      configuration document, refer the
      :ref:`description of an automation configuration
      <automation-configuration-sample-entity>` for detailed explanations
      of the settings. For examples, see the `MongoDB Labs page  <https://github.com/10gen-labs/mms-api-examples/tree/master/automation/>`__.
      
      .. code-block:: javascript
         :linenos:
      
         {
             "options": {
                 "downloadBase": "/var/lib/mongodb-mms-automation",
             },
             "mongoDbVersions": [],
             "monitoringVersions": [],
             "backupVersions": [],
             "processes": [],
             "replicaSets": [],
             "sharding": []
         }
      
   .. step:: Add the {+magent+} to the automation configuration.

      In the ``monitoringVersions.hostname`` field, enter the hostname of
      the server where |mms| should install the {+magent+}. Use the fully
      qualified domain name that running ``hostname -f`` on the server
      returns, as in the following:
      
      .. code-block:: javascript
         :linenos:
      
         "monitoringVersions": [
           {
             "hostname": "<server_x.example.com>",
             "logPath": "/var/log/mongodb-mms-automation/monitoring-agent.log",
             "logRotate": {
               "sizeThresholdMB": 1000,
               "timeThresholdHrs": 24
             }
           }
         ]
      
      
      This configuration example also includes the ``logPath`` field, which
      specifies the log location, and ``logRotate``, which specifies the
      log thresholds.
      
   .. step:: Add the servers to the automation configuration.
      
      This sharded cluster has 10 MongoDB instances, as described in the
      :ref:`create-cluster-with-api-overview`, each running on its own
      server. Thus, the automation configuration's ``processes`` array will
      have 10 documents, one for each MongoDB instance.
      
      The following example adds the first document to the ``processes``
      array. Replace ``<process_name_1>`` with any name you choose, and
      replace ``<server1.example.com>`` with the |fqdn| of the host.
      
      Add 9 documents: one for each MongoDB instance in your sharded
      cluster.
      
      Specify the ``args2_6`` syntax for the ``processes.<args>`` field.
      The ``processes.args2_6`` object accepts most MongoDB settings and 
      parameters for MongoDB versions 2.6 and later. To learn more, see 
      :ref:`cm-unsupported-mdb-settings`.
      
      .. code-block:: javascript
         :linenos:
      
         "processes": [
           {
             "version": "4.0.6",
             "name": "<process_name_1>",
             "hostname": "<server1.example.com>",
             "logRotate": {
               "sizeThresholdMB": 1000,
               "timeThresholdHrs": 24
             },
             "authSchemaVersion": 5,
             "featureCompatibilityVersion": "4.0",
             "processType": "mongod",
             "args2_6": {
               "net": {
                 "port": 27017
               },
               "storage": {
                 "dbPath": "/data/"
               },
               "systemLog": {
                 "path": "/data/mongodb.log",
                 "destination": "file"
               },
               "replication": {
                 "replSetName": "rs1"
               }
             }
           },
         ]
      
   .. step:: Add the sharded cluster topology to the automation configuration.
      
      Add two replica set documents to the ``replicaSets`` array. Add
      three members to each document.
      
      .. example::
      
         This section adds one replica set member to the first replica set
         document:
      
         .. important::
      
            You must include ``"protocolVersion": 1`` in the root document
            for each replica set.
      
         .. code-block:: javascript
            :linenos:
            :emphasize-lines: 5-13,15
      
            "replicaSets": [
              {
                "_id": "rs1",
                "members": [
                  {
                    "_id": 0,
                    "host": "<process_name_1>",
                    "priority": 1,
                    "votes": 1,
                    "secondaryDelaySecs": 0,
                    "hidden": false,
                    "arbiterOnly": false
                  }
                ],
                "protocolVersion": 1
              }
            ]
      
      In the ``sharding`` array, add the replica sets to the shards, and
      add the config server replica set name, as in the following:
      
      .. code-block:: javascript
         :linenos:
         :emphasize-lines: 3-14, 16
      
         "sharding": [
           {
             "shards": [
               {
                 "tags": [],
                 "_id": "shard1",
                 "rs": "rs1"
               },
               {
                 "tags": [],
                 "_id": "shard2",
                 "rs": "rs2"
               }
             ],
             "name": "sharded_cluster_via_api",
             "configServerReplica": "rs-config",
             "collections": []
           }
         ]
      
   .. step:: Send the updated automation configuration.
      
      Use the :doc:`automationConfig </reference/api/automation-config>`
      resource to send the updated automation configuration.
      
      Issue the following command with path to the updated configuration 
      document and replace the placeholders with the Variables for Cluster Creation API Resources.
      
      .. code-block:: sh
      
         curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
              --header "Content-Type: application/json"
              --request PUT "https://{+cloudmgr-url+}/api/public/v1.0/groups/{PROJECT-ID}/automationConfig?pretty=true" \
              --data @currentAutomationConfig.json
      
      Upon successful update of the configuration, the API returns the HTTP
      ``200 OK`` status code to indicate the request has succeeded.
      
   .. step:: Confirm successful update of the automation configuration.
      
      Retrieve the automation configuration from |mms| and confirm it
      contains the changes. To retrieve the configuration, issue the
      following command, replacing the placeholders with the
      Variables for Cluster Creation API Resources.
      
      .. code-block:: sh
      
         curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
              --request GET "https://{+cloudmgr-url+}/api/public/v1.0/groups/{PROJECT-ID}/automationConfig?pretty=true"
      
   .. step:: Verify that the configuration update is deployed.
      
      Use the :doc:`automationStatus </reference/api/automation-status>`
      resource to verify the configuration update is fully deployed. Issue
      the following command:
      
      .. code-block:: sh
      
         curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
              --request GET "https://{+cloudmgr-url+}/api/public/v1.0/groups/{PROJECT-ID}/automationStatus?pretty=true"
      
      The ``curl`` command returns a |json| object containing the
      ``processes`` array and the ``goalVersion`` key and value. The
      ``processes`` array contains a document for each server that hosts a
      MongoDB instance. The new configuration is successfully deployed when
      all ``lastGoalVersionAchieved`` fields in the ``processes`` array
      equal the value specified for ``goalVersion``.
      
      .. example::
      
         In this response, ``processes[2].lastGoalVersionAchieved`` is
         behind ``goalVersion``. This indicates that the MongoDB instance
         at ``server3.example.com`` is running one version behind the
         ``goalVersion``. Wait several seconds and issue the ``curl``
         command again.
      
         .. code-block:: javascript
            :linenos:
            :emphasize-lines: 2, 15
      
            {
              "goalVersion": 2,
              "processes": [{
                "hostname": "server1.example.com",
                "lastGoalVersionAchieved": 2,
                "name": "ReplSet_0",
                "plan": []
              }, {
                "hostname": "server2.example.com",
                "lastGoalVersionAchieved": 2,
                "name": "ReplSet_1",
                "plan": []
              }, {
                 "hostname": "server3.example.com",
                 "lastGoalVersionAchieved": 1,
                 "name": "ReplSet_2",
                 "plan":[]
              }]
            }
      
      To view the new configuration in the |mms| console:

      1. .. include:: /includes/nav/list-deployment.rst
      
      #. Review the new configuration.
      