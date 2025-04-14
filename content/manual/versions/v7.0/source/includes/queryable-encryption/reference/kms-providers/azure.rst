.. _qe-reference-kms-providers-azure-architecture:

Architecture
````````````

The following diagram describes the architecture of a
{+qe+} enabled application using Azure Key Vault.

.. image:: /images/CSFLE_Data_Key_KMS.png
   :alt: Diagram KMS

.. include:: /includes/queryable-encryption/reference/kms-providers/cmk-note.rst

.. _qe-kms-provider-object-azure:

kmsProviders Object
```````````````````

The following table presents the structure of a ``kmsProviders``
object for Azure Key Vault:

.. list-table::
  :header-rows: 1
  :stub-columns: 1
  :widths: 30 15 45

  * - Field
    - Required
    - Description

  * - azure.tenantId
    - Yes
    - Identifies the organization of the account.

  * - azure.clientId
    - Yes
    - Identifies the clientId to authenticate your registered application.

  * - azure.clientSecret
    - Yes
    - Used to authenticate your registered application.

  * - azure.identityPlatformEndpoint
    - No
    - Specifies a hostname and port number for the authentication server.
      Defaults to login.microsoftonline.com and is only needed for
      non-commercial Azure instances such as a government or China account.

.. _qe-kms-datakeyopts-azure:

dataKeyOpts Object
``````````````````

The following table presents the structure of a ``dataKeyOpts`` object for
Azure Key Vault:

.. list-table::
  :header-rows: 1
  :stub-columns: 1
  :widths: 30 15 45

  * - Field
    - Required
    - Description

  * - keyName
    - Yes
    - Name of the master key

  * - keyVersion
    - No, but strongly recommended
    - Version of the master key

  * - keyVaultEndpoint
    - Yes
    - URL of the key vault. E.g. myVaultName.vault.azure.net

.. include:: /includes/queryable-encryption/qe-csfle-warning-azure-keyversion.rst
