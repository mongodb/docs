.. setting:: brs.queryable.tls.disabledCiphers

   *Type*: string

   *Default*:
   TLS_DHE_RSA_WITH_AES_128_CBC_SHA,TLS_DHE_RSA_WITH_AES_128_CBC_SHA256,TLS_DHE_RSA_WITH_AES_128_GCM_SHA256,TLS_DHE_RSA_WITH_AES_256_CBC_SHA,TLS_DHE_RSA_WITH_AES_256_CBC_SHA256,TLS_DHE_RSA_WITH_AES_256_GCM_SHA384

   List of |tls| ciphers suites that your |mms| instance can't accept
   when clients connect to the queryable backup host. Specify |tls|
   cipher suite names as a comma-separated list with no whitespace
   between entries.
   

