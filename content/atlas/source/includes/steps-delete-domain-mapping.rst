.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-federation.rst
      
   .. step:: Delete the domain.
      
      .. important::
      
        You cannot delete a domain mapping if it is
        :ref:`associated with an IdP <associate-domain-with-idp>`.
        To disassociate a domain from an IdP:
        
        a. From the management console, click :guilabel:`Identity Providers`
            in the left navigation.
            
        #. For the |idp| you want to disassociate from your domain, click
            :icon-fa5:`pencil-alt` :guilabel:`Edit` next to :guilabel:`Associated Domains`.
      
        #. Deselect the domain desired domain.
      
        #. Click :guilabel:`Confirm`.
      
      To delete a domain from the Federation Management instance:
      
      a. Click :guilabel:`Add a Domain`.
      
      #. Open the :guilabel:`Actions` menu for the domain you want to delete.
      
      #. Click :guilabel:`Delete`.
      
      #. Click :guilabel:`Confirm`.   
