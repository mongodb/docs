.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
      
   .. step:: Select the :guilabel:`Clusters` view for your deployment.

   .. step:: On the line listing the process, click :guilabel:`Modify`.

   .. step:: Expand the :guilabel:`Advanced Configuration Options` section.
      
   .. step:: Set the ``kerberosKeytab`` option.

      If ``kerberosKeytab`` is not already set:
      
      a. Click :guilabel:`Add Option`.
      
      b. Expand the :guilabel:`Select a Startup Option` list.
      
      c. Search for and select the :guilabel:`kerberosKeytab` option, then 
         click :guilabel:`Add`.
      
      d. In the :guilabel:`kerberosKeytab` column, provide the absolute 
         path to the keytab file.
      
      e. Click :guilabel:`Save`.  
