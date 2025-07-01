.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Toggle the button next to :guilabel:`LDAP Authentication` to :guilabel:`On`.
      
      .. note::
      
         You might incur additional costs when you enable this feature.
         See :ref:`advanced-security`.
      
   .. step:: Enter the server details and bind credentials for all of your LDAP servers in the :guilabel:`Configure Your LDAP Server` panel.

      You may list multiple servers separated by commas. You cannot use different ports.
      
   .. step:: Enter certificates issued from a Certificate Authority (CA) for your LDAP servers, separated by commas, in the :guilabel:`CA Root Certificate` field.
      
      You may provide self-signed certificates.
      
   .. step:: Click :guilabel:`Verify and Save`.
      
      Wait for |service| to deploy your changes. |service| verifies that
      your clusters can connect to, authenticate with, and query your LDAP
      servers using the configuration details that you provided.
      