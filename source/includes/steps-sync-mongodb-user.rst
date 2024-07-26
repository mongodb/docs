.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-security.rst
      
   .. step:: Click the :guilabel:`MongoDB Users` tab.
      
   .. step:: Click :guilabel:`Refresh` to discover any unmanaged users in your deployments.

      This shows all MongoDB users
      present in all managed deployments for the |mms| project and any potential
      conflicts.
      
   .. step:: Select users to manage or unmanage.
      
      Set the :guilabel:`Sync` switch to ``Yes`` for each MongoDB user you
      want |mms| to manage. To manage all MongoDB users for the |mms| project, click the
      :guilabel:`Sync All` link.
      
      Set the :guilabel:`Sync` switch to ``No`` to unmanage the MongoDB
      user.
      
      .. list-table::
         :widths: 15 15 70
         :header-rows: 1
      
         * - Current Sync State
      
           - New Sync State
      
           - What Changes
      
         * - ``NO``
      
           - ``YES``
      
           - |mms| now manages the user.
      
             .. note:: 
      
                If there are any potential conflicts with other discovered
                users, you will be presented with the option to resolve
                conflicts.
      
         * - ``YES``
      
           - ``NO``
      
           - |mms| no longer manages the user.
      
             .. warning::
             
                If :guilabel:`Ensure Consistent Set` is ``YES``, the user
                is deleted from all MongoDB databases |mms| currently
                manages for this project.
      
             .. note::
      
                If :guilabel:`Ensure Consistent Set` is ``NO``, |mms| no
                longer manages the users in that MongoDB database, but
                these users can be managed through a direct connection to
                that database.
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.
      
   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
      
   .. step:: Click :guilabel:`Refresh` to verify the desired users have been removed from your deployments.
