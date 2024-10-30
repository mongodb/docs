.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-org-access-manager.rst
      
   .. step:: Click :guilabel:`Add new` :icon:`arrow-right` :guilabel:`API Key`.
      
   .. step:: Enter the :guilabel:`API Key Information`.

      a. Enter a :guilabel:`Description`.
      b. In the :guilabel:`Organization Permissions` menu, select the
         :ref:`new role or roles <organization-roles>` for the
         |api| key.
      
   .. step:: Click :guilabel:`Next`.
      
   .. step:: Copy and save the :guilabel:`Public Key`.

      The public key acts as the username when making API requests.
      
   .. step:: Copy and save the :guilabel:`Private Key`.

      The private key acts as the password when making API requests.
      
      .. warning:: Copy and save Public and Private Keys
      
         The :guilabel:`Private Key` is only shown once: *on this page*.
         Click the :guilabel:`Copy` button to add the Private Key to the
         clipboard. Save and secure both the Public and Private Keys.
      
   .. step:: Add an :guilabel:`API Access List Entry`.
      
      a. Click :guilabel:`Add Access list Entry`.
      #. Enter an |ipaddr| address or |cidr| block from which you want |service|
         to accept |api| requests for this |api| Key.
      
         You can also click :guilabel:`Use Current IP Address` if the host
         you are using to access |service| will also make |api| requests
         using this |api| Key.
      #. Click :guilabel:`Save`.
      
   .. step:: Click :guilabel:`Done`.
