.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-agents.rst

   .. step:: Click the :guilabel:`Downloads & Settings` tab.
      
   .. step:: Under :guilabel:`Automation`, select your operating system and follow the instructions to install and run the agent on the migration host.

      To learn more, see :doc:`/tutorial/install-mongodb-agent-to-monitor`.
      
   .. step:: Edit the MongoDB Agent configuration file to enable Live Migration.
      
      a. If you don't already have the  automation-agent.config file open from the
         previous step, open it in your preferred text editor:
         
         .. code-block:: sh
      
            sudo vi /etc/mongodb-mms/automation-agent.config
      
      #. Add or update the following live migration configuration options:
      
         .. list-table::
            :header-rows: 1
            :widths: 20 80
      
            * - Key
              - Value
            * - :setting:`agentFeatureCloudMigrationEnabled`
              - ``true``
            * - :setting:`cloudMigrationOplogPath`
              - Path to the :manual:`oplog </reference/glossary/#std-term-oplog>` files
                for the :doc:`live migration
                </tutorial/migrate-to-atlas>` process. This key is optional
                and if set, requires provisioning enough storage in the
                specified directory for the oplog buffering.
                :website:`Contact MongoDB Support </contact>` if you need
                assistance determining whether you need to set this key for
                your deployment.
      
      
      #. Ensure that the resulting changes to the  automation-agent.config file
         contain the following necessary configuration options for live
         migration:
      
      .. code-block:: ini
      
         mmsGroupId=<The ID of your project>
         mmsApiKey=<The Agent API key of your project>
         agentFeatureCloudMigrationEnabled=true
         cloudMigrationOplogPath=<The path to the oplog files>
      
   .. step:: :ref:`Restart the MongoDB Agent <restart_mdbagent>` to incorporate the updated settings.

      An additional server appears under the :guilabel:`Servers` tab, and
      an additional {+mdbagent+} appears under the :guilabel:`Agents` tab.
