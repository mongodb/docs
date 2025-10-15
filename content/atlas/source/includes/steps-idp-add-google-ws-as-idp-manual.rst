.. procedure::
   :style: normal
      
      
   .. step:: Add a new application to your Google Workspace account.
      
      a. In your |idp-provider| administrator account, open the 
         :guilabel:`Apps` dropdown menu and click 
         :guilabel:`Web and mobile apps`.
      
      b. Open the :guilabel:`Add App` dropdown menu and click 
         :guilabel:`Add custom SAML app`.
      
      c. Enter a name to identify the app , such as "MongoDB Cloud," in the 
         :guilabel:`App name` field.
      
      d. Select an :guilabel:`App icon` if desired.
      
      e. Click the :guilabel:`Continue` button.
      
   .. step:: Retrieve SSO credentials from Google Workspace.
      
      a. Navigate to the :guilabel:`Option 2` section. 
      
      b. Copy the :guilabel:`SSO URL` and :guilabel:`Entity ID`, and 
         download the :guilabel:`Certificate` provided. These will be used
         by the |fmc| in a subsequent step. Leave this page open.

   .. include:: /includes/nav/steps-federation.rst
      
   .. step:: Provide Google Workspace Credentials to |service|.
      
      a. Click :guilabel:`Identity Providers` in the left-hand pane. If you
         have previously configured an |idp|, click 
         :guilabel:`Add Identity Provider` in the upper-right corner of the
         page, then click :guilabel:`Setup Identity Provider`. If you have 
         not previously configured an |idp|, click 
         :guilabel:`Setup Identity Provider`.
      
      b. On the :guilabel:`Create Identity Provider` screen, enter the following 
         information:
      
         .. list-table::
            :widths: 20 40
            :header-rows: 1
      
            * - Field
              - Value
      
            * - :guilabel:`Configuration Name`
              - A descriptive name that identifies the configuration.
      
            * - :guilabel:`Issuer URI` 
              - :guilabel:`Entity ID` that you received from 
                |idp-provider| in the previous step.
      
            * - :guilabel:`Single Sign-On URL`
              - :guilabel:`SSO URL` that you received from 
                |idp-provider| in the previous step.
      
            * - :guilabel:`Identity Provider Signature Certificate`
              - ``.cer`` file that you received from |idp-provider|
                in the previous step.
      
                You can either:
      
                - Upload the certificate from your computer
       
                - Paste the contents of the certificate into a text box
      
            * - :guilabel:`Request Binding`
              - ``HTTP POST``
      
            * - :guilabel:`Response Signature Algorithm`
              - ``SHA-256``
      
      b. Click the :guilabel:`Next` button.
      
   .. step:: Get |service| Metadata for Google Workspace.

      a. In the |fmc|, copy the :guilabel:`Assertion Consumer Service URL`
         and :guilabel:`Audience URI`.
      
      b. Click the :guilabel:`Finish` button.
      
      c. Copy the :guilabel:`Login URL` on the |idp| tile that 
         |idp-provider| creates for your application.
      
   .. step:: Provide |service| Metadata to Google Workspace.
      
      a. Return to the |idp-provider| configuration page and click the
         :guilabel:`Continue` button.
      
      b. Fill in the data fields with the following values:
      
         .. list-table::
            :widths: 20 40
            :header-rows: 1
      
            * - Field
              - Value
      
            * - :guilabel:`ACS URL`
              - The :guilabel:`Assertion Consumer Service URL` provided by 
                |service|.
      
            * - :guilabel:`Entity ID`
              - The :guilabel:`Audience URI` provided by |service|.
      
            * - :guilabel:`Start URL`
              - The :guilabel:`Login URL` provided by |service|.
      
            * - :guilabel:`Signed Response`
              - Check this box.
      
            * - :guilabel:`Name ID Format`
              - ``UNSPECIFIED``
      
            * - :guilabel:`Name ID`
              - ``Basic Information > Primary Email``  
      
      c. Click the :guilabel:`Continue` button.
      
   .. step:: Configure Google Workspace Attributes.

      a. In |idp-provider|, add each of the following value pairs as
         distinct mappings by clicking the :guilabel:`Add Mapping` button
         for each pair. :guilabel:`App attribute` values are 
         case-sensitive.
      
         .. list-table::
            :widths: 20 40
            :header-rows: 1
      
            * - Google Directory attributes
              - App attributes
      
            * - Basic Information > First name
              - ``firstName``
      
            * - Basic Information > Last name
              - ``lastName``
      
      #. If you are configuring role mapping, proceed to the next step.
         Otherwise, click the :guilabel:`Finish` button and proceed
         to **Enable User Access via Google Workspace**.
      
   .. step:: (Optional) Configure role mapping.

      a. To configure role mapping in |idp-provider|, create a single
         group attribute in the :guilabel:`Group membership (optional)`
         section as follows:
      
         .. list-table::
            :widths: 20 40
      
            * - Google groups
              - Search for and select all Google groups which you intend to
                map to |service| roles, ensuring that they are all included in 
                a single row. For more information on this attribute, 
                consult `About group membership mapping <https://support.google.com/a/answer/11143403?hl=en>`__.
      
            * - App attributes
              - ``memberOf``
      
      #. Click the :guilabel:`Finish` button.
      
   .. step:: Enable User Access via Google Workspace.
      
      a. Click the arrow in the top-right corner of the 
         :guilabel:`User Access` panel to expand it.
      
      b. Enable user access. You can either:
      
         - Click :guilabel:`ON for everyone` in the 
           :guilabel:`Service status` pane to enable federated 
           authentication for all users in your |idp-provider|.
      
         - Select specific :guilabel:`Groups` or 
           :guilabel:`Organizational Units` from the collapsible menus on 
           the left for which you wish to enable federated authentication.
           The |idp-provider| help pages provide more information on 
           managing `Groups <https://support.google.com/a/topic/25838?hl=en&ref_topic=9197>`__
           and `Organizational Units <https://support.google.com/a/answer/182537?hl=en>`__.
      