.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
      
   .. step:: Choose :guilabel:`New Standalone`.

      a. Click the :guilabel:`Add` dropdown menu.
      b. Select :guilabel:`New Standalone`.
      
   .. step:: Configure the standalone MongoDB instance.
      
      In the :guilabel:`Process Configuration` section, complete the
      following fields.
      
      .. list-table::
         :widths: 30 70
      
         * - :guilabel:`Name`
           - Type the name for your standalone MongoDB deployment.
      
         * - :guilabel:`Version`
           - Select the MongoDB version for your standalone MongoDB
             deployment.
      
         * - :guilabel:`Auth Schema Version`
           - Select the schema for storing the user data for your
             deployment.
      
         * - :guilabel:`Feature Compatibility` (Optional)
           - Select the :manual:`feature compatibility set
             </reference/command/setFeatureCompatibilityVersion>`.
      
         * - :guilabel:`Hostname`
           - Type the resolvable address for the host serving your MongoDB
             deployment. This can be a hostname, an |fqdn|, an |ipv4|
             address, or an |ipv6| address.
      
         * - :guilabel:`Port`
           - Type the :abbr:`IANA (Internet Assigned Numbers Authority)`
             port number for your MongoDB deployment. The default for
             MongoDB deployments is ``27017``.
      
         * - :guilabel:`DB Directory Path`
           - Type the system path to the
             :setting:`database directory <storage.dbPath>` for this
             deployment. The default is ``/data/myProcess``.
      
         * - :guilabel:`Log File Path`
           - Type the system path to the :setting:`log file
             <systemLog.path>` setting for this deployment. The default is
             ``/data/myProcess/mongodb.log``.
      
   .. step:: Set any Advanced Configuration options for the standalone MongoDB instance.
      
      In the :guilabel:`Advanced Configuration Options` section, add any
      additional runtime options you want to set for your MongoDB 
      deployment.
      
      To add an option:
      
      a. Click :guilabel:`Add Option`.
      b. Select a :doc:`Startup Option
         </reference/deployment-advanced-options>`.
      c. Set an acceptable value for that Startup Option.
      
      For descriptions of :guilabel:`Advanced Configuration Options`, see
      :doc:`/reference/deployment-advanced-options`.
      
   .. step:: Click :guilabel:`Apply`.
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes. 
