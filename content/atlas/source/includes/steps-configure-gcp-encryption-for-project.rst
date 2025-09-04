.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Toggle the button next to :guilabel:`Encryption at Rest using your Key Management` to :guilabel:`On`.
      
   .. step:: Select :guilabel:`Google Cloud KMS`.

   .. step:: Enter the :guilabel:`Key Version Resource ID`.
      
      Enter the key version resource ID for the Google Cloud KMS key 
      that you want to use to encrypt your data at rest.
      
      Your key version resource ID is the fully-qualified resource name
      for a `CryptoKeyVersion
      <https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions#CryptoKeyVersion>`__.

      .. important::

         You must enter a valid ID before you can configure your 
         authentication method.
      
   .. step:: Configure your authentication method.

      |service| supports two authentication methods for GCP KMS:

      - **Service Account (Recommended)**: Use an Atlas-managed
        service account specific to your project to authenticate to GCP.
      - **Static Credentials**: Provide a customer-managed service account key.

      .. tabs::

         .. tab:: Service Account
            :tabid: service-account-auth

            To grant access in a secure manner, |service| uses
            a `service account <https://cloud.google.com/iam/docs/service-account-impersonation>`__
            specific to your |service| project to authenticate to GCP.
            You can then assign policies to the service
            account to control access to your project's resources.

            .. note::

               If you previously configured encryption at rest with static credentials
               and are now migrating to service account-based authentication,
               note that this migration is strictly one-way. |service| does not
               support reverting back to the static credential authentication method.
            
            If you have an existing |service| GCP service account with the
            required permissions already configured, select it from the
            :guilabel:`Connect Service Account` dropdown menu. Otherwise,
            complete the following steps:

            .. tabs::

               .. tab:: First-time Setup
                  :tabid: first-time-setup

                  If you have not yet set up a service account for your |service| project:

                  a. Click :guilabel:`Authorize a new service account`.
                     The :guilabel:`Encrypt Data with GCP KMS` dialog box appears.

                  #. Click the :guilabel:`Set Up` button to create your GCP resources.
                     |service| provisions the GCP `folder <https://cloud.google.com/resource-manager/docs/creating-managing-folders>`__
                     and creates the service account. The folder is required in order to
                     create service accounts.

                  #. Select the |service| service account from the dropdown menu
                     or :ref:`create a new one <create-org-api-key>`.

                  #. Run the :gcp:`gcloud </sdk/docs/install>` commands
                     that appear to grant the service account the following
                     required permissions:

                     - :guilabel:`Enable Encrypt/Decrypt operations`

                       .. code-block:: sh
                          :copyable: false

                          gcloud kms keys add-iam-policy-binding \
                            <key-name> \
                              --location <location> \
                              --keyring <keyring-name> \
                              --member <ATLAS_OWNED_SERVICE_ACCOUNT_EMAIL> \
                              --role="roles/cloudkms.cryptoKeyEncrypterDecrypter"

                     - :guilabel:`Enable GetPublicKey operations`

                       .. code-block:: sh
                          :copyable: false

                          gcloud kms keys add-iam-policy-binding \
                            <key-name> \
                              --location <location> \
                              --keyring <keyring-name> \
                              --member <ATLAS_OWNED_SERVICE_ACCOUNT_EMAIL> \
                              --role="roles/cloudkms.viewer"

                  #. Click :guilabel:`Validate & Finish` to confirm.

               .. tab:: Existing Service Account
                  :tabid: existing-service-account

                  If you have an existing service account for your |service| project:

                  a. Click :guilabel:`Authorize a new service account`.
                     The :guilabel:`Encrypt Data with GCP KMS` dialog box appears.

                  #. Select your existing
                     |service| service account from the dropdown menu
                     or :ref:`create a new one <create-org-api-key>`.

                  #. Run the :gcp:`gcloud </sdk/docs/install>` commands
                     that appear to grant the service account the following
                     required permissions:

                     - :guilabel:`Enable Encrypt/Decrypt operations`

                       .. code-block:: sh
                          :copyable: false

                          gcloud kms keys add-iam-policy-binding \
                            <key-name> \
                              --location <location> \
                              --keyring <keyring-name> \
                              --member <ATLAS_OWNED_SERVICE_ACCOUNT_EMAIL> \
                              --role="roles/cloudkms.cryptoKeyEncrypterDecrypter"

                     - :guilabel:`Enable GetPublicKey operations`

                       .. code-block:: sh
                          :copyable: false

                          gcloud kms keys add-iam-policy-binding \
                            <key-name> \
                              --location <location> \
                              --keyring <keyring-name> \
                              --member <ATLAS_OWNED_SERVICE_ACCOUNT_EMAIL> \
                              --role="roles/cloudkms.viewer"

                  #. Click :guilabel:`Validate & Finish` to confirm.
                  
         .. tab:: Static Credentials
            :tabid: static-credentials-auth

            You can manually specify a service account key by toggling
            :guilabel:`Authorize with static credentials` to :guilabel:`On`. Then, enter your key
            formatted as a JSON object with the encryption credentials for
            your GCP service account in the text box.

            .. important::

               Static credentials will be deprecated in a future release. 
               Use service account authentication for new projects
               when possible. Existing projects using static credentials can
               continue to use them but cannot switch back once migrated to
               service account authentication.

   .. step:: Click :guilabel:`Save`.
