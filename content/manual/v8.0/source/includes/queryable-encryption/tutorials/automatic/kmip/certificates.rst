Your client must connect to your {+kmip-kms+} through TLS and present
a client certificate that your {+kmip-kms+} accepts:

.. tabs-drivers::

   .. tab::
      :tabid: java-sync

      Configure the following virtual machine options to specify the keystore
      and truststore that contain your KMIP TLS certificates and add them
      to the command that you use to start your Java application:

      .. literalinclude:: /includes/qe-tutorials/java/maven.config.tmpl
         :language: none
         :dedent:

      .. note:: Configure Client With SSLContext

         If you would rather configure your client application using an SSL context, use the
         `kmsProviderSslContextMap <{+java-driver-api+}/mongodb-driver-core/com/mongodb/ClientEncryptionSettings.Builder.html#kmsProviderSslContextMap(java.util.Map)>`__
         method.

   .. tab::
      :tabid: nodejs

      .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-helpers.js
         :start-after: // start-tls-options
         :end-before: // end-tls-options
         :language: javascript
         :dedent:

   .. tab::
      :tabid: python

      .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_helpers.py
         :start-after: # start-tls-options
         :end-before: # end-tls-options
         :language: python
         :dedent:

   .. tab::
      :tabid: shell

      .. literalinclude:: /includes/qe-tutorials/mongosh/queryable-encryption-helpers.js
         :start-after: // start-tls-options
         :end-before: // end-tls-options
         :language: javascript
         :dedent:


   .. tab::
      :tabid: csharp

      .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionHelpers.cs
         :start-after: // start-tls-options
         :end-before: // end-tls-options
         :language: csharp
         :dedent:

      .. important::

         Your client certificate must be in pcks12 format. You can convert
         your certificate using `OpenSSL <https://docs.openssl.org/master/>`__
         with the following command:

         .. code-block:: shell

            openssl pcks12 -export -out "<new pcks12 certificate>" -in "<certificate to convert>" \
            -name "<new certificate name>" -password "<new certificate password>"

   .. tab::
      :tabid: go

      .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_helpers.go
         :start-after: // start-tls-options
         :end-before: // end-tls-options
         :language: go
         :dedent:


      .. important::

         You must use certificates with `ECDSA keys <https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm>`__
         when using the Go driver with `PyKMIP <https://github.com/OpenKMIP/PyKMIP>`__.
