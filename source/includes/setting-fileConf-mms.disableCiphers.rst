.. setting:: mms.disableCiphers

   *Type*: string

   *Default*: ``SSL_DHE_DSS_WITH_3DES_EDE_CBC_SHA``,
   ``SSL_DHE_DSS_WITH_DES_CBC_SHA``,
   ``SSL_DHE_RSA_EXPORT_WITH_DES40_CBC_SHA``,
   ``SSL_DHE_RSA_WITH_3DES_EDE_CBC_SHA``, ``SSL_DHE_RSA_WITH_DES_CBC_SHA``,
   ``SSL_RSA_EXPORT_WITH_DES40_CBC_SHA``,
   ``SSL_RSA_EXPORT_WITH_RC4_40_MD5``,
   ``TLS_DHE_DSS_WITH_AES_128_CBC_SHA256``,
   ``TLS_DHE_DSS_WITH_AES_128_CBC_SHA``,
   ``TLS_DHE_DSS_WITH_AES_256_CBC_SHA256``,
   ``TLS_DHE_DSS_WITH_AES_256_CBC_SHA``,
   ``TLS_DHE_RSA_WITH_AES_128_CBC_SHA256``,
   ``TLS_DHE_RSA_WITH_AES_128_CBC_SHA``,
   ``TLS_DHE_RSA_WITH_AES_128_GCM_SHA256``,
   ``TLS_DHE_RSA_WITH_AES_256_CBC_SHA256``,
   ``TLS_DHE_RSA_WITH_AES_256_CBC_SHA``,
   ``TLS_DHE_RSA_WITH_AES_256_GCM_SHA384``,
   ``TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256``,
   ``TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384``

   
   Specifies a list of |tls| cipher suites which your instance of |mms|
   can't accept when clients connect to the |application| and |api|.
   Specify |tls| cipher suite names as a comma-separated list, as in
   the following example.
   
   .. important::
   
      Cipher suite names used in |mms| must follow :rfc:`RFC 5246
      <5246#appendix-C>` naming conventions. Do not use the OpenSSL
      naming convention. For convenience, |onprem| logs a list of all
      supported cipher suite names during startup. If |onprem| does not
      recognize a |tls| cipher suite name, it logs the following
      warning:
   
      Your config lists the following as ciphers which should be
      disabled as the |jdk| does not recognize them. Please check the
      format of the entries and list of enabled ciphers.
      [*unrecognized_cipher_name*]
   
   To change :setting:`mms.disableCiphers`, follow the `Modify a Custom
   Setting <opsmgr-config-add-custom>` procedure with the following
   values:
   
   .. list-table::
      :widths: 20 80
   
      * - :guilabel:`Key`
        - ``mms.disableCiphers``
      * - :guilabel:`Value`
        - ``<ciphers>``
   
          .. example::
   
             .. code-block:: ini
   
                TLS_DHE_RSA_WITH_3DES_EDE_CBC_SHA, TLS_DHE_RSA_WITH_AES_256_CBC_SHA256
   
   .. warning::
   
      Setting :setting:`mms.disableCiphers` to a custom value could
      re-enable one or more of these disabled ciphers.
   
   

