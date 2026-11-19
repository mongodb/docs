.. warning::

   Before you rotate encryption keys, back up your
   {+key-vault-long+}. If you lose access to your {+dek-long+}s,
   you lose all data encrypted with them. To learn how to back up a
   collection, see :ref:`manual-tutorial-backup-and-restore`.
   
   As you rotate keys, confirm that they aren't used to encrypt any
   other keys or data before deleting them. Keep your previous
   CMK enabled on your KMS until you rewrap every
   DEK that uses it. Deleting a DEK, or a
   CMK that still encrypts DEKs, makes every field
   encrypted with those keys permanently unreadable.
