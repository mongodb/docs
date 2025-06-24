.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
      
   .. step:: Select the :guilabel:`Clusters` view for your deployment.
      
   .. step:: On the line listing the deployment item, click :guilabel:`Modify`.
      
   .. step:: Verify the desired version number is in the version list.

      In the :guilabel:`Cluster Configuration` section, the
      :guilabel:`Cluster Settings` heading lists the processes with their
      names, MongoDB versions, data directories and log files.
      
      a. Scroll to the :guilabel:`Cluster Settings` heading.
      
      b. Click the :guilabel:`Version` arrow for the first MongoDB process
         in the list. 
      
   .. step:: Change the version of MongoDB for the deployment.
      
      For each MongoDB process that you want to change:
      
      a. Click the current version number for the process.
      b. Click the desired version number.
      
   .. step:: (Optional) Update the ``featureCompatibilityVersion``.
      
      If you are upgrading to a new major version, and wish to enable
      features offered in the new major version, you must also update the
      ``featureCompatibilityVersion``.
      
      For each MongoDB deployment that you want to change:
      
      a. Click the current ``featureCompatibilityVersion`` for the
         deployment.
      b. Click the value that matches the desired version number.
      
   .. step:: Click :guilabel:`Save`.
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
