.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-processes.rst
      
   .. step:: Select the :guilabel:`Clusters` view for your deployment.
      
   .. step:: On the card with the replica set, click :guilabel:`Modify`.
      
   .. step:: In :guilabel:`Member Configuration`, click :guilabel:`Add a Mongod`.
      
   .. step:: In :guilabel:`Hostname`, select the host that you want to add as a new member of the replica set.
      
      Use the following procedure to add the host if it doesn't appear
      in the :guilabel:`Hostname` list:
      
      a. In :guilabel:`Hostname`, select :guilabel:`New Server`.
      
         If no hosts have yet been added to the project, the
         :guilabel:`Hostname` list does not appear. Click
         :guilabel:`Install Agent` instead.
      
      b. In the :guilabel:`Add New Server` dialog, select your operating
         system and click :guilabel:`Next`.
      
      c. Follow the
         :doc:`instructions to install </tutorial/nav/install-mongodb-agent>`
         a {+mdbagent+} on the new host.
      
      .. note::
      
        When adding a new member to a replica set, set ``Build Indexes``
        to ``True`` if you want the member's ``mongod`` to build indexes.
        You cannot change this value after the {+aagent+} adds the
        new member to the replica set. To learn more, see
        :rsconf:`members[n].buildIndexes <rsconf.members[n].buildIndexes>`.
      
      .. warning::
      
        If your replica set uses |tls|, you must create and install the
        necessary |tls| certificates on the new replica set member host first.
        Then, set the |tls| settings for the |mongod| or |mongos| process
        for the new replica set member on that host. Automation does not
        create and install the certificates and configure these settings
        automatically. If you do not configure |tls| on the new member,
        you cannot add it to the existing |tls|-enabled replica set. To
        learn how to enable |tls| on the new replica set member, see
        :doc:`/tutorial/enable-ssl-for-a-deployment`.
      
      d. In the :guilabel:`Replica Set Configuration` section, complete
         the following fields for the new member:
      
         .. list-table::
            :widths: 30 70
      
            * - :guilabel:`Auth Schema Version`
              - Select the schema for storing the user data for your
                deployment. See :manual:`Upgrade to SCRAM </release-notes/3.0-scram/>`
                for more information.
      
            * - :guilabel:`Feature Compatibility` (Optional)
              - Select the :manual:`feature compatibility set </reference/command/setFeatureCompatibilityVersion>`.
      
            * - :guilabel:`Version`
              - Select the MongoDB version for your replica set.
      
            * - :guilabel:`Data Directory`
              - Specify the full path of the directory where the ``mongod``
                process will store data files.

                :gold:`IMPORTANT:` Make sure the new member's data directory *doesn't* 
                contain data. The new member will copy the data from an existing member.
      
                If the new member is in a :manual:`recovering </reference/glossary/#std-term-recovering>` 
                state, it must exit and become a :manual:`secondary </reference/glossary/#std-term-secondary>` 
                before MongoDB can copy all data as part of the replication process. 
                This process doesn't require administrator intervention.

            * - :guilabel:`Log File`
              - Specify the location and name of the log file for the ``mongod``
                process on the new host.
      
   .. step:: Click :guilabel:`Save`.

   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.  
