.. note::

   This policy statement allows MongoDB's |aws| Principal to use the 
   customer's KMS key for encryption and decryption operations. The 
   |service| Principal is not secret and is used across all |service| 
   customers. This is a highly-restricted, purpose-limited |aws| 
   account, with no resources in it other than the IAM user. The 
   ``ExternalId`` in the policy statement is unique for each |service| 
   project, but it is not secret. The ``ExternalId`` is used to 
   mitigate the possibility of cross-context (confused deputy) 
   vulnerabilities. |service|'s use of a common principal to access all 
   customers' keys is an access pattern recommended by Amazon, as 
   described `here <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html>`__.
   