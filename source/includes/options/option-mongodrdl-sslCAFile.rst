.. option:: --sslCAFile <filename>

   Specifies the MongoDB instance's :file:`.pem` file containing the root
   certificate chain from the Certificate Authority. Specify the file
   name of the :file:`.pem` file using relative or absolute paths.
   
   .. warning::
   
      For SSL connections (:option:`--ssl`) to :binary:`~bin.mongod` and
      :binary:`~bin.mongos`, if the :program:`mongodrdl` runs without the
      :option:`--sslCAFile`, :program:`mongodrdl` will not attempt
      to validate the server certificates. This creates a vulnerability
      to expired :binary:`~bin.mongod` and :binary:`~bin.mongos` certificates as
      well as to foreign processes posing as valid :binary:`~bin.mongod` or
      :binary:`~bin.mongos` instances. Ensure that you *always* specify the
      CA file to validate the server certificates in cases where
      intrusion is a possibility.

