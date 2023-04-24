.. procedure::
   :style: normal

   .. step:: Open the 
      |fmc|.

      .. procedure::
         :style: connected

         .. step:: Log in to |service| and
            use the drop-down in the upper-left corner to select
            the organization for which you want to manage
            federation settings.

         .. step:: Click :guilabel:`Settings` in the
            left navigation pane.

         .. step:: In :guilabel:`Manage Federation Settings`, click
            :guilabel:`Visit Federation Management App`.

   .. step:: Enter domain 
      mapping information.

      .. procedure::
         :style: connected

         .. step:: Click
            :guilabel:`Add a Domain`.

         .. step:: On the :guilabel:`Domains` screen,
            click :guilabel:`Add Domain`.

         .. step:: Enter the following information for your domain
            mapping:

            .. list-table::
               :widths: 20 40
               :header-rows: 1

              * - Field
                - Description

              * - Display Name
                - Label to easily identify the domain.

              * - Domain Name
                - :wikipedia:`Domain name <Domain_name>` to
                  map.

         .. step:: Click 
            :guilabel:`Next`.

   .. step:: Choose your 
      domain verification method.

      .. note::

         You can choose the verification method once. It cannot be
         modified. To select a different verification method, delete and
         recreate the domain mapping.

      Select the appropriate tab based on whether you are verifying your
      domain by uploading an |html| file or creating a |dns| TXT record:

      .. tabs::

         .. tab:: Upload HTML File
            :tabid: upload-html

            Upload an |html| file containing a verification key to verify
            that you own your domain.

            .. procedure::
               :style: connected

               .. step:: Click 
                  :guilabel:`HTML File Upload`.

               .. step:: Click 
                  :guilabel:`Next`.

               .. step:: Download the 
                  ``mongodb-site-verification.html`` 
                  file that |service| provides.

               .. step:: Upload the |html| file to a web site on your 
                  domain. You must be able to access the file at
                  ``<https://host.domain>/mongodb-site-verification.html``.

               .. step:: Click 
                  :guilabel:`Finish`.

         .. tab:: Create DNS Record
            :tabid: create-dns

            Create a |dns| TXT record with your domain provider to verify
            that you own your domain. Each |dns| record associates a
            specific |service| organization with a specific domain.

            .. procedure::
               :style: connected

               .. step:: Click 
                  :guilabel:`DNS Record`.

               .. step:: Click 
                  :guilabel:`Next`.

               .. step:: Copy the provided TXT record. The TXT record has the
                  following form:

                  .. code-block:: ini
                     :copyable: false

                     mongodb-site-verification=<32-character string>

               .. step:: Log in to your domain name provider (such as 
                  GoDaddy.com or networksolutions.com).

               .. step:: Add the TXT record that |service| provides to your 
                  domain.

               .. step:: Return to |service| 
                  and click :guilabel:`Finish`.

   .. step:: Verify 
      your domain.

      The :guilabel:`Domains` screen displays both unverified and verified
      domains you've mapped to your |idp|. To verify your domain, click the
      target domain's :guilabel:`Verify` button. |service| shows whether
      the verification succeeded in a banner at the top of the screen.
