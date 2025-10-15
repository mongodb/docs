.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-federation.rst
      
   .. step:: Choose an organization in which you want to map roles.
      
      a. Click :guilabel:`Manage Organizations`.
      
         |service| displays all organizations where you are an
         :authrole:`Organization Owner` in a table.
      
         - Organizations connected to federated authentication display
           :icon-mms:`ellipsis` in the :guilabel:`Actions` column.
      
         - Organizations unconnected to federated authentication display
           :guilabel:`Connect` in the :guilabel:`Actions` column.
      
      #. To map roles in an organization:
      
         i. Click :guilabel:`Connect` to enable federated authentication
            for that organization if needed.
         #. Click :icon-mms:`ellipsis` and select :guilabel:`View`.
      
   .. step:: Navigate to the :guilabel:`Organization Role Mappings` page.

      a. Click :guilabel:`Create Role Mappings`.
      
         |service| displays the :guilabel:`Organization Role Mappings`
         page.
      
      b. Click :icon-fa5:`trash-alt` :guilabel:`Delete` to the right of the |idp| group you
         want to remove.
      
         |service| displays the
         :guilabel:`Delete role mappings for this group` modal.
      
      c. Click :guilabel:`Delete` to remove all role mappings from this
         |idp| group.
      
         If you don't want to remove all role mappings, click
         :guilabel:`Cancel`.     
