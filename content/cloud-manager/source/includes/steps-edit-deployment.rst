.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst
      
   .. step:: On the line listing the deployment item, click :guilabel:`Modify`.
      
   .. step:: Modify the Standalone Settings.
      
      The :guilabel:`Standalone Settings` section contains the following
      configuration settings:
      
      .. list-table::
         :header-rows: 1
         :widths: 25 75
      
         * - Setting
           - Description
      
         * - :guilabel:`Hostname`
           - Hostname to which |mms| deploys the |mongod|. This hostname
             can be a hostname, an |fqdn|, an |ipv4| address, or an |ipv6|
             address. You can only deploy to hosts under |mms| automation.
             For complete documentation on adding servers to |mms|
             automation, see :doc:`/tutorial/add-servers-automation/`.
      
         * - :guilabel:`Port`
           - .. include:: /includes/extracts/deploy-member-configuration-port.rst
      
         * - :guilabel:`Version`
           - .. include:: /includes/extracts/deploy-version.rst
      
         * - :guilabel:`Auth Schema Version`
           - .. include:: /includes/extracts/deploy-replica-set-auth-schema-version.rst
      
         * - :guilabel:`Feature Compatibility Version`
           - .. include:: /includes/extracts/deploy-replica-set-feature-compatibility-version.rst
      
         * - :guilabel:`Log File`
           - .. include:: /includes/extracts/deploy-log-file.rst
      
   .. step:: Modify Advanced Configuration Options.

      The :guilabel:`Advanced Configuration Options` section allows you to
      set MongoDB :doc:`runtime options
      </reference/deployment-advanced-options>` for each MongoDB process
      in your deployment.
      
      To add an option:
      
      a. Click :guilabel:`Add Option`.
      
      #. Click :guilabel:`Select a Startup Option` and select the
         :doc:`configuration option </reference/deployment-advanced-options>`.
      
      #. |mms| displays a context-sensitive input for configuring an
         acceptable value for the selected option.
      
      #. Click :guilabel:`Add` to add the selected option and its
         corresponding value to the process.
      
      For descriptions of the available :guilabel:`Advanced
      Configuration Options`, see
      :doc:`/reference/deployment-advanced-options`.
      
   .. step:: Click :guilabel:`Save`.
      
      |mms| redirects you to the :guilabel:`Deployment` page, where you must
      review your changes before deploying the updated configuration.
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
      