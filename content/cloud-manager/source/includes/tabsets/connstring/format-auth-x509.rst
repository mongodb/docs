You should find the client certificate in the |pem| file you
specified in the :setting:`mongodb.ssl.PEMKeyFile` setting.

- Prepend the value of the *subject* from the
  :ref:`client certificate as a MongoDB user <x509-client-authentication>`
  to the host.

- Append **authMechanism=MONGODB-X509** to the specified port.
