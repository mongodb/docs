.. warning::

   If the :option:`--sslCAFile <mongod --sslCAFile>` option and its target
   file are not specified, x.509 client and member authentication will not
   function. :binary:`~bin.mongod`, and :binary:`~bin.mongos` in sharded systems,
   will not be able to verify the certificates of processes connecting to it
   against the trusted certificate authority (CA) that issued them, breaking
   the certificate chain.

   As of version 2.6.4, :binary:`~bin.mongod` will not start with x.509
   authentication enabled if the CA file is not specified.
