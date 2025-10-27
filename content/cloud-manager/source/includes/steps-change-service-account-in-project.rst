.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-project-access-manager-apps.rst

   .. step:: Click :guilabel:`Service Accounts`.

   .. step:: Click the name of a service account.

   .. step:: Edit the :guilabel:`Service Account Info`.

      To modify the :guilabel:`Name` or :guilabel:`Description`, 
      click :icon-lg:`Edit`.

   .. step:: Generate a new client secret.

      a. Click :guilabel:`Generate New Client Secret`

      #. Choose a duration for the client secret from the menu. The 
         client secret expires after this duration.

      #. Click :guilabel:`Generate New`.

      #. Click :guilabel:`Copy` and save the client secret to a secure location.
         This is the only time you can view the full client secret.

   .. step:: Edit the :guilabel:`Project Permissions`.

      a. Click :guilabel:`Edit Permissions`.

      #. From the :guilabel:`Project Permissions` menu, select the
         :ref:`new role or roles <project-roles>` for the
         service account.

      #. Click :guilabel:`Save and next`.

         .. important::

            The service account credentials remain active until they expire
            or a user revokes them.

   .. step:: Edit the :guilabel:`API Access List`.

      a. To add an |ipaddr| address or |cidr| block from which you want
         |mms| to accept |api| requests for this service account, click
         :guilabel:`Add Access List Entry` and type an |ipaddr| address.

         You can also click :guilabel:`Use Current IP Address` if the host
         you are using to access |mms| also will make |api| requests
         using this service account.

      #. To remove an |ipaddr| address from the access list, click
         :icon:`trash-alt` to the right of the |ipaddr| address.

      #. Click :guilabel:`Save`.