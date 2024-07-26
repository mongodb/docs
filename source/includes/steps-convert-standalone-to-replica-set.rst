.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
   
   .. step:: Select the :guilabel:`Clusters` view for your deployment.
      
   .. step:: Click the :guilabel:`...` ellipses for the process and select :guilabel:`Convert to Replica Set`.
      
   .. step:: Enter the replica set name.
      
      Enter the replica set name and click the :guilabel:`Convert` button.
      
      .. important::
          
         The replica set name is immutable once deployed. This setting 
         corresponds to the :rsconf:`_id <rsconf._id>` replica 
         configuration option.
      
      |mms| displays the :guilabel:`Editing Replica Set` view.
      The following steps describe the contents of each section
      in that view.
      
   .. step:: Configure Cluster-Wide Settings
      
      The :guilabel:`Replica Set Configuration` section contains the 
      following cluster-wide configuration settings. Settings
      whose values are grey and non-interactive are immutable.
      
      .. list-table::
         :header-rows: 1
         :widths: 40 60
      
         * - Setting
           - Description
      
         * - :guilabel:`Replica Set Id`
           - .. include:: /includes/extracts/deploy-replica-set-id.rst
      
         * - :guilabel:`Auth Schema Version`
           - .. include:: /includes/extracts/deploy-replica-set-auth-schema-version.rst
      
         * - :guilabel:`Feature Compatibility Version`
           - .. include:: /includes/extracts/deploy-replica-set-feature-compatibility-version.rst
      
         * - :guilabel:`Replica Set Settings`
           - .. include:: /includes/extracts/deploy-replica-set-settings.rst
         
         * - :guilabel:`Process Name`
           - .. include:: /includes/extracts/deploy-process-name.rst
      
         * - :guilabel:`Version`
           - .. include:: /includes/extracts/deploy-version.rst
      
         * - :guilabel:`Data Directory`
           - .. include:: /includes/extracts/deploy-data-directory.rst
      
         * - :guilabel:`Log File`
           - .. include:: /includes/extracts/deploy-log-file.rst
      
   .. step:: Configure each Replica Set Member.
      
   .. step:: Set any advanced configuration options for your MongoDB replica set.
      
   .. step:: Review the changes.
      
      Review the details of the replica set. When ready, click the
      :guilabel:`Save` button.
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
