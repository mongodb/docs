.. procedure::
   :style: normal

   .. step:: Register an application.

      a. Navigate to :guilabel:`App registrations`.

         i. In your `Azure portal <https://portal.azure.com/>`__ account, search and click :guilabel:`Microsoft Entra ID`.

         #. In the :guilabel:`Manage` section of the left navigation, click :guilabel:`App registrations`.
               
      #. Click :guilabel:`New registration`.

      #. Apply the following values.

         .. list-table::
            :header-rows: 1
            :widths: 20 40

            * - Field
              - Value

            * - :guilabel:`Name`
              - :guilabel:`Cloud Manager Database - Workforce`

            * - :guilabel:`Supported Account Types`
              - :guilabel:`Accounts in this organizational directory only (single tenant)`

            * - :guilabel:`Redirect URI`
              - | - :guilabel:`Public client/native (mobile & desktop)`
                | - ``http://localhost:27097/redirect``

      #. Click :guilabel:`Register`.

      To learn more about registering an application, see `Azure Documentation <https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#register-an-application>`__.

   .. step:: Add a group claim.

      a. Navigate to :guilabel:`Token Configuration`.

         In the :guilabel:`Manage` section of the left navigation,
         click :guilabel:`Token Configuration`.

      #. Click :guilabel:`Add groups claim`.

      #. In the :guilabel:`Edit groups claim` modal, select :guilabel:`Security`.

         What groups you select depend on the type of groups you configured
         in your Azure environment. You may need to select a different
         type of group to send the appropriate group information.

      #. In the :guilabel:`Customize token properties by type` section, only select :guilabel:`Group ID`.

      #. Click :guilabel:`Add`.

      To learn more about adding a group claim, see :azure:`Azure Documentation </active-directory/hybrid/connect/how-to-connect-fed-group-claims>`.

   .. step:: Add a user identifier claim to the access token.

      a. Click :guilabel:`Add optional claim`.

      #. In the :guilabel:`Add optional claim` modal, select :guilabel:`Access`.
               
      #. Select a claim that carries a user identifier that you can
         refer to in MongoDB access logs such as an email.

         You can use the :abbr:`UPN (UserPrincipalName)` claim to identify users with their email address.
               
      #. Click :guilabel:`Add`.
               
      #. In the :guilabel:`Microsoft Graph Permissions` note, check the box, and click :guilabel:`Add`.

      To learn more, see :azure:`Azure Documentation </active-directory/develop/optional-claims>`.

   .. step:: Update the manifest.

      a. In the :guilabel:`Manage` section of the left navigation, click :guilabel:`Manifest`.

      #. Update the :guilabel:`accessTokenAcceptedVersion` from ``null`` to ``2``.

         The number ``2`` represents Version 2 of Microsoft's access
         tokens. Other applications can use this as a signed
         attestation of the Active Directory-managed user's identity.
         Version 2 ensures that the token is a JSON Web Token that
         MongoDB understands.
               
      #. Click :guilabel:`Save`.

      To learn more about adding an optional claim, see :azure:`Azure Documentation </active-directory/develop/reference-app-manifest>`.

   .. step:: Remember metadata.

      a. In the left navigation, click :guilabel:`Overview`.
               
         Copy the :guilabel:`Application (client) ID` value.
       
      #. In the top navigation, click :guilabel:`Endpoints`.
                  
         Copy the :guilabel:`OpenID Connect metadata document` value 
         without the ``/.well-known/openid-configuration`` part.

         You can also get this value by copying the value for 
         ``issuer`` in the :guilabel:`OpenID Connect metadata document` |url|.

      The following table shows what these |azure-ad| UI values map to in our |service| Configuration Properties:
            
      .. list-table::
         :header-rows: 1
         :widths: 50 50
         :stub-columns: 1

         * - Microsoft Entra ID UI 
           - |service| Configuration Property

         * - :guilabel:`Application (client) ID` 
           - | :guilabel:`Client ID`
             | :guilabel:`Audience`

         * - :guilabel:`OpenID Connect metadata document (without /.well-known/openid-configuration)`
           - :guilabel:`Issuer URI`. 
