.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
   
   .. step:: Select the :guilabel:`Clusters` view for your deployment.

   .. step:: On the line listing the process, click :guilabel:`Modify`.

   .. step:: Expand the :guilabel:`Advanced Configuration Options` section.
      
   .. step:: Set the |tls-ssl| startup options.
      
      a. Click :guilabel:`Add Option` to add each of the following options:
      
         .. list-table::
            :header-rows: 1
            :widths: 30 15 55
      
            * - Option
              - Required
              - Value
      
            * - :option:`tlsMode <mongod.--tlsMode>`
              - Required
              - Select ``requireTLS``.
      
            * - :option:`tlsCertificateKeyFile <mongod.--tlsCertificateKeyFile>`
              - Required
              - Provide the absolute path to the server certificate.
      
            * - :option:`tlsCertificateKeyFilePassword <mongod.--tlsCertificateKeyFilePassword>`
              - Required
              - Provide the PEM key file password if you encrypted it.
      
                .. important::
      
                   .. include:: /includes/fact-PKCS8-private-key.rst
      
            * - :option:`tlsFIPSMode <mongod.--tlsFIPSMode>`
              - Optional
              - Select ``true`` if you want to
                :manual:`enable FIPS mode </tutorial/configure-fips>`.
      
      b. After adding each option, click :guilabel:`Add`.
      
      c. When you have added the required options, click :guilabel:`Save`.
      
      
   .. step:: Click :guilabel:`Save`.
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
      