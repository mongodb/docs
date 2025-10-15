.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-federation.rst
      
   .. step:: Enter domain mapping information.
      
      a. Click :guilabel:`Add a Domain`.
      
      #. On the :guilabel:`Domains` screen, click :guilabel:`Add Domain`.
      
      #. Enter the following information for your domain mapping:
      
         .. list-table::
            :widths: 20 40
            :header-rows: 1
      
            * - Field
              - Description
      
            * - Display Name
              - Name to easily identify the domain.
      
            * - Domain Name
              - :wikipedia:`Domain name <Domain_name>` to
                map.
      
      #. Click :guilabel:`Next`.
      
   .. step:: Choose how to verify your domain.

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
      
            a. Click :guilabel:`HTML File Upload`.
      
            #. Click :guilabel:`Next`.
      
            #. Download the ``mongodb-site-verification.html`` file
               that |service| provides.
      
            #. Upload the |html| file to a web site on your domain. You
               must be able to access the file at
               ``<https://host.domain>/mongodb-site-verification.html``.
      
            #. Click :guilabel:`Finish`.
      
        .. tab:: Create DNS Record
            :tabid: create-dns
      
            Create a |dns| TXT record with your domain provider to verify
            that you own your domain. Each |dns| record associates a
            specific |service| organization with a specific domain.
      
            a. Click :guilabel:`DNS Record`.
      
            #. Click :guilabel:`Next`.
      
            #. Copy the provided TXT record. The TXT record has the
               following form:
      
               .. code-block:: ini
                  :copyable: false
      
                  mongodb-site-verification=<32-character string>
      
            #. Log in to your domain name provider (such as GoDaddy.com or
               networksolutions.com).
      
            #. Add the TXT record that |service| provides to your domain.
      
            #. Return to |service| and click :guilabel:`Finish`.
      
   .. step:: Verify your domain.
      
      The :guilabel:`Domains` screen displays both unverified and verified
      domains you've mapped to your |idp|. To verify your domain, click the
      target domain's :guilabel:`Verify` button. |service| shows whether
      the verification succeeded in a banner at the top of the screen.
      