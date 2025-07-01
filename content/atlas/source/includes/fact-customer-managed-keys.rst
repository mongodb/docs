Customer key management in |service| follows a process called |envelope-encryption|.
This process creates multiple layers of encryption by encrypting one key with another 
key. To enable customer key management, |service| uses the following encryption keys:

.. expression:: Customer-Managed Key (CMK)

   Customer-managed keys are encryption keys that you create, own, 
   and manage in |cloud-kms|. You create the |cmk| in |cloud-kms| and 
   connect it to |service| at the :ref:`Project <projects>` level.
   To learn more about the |cmk|\s used in |cloud-kms|, see the |cmk-link|.

   |service| uses this key only to encrypt the MongoDB Master Keys.

.. expression:: MongoDB Master Key

   Each node in your |service| {+cluster+} creates a MongoDB Master Key. 
   MongoDB Master Keys are encryption keys that a MongoDB Server uses to
   encrypt the per-database encryption keys. |service| saves an encrypted 
   copy of the key locally.

   This key is encrypted with the |cmk| and encrypts the per-database 
   encryption keys.

.. expression:: Per-Database Encryption Key

   Each node in your |service| {+cluster+} also creates an encryption key 
   per database in your {+cluster+}. |service| uses these keys to 
   read and write data via WiredTiger, which also encrypts and stores these 
   keys.

   This key is encrypted with the MongoDB Master Key.
