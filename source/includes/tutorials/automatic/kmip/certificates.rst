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
           `kmsProviderSslContextMap <{+java-driver-api+}/apidocs/mongodb-driver-core/com/mongodb/ClientEncryptionSettings.Builder.html#kmsProviderSslContextMap(java.util.Map)>`__
           method.
