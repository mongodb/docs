.. procedure::
   :style: normal

   .. step:: Download your |idp-provider| origination 
      certificate.
      
      a. In your |idp-provider| account, click
         :guilabel:`Admin` in the upper right corner to access
         the Administrator environment.

      #. In the left-hand pane, navigate to 
         :guilabel:`Applications` -> :guilabel:`Applications`.

      #. Click :guilabel:`Create App Integration`.
         Select :guilabel:`SAML 2.0` for the 
         :guilabel:`Sign-in method` and click
         :guilabel:`Next`.

      #. Fill in the :guilabel:`App name` text field with
         your desired application name.

      #. Optionally, add a logo image and set app 
         visibility. Click :guilabel:`Next`.

      #. On the :guilabel:`Configure SAML` screen, enter the
         following information:

         .. list-table::
            :widths: 20 40
            :header-rows: 1

            * - Field
              - Value

            * - :guilabel:`Single sign-on URL`
              - ``http://localhost``

            * - :guilabel:`Audience URI`
              - ``urn:idp:default``
            
         .. important::
              
            These are placeholder values and are **not** intended
            for use in production. You will replace them in a later
            step.

         Leave the other fields empty or set to their default values
         and click :guilabel:`Next` at the bottom of the page.

      #. On the :guilabel:`Feedback` screen, select
         :guilabel:`I'm an Okta customer adding an internal app` and
         click :guilabel:`Finish`.

      #. At the bottom of the page under the heading
         :guilabel:`SAML Signing Certificates`, locate the newest
         certificate with a :guilabel:`Status` of ``Active``--this 
         is the certificate you just created.

         Click :guilabel:`Actions` and select 
         :guilabel:`Download certificate` from the drop-down menu.
         The generated certificate is a ``.cert`` file. You must
         convert it to a ``.pem`` certificate for use later in this
         procedure. To do this, open a terminal of your choosing and
         run the following:

         .. code-block:: sh

            openssl x509 -in path/to/mycert.crt -out path/to/mycert.pem -outform PEM 

   .. include:: /includes/steps-source-fed-auth-management.rst

   .. step:: Provide |idp-provider| credentials to |service|.

      a. Click :guilabel:`Identity Providers` in the 
         left-hand pane. If you have previously configured an |idp|,
         click :guilabel:`Add Identity Provider` in the upper-right 
         corner of the page, then click 
         :guilabel:`Setup Identity Provider`. If you have not 
         previously configured an |idp|, click 
         :guilabel:`Setup Identity Provider`.

      #. On the :guilabel:`Configure Identity Provider` 
         screen, enter the following information:

         .. list-table::
            :widths: 20 40
            :header-rows: 1

            * - Field
              - Value

            * - :guilabel:`Configuration Name`
              - Descriptive label that identifies the configuration

            * - :guilabel:`Issuer URI`
              - :guilabel:`Fill with Placeholder Values`

            * - :guilabel:`Single Sign-On URL`
              - :guilabel:`Fill with Placeholder Values`

            * - :guilabel:`Identity Provider Signature Certificate`
              - Certificate you received from |idp-provider|
                in a prior step

            * - :guilabel:`Request Binding`
              - ``HTTP POST``

            * - :guilabel:`Response Signature Algorithm`
              - ``SHA-256``

      #. Click the :guilabel:`Next` button to see the values
         for the |idp-provider| configuration.

      #. Click :guilabel:`Finish`.

   .. step:: Configure your SAML integration.

      a. In your |idp-provider| account, return to the page
         for your SAML application and ensure the :guilabel:`General`
         tab is selected.

      #. In the :guilabel:`SAML Settings` pane, click
         :guilabel:`Edit`. 
            
      #. On the :guilabel:`General Settings` page, click
         :guilabel:`Next`.

      #. On the :guilabel:`Configure SAML` screen, enter the
         following information:

         .. list-table::
            :widths: 20 40
            :header-rows: 1

            * - Okta Data Field
              - Value

            * - :guilabel:`Single sign on URL`
              - :guilabel:`Assertion Consumer Service URL` from the
                |service| FMC.

                Checkboxes:

                - Check :guilabel:`Use this for Recipient URL and Destination URL`.
                - Clear :guilabel:`Allow this app to request other SSO URLs`.

            * - :guilabel:`Audience URI (SP Entity ID)`
              - :guilabel:`Audience URI` from the |service| FMC.

            * - :guilabel:`Default RelayState`
              - .. include:: /includes/optional-idp-relay-state-step.rst

            * - :guilabel:`Name ID format`
              - Unspecified

            * - :guilabel:`Application username`
              - Email

            * - :guilabel:`Update application username on`
              - Create and update

      #. Click the :guilabel:`Click Show Advanced Settings` link in the
         Okta configuration page and ensure that the following values are
         set:

         .. list-table::
            :widths: 20 40
            :header-rows: 1

            * - Okta Data Field
              - Value

            * - :guilabel:`Response`
              - ``Signed``

            * - :guilabel:`Assertion Signature`
              - ``Signed``

            * - :guilabel:`Signature Algorithm`
              - ``RSA-SHA256``

            * - :guilabel:`Digest Algorithm`
              - ``SHA256``

            * - :guilabel:`Assertion Encryption`
              - ``Unencrypted``

      #. Leave the remaining :guilabel:`Advanced Settings` fields in their
         default state.

      #. Scroll down to the :guilabel:`Attribute Statements (optional)`
         section and create four attributes with the following values:

         .. list-table::
            :widths: 20 40 40
            :header-rows: 1

            * - Name
              - Name Format
              - Value

            * - firstName
              - Unspecified
              - ``user.firstName``

            * - lastName
              - Unspecified
              - ``user.lastName``

         .. important::

            The values in the **Name** column are case-sensitive. Enter
            them exactly as shown.

         .. note::

            These values may be different if Okta is connected to an Active
            Directory. For the appropriate values, use the Active Directory
            fields that contain a user's first name, last name, and full
            email address.

      #. (Optional) If you plan to use 
         :doc:`role mapping </security/manage-role-mapping/>`, 
         scroll down to the 
         :guilabel:`Group Attribute Statements (optional)` section 
         and create an attribute with the following values:

         .. list-table::
            :widths: 25 25 25 25
            :header-rows: 1
                
            * - Name
              - Name Format
              - Filter
              - Value

            * - memberOf
              - Unspecified
              - Matches regex
              - ``.*``

         This filter matches all group names associated with the user. 
         To filter the group names sent to Atlas further, 
         adjust the :guilabel:`Filter` and :guilabel:`Value` fields.

      #. Click :guilabel:`Next` at the bottom of the 
         page.

      #. On the :guilabel:`Feedback` screen, 
         click :guilabel:`Finish`.

   .. step:: Replace placeholder values in the |service| 
      |fmc|.

      a. On the Okta application page, click
         :guilabel:`View Setup Instructions`
         in the middle of the page.

      #. In the |service| |fmc|, navigate to the
         :guilabel:`Identity Providers` page. Locate your
         |idp-provider| and click :guilabel:`Edit`.

      #. Replace the placeholder values in the following fields:

         .. list-table::
            :widths: 20 40
            :header-rows: 1

            * - FMC Data Field
              - Value

            * - :guilabel:`Issuer URI`
              - :guilabel:`Identity Provider Issuer` value from
                the Okta Setup Instructions page.

            * - :guilabel:`Single Sign-on URL`
              - :guilabel:`Identity Provider Single Sign-On URL`
                value from the Okta Setup Instructions page.

            * - :guilabel:`Identity Provider Signature Certificate`
              - Copy the :guilabel:`X.509 Certificate` from the 
                Okta Setup Instructions page and paste the contents
                directly.

      #. Click :guilabel:`Next`.

      #. Click :guilabel:`Finish`.

   .. step:: Assign users to your |idp-provider| 
      application.

      a. On the Okta application page, click the
         :guilabel:`Assignments` tab.

      #. Ensure that all your |service| organization users
         who will use Okta are enrolled.