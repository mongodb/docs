Your client must connect to your {+kmip-kms+} through TLS and present
a client certificate that your {+kmip-kms+} accepts:

.. tabs-drivers::

   .. tab::
      :tabid: java-sync

      Specify the following Java system properties to configure your client's
      TLS connection: 

      .. code-block:: shell

         -Djavax.net.ssl.keyStoreType=pkcs12
         -Djavax.net.ssl.keyStore=<path to pkcs12 KeyStore containing your client certificate>
         -Djavax.net.ssl.keyStorePassword=<KeyStore password>

      .. note:: Configure Client With SSLContext

         If you would rather configure your client application using an SSL context, use the 
         `kmsProviderSslContextMap <{+java-driver-api+}/mongodb-driver-core/com/mongodb/ClientEncryptionSettings.Builder.html#kmsProviderSslContextMap(java.util.Map)>`__
         method.

   .. tab::
      :tabid: shell

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/mongosh/kmip/reader/make_data_key.js
         :start-after: start-create-tls
         :end-before: end-create-tls
         :language: javascript
         :dedent:

   .. tab::
      :tabid: nodejs

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/kmip/reader/make_data_key.js
         :start-after: start-create-tls
         :end-before: end-create-tls
         :language: javascript
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/kmip/reader/make_data_key.py
         :start-after: start-create-tls
         :end-before: end-create-tls
         :language: python
         :dedent:

   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/kmip/reader/QueryableEncryption/MakeDataKey.cs
         :start-after: start-create-tls
         :end-before: end-create-tls
         :language: csharp
         :dedent:

      .. important::
      
         Your client certificate must be in pcks12 format. You can convert
         your certificate using `OpenSSL <https://www.openssl.org/source/>`__
         with the following command:

         .. code-block:: shell
         
            openssl pcks12 -export -out "<new pcks12 certificate>" -in "<certificate to convert>" \
            -name "<new certificate name>" -password "<new certificate password>"

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/kmip/reader/make-data-key.go
         :start-after: start-create-tls
         :end-before: end-create-tls
         :language: go
         :dedent:

      .. important::
      
         You must use certificates with `ECDSA keys <https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm>`__ 
         when using the Go driver with `PyKMIP <https://github.com/OpenKMIP/PyKMIP>`__.
