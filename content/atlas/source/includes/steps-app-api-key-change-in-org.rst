.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-org-access-manager.rst

   .. step:: Click the :guilabel:`Applications` tab.

   .. step:: Click :guilabel:`API Keys`.
      
   .. step:: From the ellipsis menu to the right of the |api| Key you want to change, click :guilabel:`Edit`.
      
   .. step:: Edit the :guilabel:`API Key Information`.
      
      On the :guilabel:`Add API Key` page:
      
      a. Modify the :guilabel:`Description`.
      #. In the :guilabel:`Organization Permissions` menu, select the
         :ref:`new role or roles <organization-roles>` for the |api| key.
      
   .. step:: Click :guilabel:`Next`.
      
   .. step:: Edit the :guilabel:`API Access List`.
      
      a. To add an |ipaddr| address or |cidr| block from which you want
         |service| to accept |api| requests for this |api| Key, click
         :guilabel:`Add Access list Entry` and type an |ipaddr| address.
      
         You can also click :guilabel:`Use Current IP Address` if the host
         you are using to access |service| also will make |api| requests
         using this |api| Key.
      #. To remove an |ipaddr| address from the access list, click
         :icon:`trash-alt` to the right of the |ipaddr| address.
      #. Click :guilabel:`Save`.
      
   .. step:: Click :guilabel:`Done`.
