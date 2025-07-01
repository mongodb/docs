.. important::

   |service| requires access to the encryption key associated to the
   snapshot's :guilabel:`Encryption Key ID` to successfully 
   :ref:`restore that snapshot <restore-from-ear>`.

   Before deleting an Encryption Key ID used with |service| Encryption 
   at Rest using your Key Management, check **every** backup-enabled 
   cluster in the project for any snapshots still using that Encryption
   Key ID. Once you delete an encryption key, all snapshots encrypted 
   with that key become inaccessible and unrecoverable.

   |service| automatically deletes backups in accordance to the 
   :ref:`cloud-provider-retention-policy`. Once |service| deletes
   all snapshots depending on a given Encryption Key ID,
   you can delete the key safely.

   If disabling a Encryption Key ID, you must re-enable the key before 
   restoring a snapshot encrypted with that key.