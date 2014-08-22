.. warning::

   If the :setting:`--sslCAFile` option and its target
   file are not specified, x.509 client authentication will not function.
   :program:`mongod` will not be able to verify the client's certificate
   against the trusted certificate authority (CA) that issued it, breaking the
   certificate chain.

   As of version 2.6.4, :program:`mongod` will not start with x.509
   authentication enabled if the CA file is not specified.
