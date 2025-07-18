.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Click :guilabel:`Edit` :icon:`edit`.
      
   .. step:: Update the GCP Key details.
      
      a. Click :guilabel:`Google Cloud KMS` if the 
         :guilabel:`Google Cloud KMS` tab is not already active.
      
      #. Expand :guilabel:`Encryption Key Credentials` if the 
         :guilabel:`Encryption Key Credentials` dialog box is not already 
         displayed.
      
      #. Enter the GCP Key Version Resource ID in the 
         :guilabel:`Key Identifier` entry.
      
         Include the fully-qualified resource name for a
         :gcp:`CryptoKeyVersion </kms/docs/reference/rest/v1/projects.locations.keyRings.cryptoKeys.cryptoKeyVersions#CryptoKeyVersion>`.
      
         .. example::
      
            .. code-block:: sh
               :copyable: false
      
               projects/my-project-0/locations/us-east4/keyRings/my-key-ring-0/cryptoKeys/my-key-0/cryptoKeyVersions/1
      
         The encryption key **must** belong to the |gcp| Service Account Key
         configured for your |service| project. Click the :guilabel:`Service
         Account Key` section to view the currently configured Service 
         Account Key for the project.
      
      #. Click :guilabel:`Update Credentials`.
      
      |service| displays a banner in the |service| console during the 
      Key Identifier rotation process.
      
      .. warning::
      
         Do not delete or disable the original Key Version Resource ID until
         your changes have deployed.
      
      If the cluster uses :ref:`backup-cloud-provider`, do **not** delete
      or disable the original Key Version Resource ID until you
      ensure that no snapshots used that key for encryption.
