To enable customer-managed keys with Azure Key Vault for a MongoDB
project, you must:

- Have the :guilabel:`Tenant ID` (or :guilabel:`Directory ID`) for an
  Active Directory tenant.

- Have the :guilabel:`Client ID` (or :guilabel:`Application ID`) and a
  non-expired application :guilabel:`Password` for an Azure Application
  associated to the Active Directory tenant.

- Have the :guilabel:`Resource Group` name for an Azure Resource Group
  in which the Azure Application has the :guilabel:`Owner` role.

- Have the :guilabel:`Subscription ID` and :guilabel:`Key Vault Name`
  of an Azure Key Vault. Ensure the Key Vault resource group
  matches the resource group name specified to
  :guilabel:`Resource Group`.

  The Key Vault must have the following Access Policies:

  - Key Management Operations

    - ``GET``
    - ``LIST``

  - Cryptographic Operations

    - ``ENCRYPT``
    - ``DECRYPT``

- Have the :guilabel:`Key Identifier` for a key in the specified
  Azure Key Vault.

  |service| uses these resources when enabling encryption at rest
  for a cluster in the |service| project. Consider creating an
  Azure Application, Resource Group, and Key Vault specifically
  for use with the |service| project.

  To learn how to configure the referenced Azure components, see the
  :azure:`Azure Documentation </index>`.

- If your Azure Key Vault configuration requires it, :azure:`allow
  access </key-vault/general/network-security>` from the following IP
  addresses so that |service| can communicate with your key vault:

  .. code-block:: none
  
     18.214.178.145
     18.235.30.157
     18.235.48.235
     18.235.145.62
     34.193.242.51
     34.196.151.229
     34.200.66.236
     34.235.52.68
     35.153.40.82
     35.169.184.216
     35.171.106.60
     35.174.179.65
     35.174.230.146
     35.175.93.3
     35.175.94.38
     35.175.95.59
     52.71.233.234
     52.87.98.128
     107.20.0.247
     107.20.107.166
