.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-federation.rst
      
   .. step:: Add |idp-provider| to |service| as an Identity Provider.
      
      a. Click :guilabel:`Configure Identity Providers`.
      
      #. If you do not have any Identity Providers configured yet, click
         :guilabel:`Setup Identity Provider`. Otherwise, on the
         :guilabel:`Identity Providers` screen, click
         :guilabel:`Add Identity Provider`.
      
      #. Enter or select the following |saml| Protocol Settings. All fields
         are required:
      
         .. list-table::
             :header-rows: 1
             :widths: 20 40
      
             * - Field
               - Description
      
             * - :guilabel:`Configuration Name`
               - Descriptive name, such as ``Microsoft Entra ID``.
      
             * - :guilabel:`IdP Issuer URI`
               - :guilabel:`Microsoft Entra ID Identifier` you copied from
                 |azure| earlier in the tutorial.
      
             * - :guilabel:`IdP Single Sign-On URL`
               - :guilabel:`Login URL` that you copied from |azure|
                 earlier in the tutorial.
      
             * - :guilabel:`IdP Signature Certificate`
               - ``Base64``-encoded |saml| signing certificate 
                 you downloaded from |azure| earlier in the tutorial.
      
                 You can either:
      
                 - Upload the certificate from your computer, or
       
                 - Paste the contents of the certificate into a text box.
      
             * - :guilabel:`Request Binding`
               - :guilabel:`HTTP POST`.
      
             * - :guilabel:`Response Signature Algorithm`
               - :guilabel:`SHA-256`.
      
      #. Click :guilabel:`Next`.
      
   .. step:: Download the metadata file with details that recognize MongoDB as a Service Provider.
      
      a. Click :guilabel:`Download metadata`. You upload this file to
         |idp-provider| in the next step.
      b. Click :guilabel:`Finish`.
      
   .. step:: Upload the metadata file to |azure| to finish configuring |idp-provider| as an |idp|.
      
      To upload the file, see the screenshot in step 3 of
      :azure:`Enable single sign-on for an app </active-directory/manage-apps/add-application-portal-setup-sso#enable-single-sign-on-for-an-app>`
      in the |azure| documentation. Click :guilabel:`Upload metadata file`
      on the SSO configuration page, as shown in the screenshot in the
      linked |azure| documentation.
      
      .. include:: /includes/optional-idp-relay-state-step.rst
      