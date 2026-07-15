.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - id
     - string
     - Unique identifier that |onprem| generates for this key vault
       configuration. Use this value as the ``vaultId`` when you
       configure an |s3| snapshot store to use this key vault.

   * - friendlyName
     - string
     - Human-readable label that identifies this key vault
       configuration.

   * - type
     - string
     - Key vault provider type. |onprem| returns ``HASHI_CORP``, which
       represents HashiCorp Vault.

   * - url
     - string
     - Address of the HashiCorp Vault server that |onprem| connects
       to.

   * - auth
     - object
     - Authentication details that |onprem| uses to connect to
       HashiCorp Vault.

   * - auth.mechanism
     - string
     - Authentication method that |onprem| uses to connect to
       HashiCorp Vault. |onprem| returns one of the following values:

       - ``TOKEN``
       - ``JWT``

   * - auth.secret
     - string
     - Credential that |onprem| uses to authenticate to HashiCorp
       Vault. |onprem| encrypts this value at rest and returns
       ``[REDACTED]`` instead of the stored value.

   * - auth.jwtClaims
     - object
     - Claims that |onprem| sends when it requests a |jwt| login from
       HashiCorp Vault. |onprem| returns this object only when
       ``auth.mechanism`` is ``JWT``.

   * - customCertificates
     - array
     - List of custom |certauth| certificates that |onprem| uses for
       |tls| verification when it connects to the HashiCorp Vault
       server.

   * - customCertificates[n].filename
     - string
     - Name that identifies the |certauth| |pem| file.

   * - customCertificates[n].certString
     - string
     - Contents of the |certauth| |pem| file. |onprem| returns
       ``[REDACTED]`` instead of the stored value.

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst
