You must have access to the following resources before starting this 
procedure:

* The :guilabel:`Tenant ID` (or :guilabel:`Directory ID`) for an Active 
  Directory tenant. 

* The :guilabel:`Client ID` (or :guilabel:`Application ID`) and a
  non-expired application :guilabel:`Password` for an Azure Application 
  associated to the Active Directory tenant.

* The :guilabel:`Resource Group` name for an Azure Resource Group
  in which the Azure Application has the :guilabel:`Owner` role.

* The :guilabel:`Subscription ID` and :guilabel:`Key Vault Name`
  of an Azure Key Vault. Ensure the Key Vault resource group
  matches the resource group name specified to
  :guilabel:`Resource Group`.

  The Key Vault must have the following Access Policies:

  * Key Management Operations
    
    - ``GET``
    - ``LIST``

  * Cryptographic Operations

    - ``ENCRYPT``
    - ``DECRYPT``

* The :guilabel:`Key Identifier` for a key in the specified
  Azure Key Vault. 

|service| uses these resources when enabling encryption at rest
for a cluster in the |service| project. Consider creating an
Azure Application, Resource Group, and Key Vault specifically
for use with the |service| project. 

For complete documentation on configuring the referenced Azure
components, see the 
`Azure Documentation <https://docs.microsoft.com/en-us/azure/index>`_.