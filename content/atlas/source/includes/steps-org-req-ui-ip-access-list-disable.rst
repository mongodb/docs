.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-org-settings.rst   
      
   .. step:: Click :guilabel:`Define IP Access List for the Atlas User Interface`.
      
      Go to 
      :guilabel:`Define IP Access List for the Atlas User Interface`.
      
   .. step:: Click :guilabel:`Configure`.
      
      The :guilabel:`IP Access List for the {+atlas-ui+}` page opens. If the
      list was previously enabled, the {+atlas-ui+} shows :guilabel:`Enabled`
      next to the page title.
      
   .. step:: Click :guilabel:`Disable`.
      
      |service| asks you to confirm. If you disable the IP access list,
      |service|:
      
      - Disables all IP restrictions for the {+atlas-ui+}` for the organization.
      - Retains the IP access list that you had previously configured.
        API keys that inherit from this IP access list no longer use the list
        for IP access restrictions.
      
   .. step:: Confirm that you want to disable IP access list.
      
      Click :guilabel:`Disable` to confirm.
      
      The {+atlas-ui+} shows :guilabel:`Disabled` next to the page title.    
