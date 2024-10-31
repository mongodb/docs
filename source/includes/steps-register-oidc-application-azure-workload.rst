.. procedure::
   :style: normal

   .. step:: Register an application.

      1. Navigate to :guilabel:`App registrations`.

         a. In your `Azure portal <https://portal.azure.com/>`__ account, search and click :guilabel:`Microsoft Entra ID`.

         b. In the :guilabel:`Manage` section of the left navigation, click :guilabel:`App registrations`.
     
      2. Click :guilabel:`New registration`.

      3. Apply the following values.

         .. list-table::
            :header-rows: 1
            :widths: 20 40

            * - Field
              - Value

            * - :guilabel:`Name`
              - :guilabel:`Ops Manager Database - Workload`

            * - :guilabel:`Supported Account Types`
              - :guilabel:`Accounts in this organizational directory only (single tenant)`

            * - :guilabel:`Redirect URI`
              - :guilabel:`Web`

   .. step:: (Optional) Add groups claim.

      It is a best practice to use service principal identifiers as MongoDB user 
      identifiers while defining access rights in |mms|. If you plan to 
      use this common approach, skip this step. However, if you prefer to use 
      group identifiers such as |azure-ad| Security Group identifier 
      instead, you can set groups claim in your application registration 
      with below steps.

      1. Navigate to :guilabel:`Token Configuration`.

         In the :guilabel:`Manage` section of the left navigation,
         click :guilabel:`Token Configuration`.

      2. Click :guilabel:`Add groups claim`.

      3. In the :guilabel:`Edit groups claim` modal, select :guilabel:`Security`.

         What groups you select depend on the type of groups you configured
         in your Azure environment. You may need to select a different
         type of group to send the appropriate group information.

      4. In the :guilabel:`Customize token properties by type` section, ensure that you only select :guilabel:`Group ID`.

         When you select :guilabel:`Group Id`, Azure sends the
         security group's Object ID.

      5. Click :guilabel:`Add`.

         To learn more about adding a group claim, see `Azure Documentation <https://learn.microsoft.com/en-us/azure/active-directory/hybrid/connect/how-to-connect-fed-group-claims>`__.

   .. step:: Enable an Application ID URI.

      1. Navigate to :guilabel:`Expose an API` 
         in the left sidebar and enable Application ID URI.
      
      2. Enable an Application ID URI.
       
         a. Keep the default Application ID URI assigned by Azure, 
            which is ``<application_client_id>``. Copy and store this value, 
            as |mms| and all MongoDB drivers require this value 
            for |workload| configuration.

   .. step:: Update the manifest.

      1. In the :guilabel:`Manage` section of the left navigation, click :guilabel:`Manifest`.

      2. Update the :guilabel:`accessTokenAcceptedVersion` from ``null`` to ``2``.

         The number ``2`` represents Version 2 of Microsoft's access
         tokens. Other applications can use this as a signed
         attestation of the Active Directory-managed user's identity.
         Version 2 ensures that the token is a JSON Web Token that
         MongoDB understands.
        
      3. Click :guilabel:`Save`.

      To learn more about adding an optional claim, see `Azure Documentation <https://learn.microsoft.com/en-us/azure/active-directory/develop/reference-app-manifest>`__.

   .. step:: Remember metadata.

      1. In the left navigation, click :guilabel:`Overview`.
        
      2. In the top navigation, click :guilabel:`Endpoints`.
           
         Copy the :guilabel:`OpenID Connect metadata document` value 
         without the ``/.well-known/openid-configuration`` part.

         You can also retrieve this value by following the
         :guilabel:`OpenID Connect metadata document` |url| and
         copying the value for ``issuer``.

      The following table shows what |mms| Configuration Properties that 
      these Microsoft Entra ID UI values map to.
     
      .. list-table::
         :header-rows: 1
         :widths: 50 50
         :stub-columns: 1

         * - Microsoft Entra ID UI 
           - |mms| Configuration Property

         * - :guilabel:`OpenID Connect metadata document (without /.well-known/openid-configuration)`
           - :guilabel:`Issuer URI`. 

         * - :guilabel:`Application ID URI (<Application ID>)` 
           - :guilabel:`Audience`
