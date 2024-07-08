.. include:: /includes/fact-kms-prereqs.rst

- Your |gcp| Service Account Key.
- Your symmetric Encryption Key in |gcp| KMS. 
- The Key Version Resource ID associated with your |gcp| KMS 
  Encryption Key.
- A |gcp| service account with credentials specified in your Service
  Account Key with sufficient permissions to:

  - Get the |gcp| KMS Encryption Key version.
  - Encrypt data with the |gcp| KMS Encryption Key version.
  - Decrypt data with the |gcp| KMS Encryption Key.

  .. note::

     The key, not the key version, handles decryption.

- If your |gcp| |kms| configuration requires it, create :gcp:`Access
  Levels from GCP </vpc-service-controls/docs/use-access-levels>`
  for :ref:`Atlas IP addresses <atlas-add-inbound-ips>` and the public 
  IP addresses or DNS hostnames of your cluster nodes so that |service| 
  can communicate with your |kms|. If the node IP addresses 
  :ref:`change <faq-public-ip-changes>`, you must update your 
  configuration to avoid connectivity interruptions.

.. seealso::

   See the |gcp| documentation to learn how to:

   - :gcp:`Create a service account key </docs/authentication/getting-started>`.
   - :gcp:`Obtain a key version resource ID </kms/docs/object-hierarchy#key_version>`.
   - :gcp:`Grant roles to service accounts </iam/docs/granting-roles-to-service-accounts>`.
