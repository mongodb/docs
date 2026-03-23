
You enable :ref:`encryption with customer key management <arch-center-encryption-at-rest>` 
at the project level. After you enable it, the setting automatically applies to all {+clusters+} created 
within the project, which ensures consistent data protection across your environment.
We recommend that you use a key management service (KMS) such as AWS KMS,
Google Cloud KMS, or Azure Key Vault.

For **staging and production environments**, we recommend that you 
enable encryption with customer key management when you provision your {+clusters+} 
to avoid relying on application development teams to configure it later on.

For **development and testing environments**, consider skipping encryption with customer key management
to save costs. However, if you store sensitive data in |service|, 
such as for healthcare or financial services industries, consider enabling 
encryption with customer key management in development and testing environments as well.
