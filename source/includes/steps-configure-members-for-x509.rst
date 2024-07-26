.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
   
   .. step:: Select the :guilabel:`Clusters` view for your deployment.

   .. step:: On the line listing the process, click :guilabel:`Modify`.

   .. step:: Expand the :guilabel:`Advanced Configuration Options` section.
      
   .. step:: Set the x.509 startup options.
      
      a. Click :guilabel:`Add Option` to add each option.
      
         .. list-table::
            :header-rows: 1
            :widths: 30 70
      
            * - Option
              - Value
      
            * - ``clusterAuthMode``
              - Select ``x509``.
      
            * - ``clusterFile``
              - Provide the path to the member PEM Key file.
      
      b. After each option, click :guilabel:`Add`.
      
      
   .. step:: Click :guilabel:`Save`.
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
      