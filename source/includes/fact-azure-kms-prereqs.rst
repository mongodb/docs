.. include:: /includes/fact-kms-prereqs.rst

- Have the :guilabel:`Tenant ID` (or :guilabel:`Directory ID`) for an
  Active Directory tenant.

- Have the :guilabel:`Client ID` (or :guilabel:`Application ID`) and a
  non-expired application :guilabel:`Password` for an Azure Application
  associated to the Active Directory tenant.

- Have the :guilabel:`Resource Group` name of an :guilabel:`Azure Resource Group`
  containing the Key Vault.

- Have an :guilabel:`Active Directory Application` with the role of
  :guilabel:`Azure key Vault Reader (Preview)` assigned to it.

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
  access </key-vault/general/network-security>` from :ref:`Atlas
  IP addresses <atlas-add-inbound-ips>` and the public IP addresses 
  or DNS hostnames of your cluster nodes so that |service| can 
  communicate with your key vault. If the node IP addresses 
  :ref:`change <faq-public-ip-changes>`, you must update your 
  configuration to avoid connectivity interruptions.
