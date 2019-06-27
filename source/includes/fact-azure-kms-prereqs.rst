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
