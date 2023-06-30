.. include:: /includes/fact-kms-prereqs.rst

- Have the :guilabel:`Tenant ID` (or :guilabel:`Directory ID`) for an
  Active Directory tenant.

- Have the :guilabel:`Client ID` (or :guilabel:`Application ID`) and a
  non-expired application :guilabel:`Password` for an Azure Application
  associated to the Active Directory tenant.

- Have the :guilabel:`Resource Group` name of an :guilabel:`Azure Resource Group`
  containing the Key Vault.

- Have an :guilabel:`Active Directory Application` with the role of
  :guilabel:`Azure key Vault Reader` assigned to it.

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

- To help users easily create or change a cluster, you 
  can allow public access to the key. To narrow the scope of the 
  key and mitigate risks, use controls such as |tls| and authentication.

- For restricted access to defined IP ranges, :azure:`allow access 
  </key-vault/general/network-security>` 
  from :ref:`Atlas IP addresses <atlas-add-inbound-ips>` and the public 
  IP addresses of your cluster nodes.
  
  - Ensure |service| can communicate 
    with your key vault. To avoid connectivity interruptions, update 
    your configuration whenever node IP addresses :ref:`change 
    <faq-public-ip-changes>`. For example, you might need to update 
    your :ref:`inbound access rules <atlas-add-inbound-ips>`.

  - If you restrict access to the key vault, you create more 
    complexity when IP addresses change. For example, when you create 
    or update a cluster, you must grant access in the Azure Key Vault 
    to any new IP addresses. You should implement a process to 
    remove IP addresses and keys when you delete a cluster or 
    remove nodes.
