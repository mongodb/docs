.. include:: /includes/fact-kms-prereqs.rst

- Have the |azure| account and Key Vault credentials, and the key
  identifier for the encryption key in your |akv|.  

  - For the account, you must have the client ID, tenant ID, and secret.
  - For the Key Vault, you must have the subscription ID, Resource Group
    Name, and Key Vault name. 
    
  To learn how to configure these Azure components, see the
  :azure:`Azure Documentation </index>`. 

  |service| uses these resources when enabling encryption at rest
  for a {+cluster+} in the |service| project. 