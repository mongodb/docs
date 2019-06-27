To enable customer-managed keys with |gcp| |kms| for a MongoDB
project, you must have:

- Your |gcp| Service Account Key.
- The Key Version Resource ID associated with your Service Account Key.
- A |gcp| service account with credentials specified in your Service
  Account Key with sufficient permissions to:

  - Get the Service Account Key version
  - Encrypt data with the Service Account Key version
  - Decrypt data with the Service Account Key

  .. note::

     The key, not the key version, handles decryption.

.. seealso::

   See the |gcp| documentation to learn how to:

   - :gcp:`Create a service account key </docs/authentication/getting-started>`.
   - :gcp:`Obtain a key version resource ID </kms/docs/object-hierarchy#key_version>`.
   - :gcp:`Grant roles to service accounts </iam/docs/granting-roles-to-service-accounts>`.
