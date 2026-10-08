.. step:: Rotate your {+cmk-long+} on your {+kms-long+}

   The process for rotating your {+cmk-abbr+} depends on your
   {+kms-abbr+} provider. For details, refer to your key provider's
   documentation:

   - AWS: `Rotating AWS KMS Keys <https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html>`__
   - Azure: `Configure cryptographic key auto-rotation in Azure Key
     Vault <https://learn.microsoft.com/en-us/azure/key-vault/keys/how-to-configure-key-rotation>`__
   - GCP: `Rotate a key <https://cloud.google.com/kms/docs/rotate-key>`__

   Once you rotate the {+cmk-abbr+}, MongoDB uses it to wrap all new
   DEKs. To re-wrap existing DEKs, continue to the following steps.
