.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - friendlyName
     - string
     - Optional
     - Human-readable label that identifies this key vault
       configuration. |onprem| displays this value in the
       :guilabel:`Key Vault` list and in the :guilabel:`Vault Name`
       field.

   * - type
     - string
     - Optional
     - Key vault provider type. |onprem| accepts only ``HASHI_CORP``,
       which represents HashiCorp Vault.

   * - url
     - string
     - Optional
     - Address of the HashiCorp Vault server that |onprem| connects
       to, such as ``https://localhost:8200/``.

   * - auth
     - object
     - Optional
     - Authentication details that |onprem| uses to connect to
       HashiCorp Vault.

   * - auth.mechanism
     - string
     - Conditional
     - Authentication method that |onprem| uses to connect to
       HashiCorp Vault. Required when you update the ``auth`` object.
       |onprem| accepts the following values:

       - ``TOKEN``
       - ``JWT``

   * - auth.secret
     - string
     - Optional
     - Credential that |onprem| uses to authenticate to HashiCorp
       Vault.

       When ``auth.mechanism`` is ``TOKEN``, set this value to the
       Vault token. When ``auth.mechanism`` is ``JWT``, set this value
       to the |pem|-formatted RSA private key that signs the |jwt|.

       To keep the stored credential, omit this field or send the
       redacted value that |onprem| returns. |onprem| encrypts this
       value at rest and redacts it in API responses.

   * - auth.jwtClaims
     - object
     - Conditional
     - Claims that |onprem| sends when it requests a |jwt| login from
       HashiCorp Vault. Required when ``auth.mechanism`` is ``JWT``.
       Include the ``user`` and ``role`` claims.

   * - customCertificates
     - array
     - Optional
     - List of custom |certauth| certificates that |onprem| uses for
       |tls| verification when it connects to the HashiCorp Vault
       server.

   * - customCertificates[n].filename
     - string
     - Conditional
     - Name that identifies the |certauth| |pem| file. Required for
       each entry in ``customCertificates``.

   * - customCertificates[n].certString
     - string
     - Conditional
     - Contents of the |certauth| |pem| file. Required for each entry
       in ``customCertificates``. To keep a stored certificate, send
       the redacted value that |onprem| returns. |onprem| redacts this
       value in API responses.
