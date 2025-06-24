.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
   
   .. step:: Select the :guilabel:`Clusters` view for your deployment.
      
   .. step:: On the card with the replica set, click :guilabel:`Modify`.
      
   .. step:: Configure the replica set.
      
      In the :guilabel:`Replica Set Configuration` section, complete the
      following fields.
      
      .. list-table::
         :widths: 30 70
      
         * - :guilabel:`Auth Schema Version`
           - Select the schema for storing the user data for your
             deployment.
      
         * - :guilabel:`Feature Compatibility` (Optional)
           - Select the :manual:`feature compatibility set
             </reference/command/setFeatureCompatibilityVersion>`.
      
         * - :guilabel:`Version`
           - Select the MongoDB version for your replica set.
      
         * - :guilabel:`Log File`
           - Specify the location and name of the log file for the 
             |mongod| process. The location must exist on the host.
      
   .. step:: Click :guilabel:`Save`.

   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
      