.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-project-access-manager.rst

   .. step:: Click the :guilabel:`Applications` tab.

   .. step:: Click :guilabel:`API Keys`.
      
   .. step:: Edit the Access List.

      a. Click :icon-mms:`ellipsis` to the right of the |api| Key.
      b. Click :guilabel:`Edit Permissions`.
      
      .. note::
      
         Selecting :guilabel:`Edit Permissions` takes you to the
         organization level of the |service| console.
      
   .. step:: Edit the :guilabel:`API Access List`.
      
      You cannot modify an existing |api| Key access list entry.
      You must delete and re-create it.
      
      a. Click :icon:`trash-alt` to the right of the |ipaddr| address to
         remove it.
      
      #. Add the new |ipaddr| address or |cidr| block from which you want
         |service| to accept |api| requests for this |api| Key. Use one of
         the two options:
      
         - Click :guilabel:`Add access list Entry` and type an |ipaddr| address, or
      
         - Click :guilabel:`Use Current IP Address` if the host
           you are using to access |service| will also make |api| requests
           using this |api| Key.
      
      #. Click :guilabel:`Save`.
      
   .. step:: Click :guilabel:`Done`.
