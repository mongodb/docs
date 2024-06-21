.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Toggle the button next to :guilabel:`Encryption at Rest using your Key Management` to :guilabel:`On`.
      
   .. step:: Select :guilabel:`Google Cloud KMS`.
      
   .. step:: Enter your :guilabel:`Service Account Key`.

      Your :guilabel:`Service Account Key` should be formatted as a JSON
      object. It contains the encryption credentials for your GCP service
      account.
      
   .. step:: Enter the :guilabel:`Key Version Resource ID`.
      
      Your key version resource ID is the fully-qualified resource name
      for a `CryptoKeyVersion
      <https://cloud.google.com/kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions#CryptoKeyVersion>`__.
      
   .. step:: Click :guilabel:`Save`.
