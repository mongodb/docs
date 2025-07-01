.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. step:: Connect to your cluster with the user credentials that you added to |service|.

      Use {+mongosh+} to connect to your cluster. To copy the connection string:
      
      a. Click :guilabel:`Connect`.
      #. Click :guilabel:`LDAP`, and then click :guilabel:`Copy`.
      #. Paste and edit the string with your User DN and password.
      
      .. note::
         
         Connect to your cluster with a user's full DN if User to DN
         Mapping is not enabled.
      
   .. step:: After connecting to your cluster, run commands to verify the user has the read or write privileges you assigned them.
