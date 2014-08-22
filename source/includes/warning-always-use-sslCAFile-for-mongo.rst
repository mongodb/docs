.. warning::

   If the :program:`mongo` shell or any other tool that connects to
   :program:`mongos` or :program:`mongod` is run without
   :option:`--sslCAFile <mongod --sslCAFile>`, it will not attempt to validate
   server certificates. This results in vulnerability to expired
   :program:`mongod` and :program:`mongos` certificates as well as to foreign
   processes posing as valid :program:`mongod` or :program:`mongos`
   instances. Ensure that you *always* specify the CA file against which
   server certificates should be validated in cases where intrusion is a
   possibility.
