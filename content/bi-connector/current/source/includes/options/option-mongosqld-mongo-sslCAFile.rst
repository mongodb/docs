.. option:: --mongo-sslCAFile <filename>

   Specifies the MongoDB instance's :file:`.pem` file containing the root
   certificate chain from the Certificate Authority. Specify the file
   name of the :file:`.pem` file using relative or absolute paths.
   
   .. warning::
      
      *On {+bi-short+} versions 2.14.30 and earlier:* 

      For SSL connections (:option:`--mongo-ssl`) to :binary:`~bin.mongod` and
      :binary:`~bin.mongos`, if the :program:`mongosqld` runs without the
      :option:`--mongo-sslCAFile`, :program:`mongosqld` will not attempt
      to validate the server certificates. This creates a vulnerability
      to expired :binary:`~bin.mongod` and :binary:`~bin.mongos` certificates as
      well as to foreign processes posing as valid :binary:`~bin.mongod` or
      :binary:`~bin.mongos` instances. Ensure that you *always* specify the
      CA file to validate the server certificates in cases where
      intrusion is a possibility.

      *Starting on {+bi-short+} version 2.14.31*, if the :option:`--mongo-ssl`
      flag is provided, you must also specify at least one of the following
      options:

      - :option:`--mongo-sslCAFile`
      - :option:`--mongo-sslAllowInvalidCertificates`


