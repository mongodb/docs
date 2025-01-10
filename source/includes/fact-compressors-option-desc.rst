Specifies the compression algorithm that ``mongodump`` uses for network
communication between the |tool-binary| client and the MongoDB server.
You can use one or more of these values for the ``--compressors``
option:

- ``snappy``
- ``zlib``
- ``zstd``

If you specify multiple compression algorithms, |tool-binary| uses the
first one in the list supported by your MongoDB deployment.

For more information on compressors, see the `Go driver network
compression documentation
<https://www.mongodb.com/docs/drivers/go/current/fundamentals/connections/network-compression/>`__.
