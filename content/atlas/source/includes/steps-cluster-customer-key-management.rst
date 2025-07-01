.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Modify the cluster's configuration.
      
      For the cluster that contains data that you want to encrypt, click the
      :icon-fa5:`ellipsis-h`, then select :guilabel:`Edit Configuration`.
      
   .. step:: Enable cluster encryption.
    
      a. Expand the :guilabel:`Additional Settings` panel.
      
      b. Toggle the :guilabel:`Manage your own encryption keys` setting to
         :guilabel:`Yes`. 

      c. Verify the status of the :guilabel:`Require Private Networking`
         setting for your {+cluster+}. 

         If you configured Encryption at Rest Using |cmk| (Over Private
         Networking) for |service| at the project level, the status is
         :guilabel:`Active`. If you haven't configured any private
         endpoint connection for your project, the status is
         :guilabel:`Inactive`.  
      
   .. step:: Review and apply your changes.
      
      a. Click :guilabel:`Review Changes`.
      
      b. Review your changes, then click :guilabel:`Apply Changes` to update
         your cluster. 
      
