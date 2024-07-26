.. procedure::
   :style: normal
   
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-security.rst
      
   .. step:: Go to the :guilabel:`Security Settings` dialog for your deployment.
      
      Click the :guilabel:`Settings` tab.
      
   .. step:: Revoke your JWKS token.
      
      a. Scroll to the :guilabel:`OIDC Connection and Authorization
         (Required for OIDC)` section.
      
      #. Click the :guilabel:`REVOKE JWKS` button.
      
         .. note::
      
            This button is idle if there is no |idp| configured.
      
      #. In the :guilabel:`Revoke JWKS tokens?` modal, click :guilabel:`Revoke`. 
