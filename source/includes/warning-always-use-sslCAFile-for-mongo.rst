.. warning::

   If the :binary:`~bin.mongo` shell or any other tool that connects to
   :binary:`~bin.mongos` or :binary:`~bin.mongod` is run without
   :option:`--sslCAFile <mongod --sslCAFile>`, it will not attempt to validate
   server certificates. This results in vulnerability to expired
   :binary:`~bin.mongod` and :binary:`~bin.mongos` certificates as well as to foreign
   processes posing as valid :binary:`~bin.mongod` or :binary:`~bin.mongos`
   instances. Ensure that you *always* specify the CA file against which
   server certificates should be validated in cases where intrusion is a
   possibility.
