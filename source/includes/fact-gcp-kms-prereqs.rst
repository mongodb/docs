.. include:: /includes/fact-kms-prereqs.rst

- Your symmetric |gcp| Service Account Key.
- The Key Version Resource ID associated with your Service Account Key.
- A |gcp| service account with credentials specified in your Service
  Account Key with sufficient permissions to:

  - Get the Service Account Key version
  - Encrypt data with the Service Account Key version
  - Decrypt data with the Service Account Key

  .. note::

     The key, not the key version, handles decryption.

- If your |gcp| |kms| configuration requires it, :gcp:`allow access
  </iam/docs/conditions-attribute-reference#access-levels>`
  from :ref:`Atlas IP addresses <atlas-add-inbound-ips>` and the public 
  IP addresses or DNS hostnames of your cluster nodes so that |service| 
  can communicate with your |kms|. If the node IP addresses 
  :ref:`change <faq-public-ip-changes>`, you must update your 
  configuration to avoid connectivity interruptions.

.. seealso::

   See the |gcp| documentation to learn how to:

   - :gcp:`Create a service account key </docs/authentication/getting-started>`.
   - :gcp:`Obtain a key version resource ID </kms/docs/object-hierarchy#key_version>`.
   - :gcp:`Grant roles to service accounts </iam/docs/granting-roles-to-service-accounts>`.
