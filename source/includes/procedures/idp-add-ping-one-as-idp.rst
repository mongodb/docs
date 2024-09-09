.. procedure::
   :style: normal

   .. step:: Download your |idp-provider| origination certificate.

      a. In your |idp-provider| account, log in to the 
         :guilabel:`Administrator` environment.

      #. In the top navigation bar, click :guilabel:`Setup`.

      #. In the secondary navigation bar, click
         :guilabel:`Certificates`. A
         :guilabel:`PingOne Account Origination Certificate` with
         an expiration date displays.

      #. Click the expander arrow to the right of the
         expiration date and click :guilabel:`Download`.

   .. step:: Configure the |saml| application.

      a. In the top navigation bar, click :guilabel:`Applications`.

      #. In the :guilabel:`My Applications` tab,
         click the :guilabel:`Add Application` dropdown menu
         and select :guilabel:`New SAML Application`.

      #. Enter a name to identify the app, such as 
         "MongoDB Atlas", in the :guilabel:`Application Name` field.

      #. Enter a description of the application in the 
         :guilabel:`Application Description` field.

      #. Select a category for the application from the
         :guilabel:`Category` drop-down menu.

      #. Click :guilabel:`Continue to Next Step`.

   .. include:: /includes/steps-source-fed-auth-management.rst

   .. step:: Provide |idp-provider| credentials to |service|.

      a. Click :guilabel:`Identity Providers` in the 
         left-hand pane. If you have previously configured an |idp|,
         click :guilabel:`Add Identity Provider` in the upper-right 
         corner of the page, then click 
         :guilabel:`Setup Identity Provider`. If you have not 
         previously configured an |idp|, click 
         :guilabel:`Setup Identity Provider`.

      #. On the :guilabel:`Configure Identity Provider` screen, enter the following 
         information:

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

   .. step:: On the |idp-provider| configuration page, click
      :guilabel:`I have the SAML configuration` at the top and enter
      the values from the |service| |fmc|.

      .. list-table::
        :widths: 20 40
        :header-rows: 1

        * - Field
          - Value

        * - :guilabel:`Signing Certificate`
          - Certificate that you received from |idp-provider|
            in a prior step

        * - :guilabel:`Protocol Version`
          - ``SAML v2.0``

        * - :guilabel:`Assertion Consumer Service`
          - The :guilabel:`Assertion Consumer Service` URL from the 
            |service| |fmc|

        * - :guilabel:`Entity ID`
          - The :guilabel:`Audience URI` from the 
            |service| |fmc|

        * - :guilabel:`Application URL`
          - Leave blank

        * - :guilabel:`Single Logout Endpoint`
          - Leave blank

        * - :guilabel:`Single Logout Response Endpoint`
          - Leave blank

        * - :guilabel:`Single Logout Binding Type`
          - Leave blank

        * - :guilabel:`Primary Verification Certificate`
          - Do not select a certificate.

        * - :guilabel:`Encrypt Assertion`
          - Unchecked

        * - :guilabel:`Signing`
          - ``Sign Assertion``

        * - :guilabel:`Signing Algorithm`
          - ``RSA_SHA256``

        * - :guilabel:`Force Re-authentication`
          - Unchecked

   .. step:: In the |idp-provider| configuration, click 
      :guilabel:`Continue to Next Step`.

   .. step:: Add application attributes.

      a. For each attribute, click :guilabel:`Add new attribute`.

      #. Provide the following values for the application
         attributes:

         .. list-table::
            :widths: 20 40 20
            :header-rows: 1

            * - :guilabel:`Application Attribute`
              - :guilabel:`Identity Bridge Attribute or Literal Value`
              - :guilabel:`As Literal`

            * - ``SAML_SUBJECT``
              - ``Email``
              - Unchecked

            * - ``firstName``
              - ``First Name``
              - Unchecked

            * - ``lastName``
              - ``Last Name``
              - Unchecked

      #. For each attribute, click :guilabel:`Advanced`.

      #. Add your :guilabel:`Name ID Format`.
            
         You can have the following formats:
            
         - ``urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified``
         - ``urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress``

      #. Click :guilabel:`Continue to Next Step`.

   .. step:: Add the user groups for which you wish to enable federated
      authentication and click :guilabel:`Continue to Next Step`.

   .. step:: On the :guilabel:`Review Setup` page, note the 
      :guilabel:`Issuer` and :guilabel:`idpid` values for use in a
      later step.

   .. step:: In the |service| |fmc|, click :guilabel:`Finish`. On the
      :guilabel:`Identity Providers` screen, click :guilabel:`Modify`
      for the |idp-provider| provider you created earlier.

   .. step:: Replace the placeholder values you assigned earlier
      with the following values:

      .. list-table::
         :widths: 20 40
         :header-rows: 1

         * - Field
           - Value

         * - :guilabel:`Issuer URI`
           - :guilabel:`Issuer` value that you noted earlier.

         * - :guilabel:`Single Sign-On URL`
           - URL that connects to Single Sign-On:
             ``https://sso.connect.pingidentity.com/sso/idp/SSO.saml2?idpid=<IDP_ID>``
             where ``<IDP_ID>`` is the :guilabel:`idpid` value you
             noted earlier.

   .. step:: Click :guilabel:`Next`, then click :guilabel:`Finish`.

   .. step:: On the |idp-provider| configuration page, click
      :guilabel:`Finish`.
