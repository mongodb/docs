.. procedure::
   :style: normal

   .. step:: Login to Atlas

      `Login to Atlas <https://cloud.mongodb.com>`_.

   .. step:: Click the Connect button

      Click the :guilabel:`connect` button on the cluster management panel.
      The following Atlas screenshot shows the :guilabel:`connect` button:

      .. figure:: /images/connect_panel.png
         :figwidth: 328px
         :alt: connect-panel

   .. step:: Whitelist your IP address and select your connection method

      In the :guilabel:`Setup connection security` step in the modal
      window, check to make sure your IP address is
      in the whitelist for Atlas connections. If it is not, add it.

      The following Atlas screenshot shows the options for adding IP
      addresses in the Atlas UI:

      .. figure:: /images/connectionstringwhitelist.png
         :figwidth: 600px
         :alt: connection-string-whitelist

      If your cluster already has one or more IP Whitelist entries you
      will not have access to the button to add your IP address in the
      modal. Instead, use the following procedure to add your IP address
      to the whitelist:
  
      .. procedure::
         :style: connected

         .. step:: Exit the modal window.

         .. step:: Click the :guilabel:`Security` tab in the Atlas UI.

         .. step:: Click the :guilabel:`IP Whitelist` tab.

         .. step:: Click the green :guilabel:`Add IP Address` button.

         .. step:: Add your IP address.

         .. step:: Return to the Clusters :guilabel:`Overview` tab.

         .. step:: Click the :guilabel:`Connect` button and proceed.

      For more information on whitelisting IP addresses, see
      `Configure Whitelist Entries
      <https://docs.atlas.mongodb.com/security-whitelist/>`_
      in the Atlas documentation.

   .. step:: Copy the connection string
  
      .. include:: /includes/driver_copy_paste.rst