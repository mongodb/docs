.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-org-access-manager.rst

   .. step:: Click :guilabel:`Add new` :icon:`arrow-right` :guilabel:`Service Account`.

   .. step:: Enter the service account information.

      a. Enter a :guilabel:`Name`.

      #. Enter a :guilabel:`Description`.          

      #. Select a duration from the :guilabel:`Client Secret Expiration` menu. 

      #. From the **Organization Permissions** menu, select the
         :ref:`new role or roles <organization-roles>` for the
         service account.

   .. step:: Click :guilabel:`Create`.

   .. step:: Copy and save the :guilabel:`Client Secret`.

      The client secret acts as the password when creating access tokens. 
                  
      .. warning::

         *This is the only time you can view the full client secret.* Click 
         :guilabel:`Copy` and save it to a secure location. Otherwise, you'll need to 
         generate a new client secret.

   .. step:: Add an :guilabel:`API Access List Entry`.

      a. Click :guilabel:`Add Access List Entry`.
  
      #. Enter an |ipaddr| address or |cidr| block from which you want |service|
         to accept |api| requests for this service account.

         You can also click :guilabel:`Use Current IP Address` if the host
         you are using to access |service| will also make |api| requests
         using this service account.
  
      #. Click :guilabel:`Save`.
