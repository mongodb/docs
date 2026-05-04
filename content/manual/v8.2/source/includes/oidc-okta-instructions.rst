.. procedure::
   :style: normal

   .. step:: Create an application in Okta
      
      In your Okta :guilabel:`Admin` dashboard, use the left navigation pane
      to go to :guilabel:`Applications → Applications`.

      a. On the :guilabel:`Applications` screen, click :guilabel:`Create App
         Integration`.

      #. In the :guilabel:`Sign-in method` section, select :guilabel:`OIDC - OpenID Connect`.

      #. In the :guilabel:`Application type` section, select :guilabel:`Native Application`.

      #. Click :guilabel:`Next`.

      To learn more, see `Create OIDC app Integrations
      <https://help.okta.com/en-us/content/topics/apps/apps_app_integration_wizard_oidc.htm>`__.
    
   .. step:: Configure your :guilabel:`New Native App Integration`

      After you create an app integration, you are automatically redirected to the
      :guilabel:`New Native App Integration` screen.

      a. In the :guilabel:`App integration name` field, enter a name for your
         application.

      #. In the :guilabel:`Grant type` field, select grant types.

         Enable the following grant types:

         - :guilabel:`Authorization Code` or :guilabel:`Device Authorization`
         - *(Optional)* :guilabel:`Refresh Token`
           
           Enabling refresh tokens provides a better user experience. When 
           refresh tokens are not enabled, users must re-authenticate with 
           the identity provider once their access token expires.

      #. In the :guilabel:`Sign-in redirect URIs` section, enter a URL.
          
         Enter the following URL: ``http://localhost:27097/redirect``.

      #. In the :guilabel:`Assignments` section, configure the :guilabel:`Controlled access`
         and :guilabel:`Enable immediate access` fields.

         i. For the :guilabel:`Controlled access` field, select :guilabel:`Allow everyone
            in your organization to access`.

         ii. For :guilabel:`Enable immediate access` field, ensure :guilabel:`Enable immediate
             access with Federation Broker Mode` is checked.

      #. Click :guilabel:`Save`.

      To learn more, see `Create OIDC app integrations
      <https://help.okta.com/en-us/content/topics/apps/apps_app_integration_wizard_oidc.htm>`__.

   .. step:: Configure PKCE and obtain client ID

      On your application dashboard, go to the :guilabel:`General` tab
      and configure the following:

      a. In the :guilabel:`Client ID` field, click the :icon-fa5:`clipboard-list`
         icon to copy the client ID for later use.

      #. In the :guilabel:`Proof Key for Code Exchange (PKCE)` field, ensure
         :guilabel:`Require PKCE as additional verification` is enabled (checked
         by default).

   .. step:: Add an authorization server

      In the left navigation pane, go to :guilabel:`Security → API`. Click
      :guilabel:`Add Authorization Server`.

      a. In the :guilabel:`Name` field, enter a name for your server.

      #. In the :guilabel:`Audience` field, paste the client ID from the previous
         step.

      #. *(Optional)* In the :guilabel:`Description` field, enter a description of
         your server.

      #. Click :guilabel:`Save`.

      To learn more, see `Create an Authorization Server
      <https://help.okta.com/en-us/content/topics/security/api-config-auth-server.htm>`__.

   .. step:: Find and save the issuer URI

      After you create your authorization server, you are automatically
      redirected to your authorization server's screen.

      Under the :guilabel:`Settings` tab, save the issuer URI by copying the
      first part of the :guilabel:`Metadata URI` up to the ``.well-known``
      section. The URI structure should be similar to:
      ``https://trial4238026.okta.com/oauth2/ausabgmhveoOQSMsE697``.

   .. step:: Add :guilabel:`Groups` claim

      On your authorization server screen, go to the :guilabel:`Claims` tab and
      click :guilabel:`Add Claim`.

      a. Configure :guilabel:`Groups` claim with the following configuration information:

         .. list-table::
            :header-rows: 1

            * - Field
              - Value

            * - :guilabel:`Name`
              - Enter a name for your claim.

            * - :guilabel:`Include in token type`
              - Click the drop-down and select :guilabel:`Access Token`.

            * - :guilabel:`Value type`
              - Click the drop-down and select :guilabel:`Groups`.

            * - :guilabel:`Filter`
              - Click the drop-down and select :guilabel:`Matches regex`. Next
                to the drop-down, enter ``.*``.

            * - :guilabel:`Disable claim`
              - Do not check.

            * - :guilabel:`Include in`
              - Select :guilabel:`Any scope`.

      #. Click :guilabel:`Create`.

      To learn more, see `Create Claims
      <https://help.okta.com/en-us/content/topics/security/api-config-claims.htm>`__.

   .. step:: Create an access policy

      On your authorization server screen, go to the :guilabel:`Access Policies`
      tab and click :guilabel:`Add Policy`.

      a. In the :guilabel:`Name` field, enter a policy name.

      #. In the :guilabel:`Description` field, enter a description for the policy.

      #. In the :guilabel:`Assign to` field, select :guilabel:`All clients`.

      #. Click :guilabel:`Create Policy`.

      To learn more, see `Create an Access Policy
      <https://help.okta.com/en-us/content/topics/security/api-config-access-policies.htm>`__.

   .. step:: Create a rule for the access policy

      Under the :guilabel:`Access Policies` tab, click :guilabel:`Add Rule`.

      a. In the :guilabel:`Rule Name` field, enter a name for the access policy.

      #. For :guilabel:`IF Grant Type is`, select a grant type.

         When configuring grant types, select the appropriate option based on the
         client behavior:

         - If the client is acting on behalf of itself, select :guilabel:`Client
           Credentials`.
         - If the client is acting on behalf of a user, select the following:

           - :guilabel:`Authorization Code`
           - :guilabel:`Device Authorization`

      #.  Add rule configurations based on your organization's security policy.
          
          Example Okta rule configuration:

          .. list-table::
             :header-rows: 1

            * - Field
              - Value

            * - :guilabel:`AND user is`
              - Select :guilabel:`Any user assigned to the app`.

            * - :guilabel:`AND Scopes requested`
              - Select :guilabel:`Any scopes`.

            * - :guilabel:`THEN Use this inline hook`
              - None (disabled)

            * - :guilabel:`AND Access token lifetime is`
              - :guilabel:`1 Hours`

            * - :guilabel:`AND Refresh token lifetime is`
              - Click the second drop-down and select :guilabel:`Unlimited`.

            * - :guilabel:`but will expire if not used every`
              - Enter :guilabel:`7 days`.

      #. Click :guilabel:`Create Rule`.

      To learn more, see `Create Rules for each Access Policy
      <https://developer.okta.com/docs/guides/customize-authz-server/main/#create-rules-for-each-access-policy>`__.

   .. step:: Create a group

      In the left navigation pane, go to :guilabel:`Directory → Groups` and click
      :guilabel:`Add Group`.

      a. In the :guilabel:`Name` field, name your directory ``OIDC``.

      #. *(Optional)* In the :guilabel:`Description` field, enter a description
         for your rule.

      #. Click :guilabel:`Save`.

      To learn more, see `Create a Group
      <https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-groups-create.htm>`__.

   .. step:: Add a user to your organization

      In the left navigation pane, go to :guilabel:`Directory → People` and click
      :guilabel:`Add Person`.

      a. Provide user details by entering the following values in the 
         corresponding fields:

         .. list-table::
            :header-rows: 1

            * - Field
              - Value

            * - :guilabel:`User type`
              - Select :guilabel:`User`.

            * - :guilabel:`First name`
              - Provide name as needed.

            * - :guilabel:`Last name`
              - Provide name as needed.

            * - :guilabel:`Username`
              - Enter an email as a username.

            * - :guilabel:`Primary email`
              - Enter an email. The email must be same as the one used for the
                :guilabel:`Username` field.

            * - :guilabel:`Secondary email`
              - Optional.

            * - :guilabel:`Groups`
              - Enter :guilabel:`OIDC`.

            * - :guilabel:`Activation`
              - Select :guilabel:`Activate Now` and check :guilabel:`I will set password`.

            * - :guilabel:`Password`
              - Enter a password.

            * - :guilabel:`User must change password on first login`
              - Select :guilabel:`Optional`

      #. Click :guilabel:`Save`.

      To learn more, see `Add Users Manually
      <https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-add-users.htm>`__.