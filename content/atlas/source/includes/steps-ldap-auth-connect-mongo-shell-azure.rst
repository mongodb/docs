.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst   
      
   .. step:: Use {+mongosh+} to connect to your cluster with user credentials that you added to |service|.

      To copy the connection string:
      
      a. Click :guilabel:`Connect`.
      #. Click :guilabel:`LDAP`, and then click :guilabel:`Copy`.
      #. Paste and edit the string with your User DN and password.
      
      .. note::
         
         Connect to your cluster with a user's full DN if User to DN
         Mapping is not enabled.
      
      .. include:: /includes/fact-azure-managed-domain-ldap.rst
      
      Escape spaces in user or group names in the user's full DN:
      
      .. code-block:: sh
      
         --username CN=Jane\ Doe,OU=AADDC\ Users,DC=aadds,DC=example,DC=com
      
      .. note::
      
         If you're using a user's full DN, include only the ``AADDC Users``
         OU (Organizational Unit). Don't include other 
         |azure-ad| groups the user is a
         member of.
      
   .. step:: After connecting to your cluster, run commands to verify the user has the read or write privileges you assigned them.
