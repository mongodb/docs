Specifies the compression algorithm used between the MongoDB server and
|tool-binary|. You can use one or more of these values for the
``--compressors`` option:

- ``snappy``
- ``zlib``
- ``zstd``

If you specify multiple compression algorithms, |tool-binary| uses the
first one in the list supported by your MongoDB deployment.

For more information on compressors, see the `Go driver network
compression documentation
<https://www.mongodb.com/docs/drivers/go/current/fundamentals/connections/network-compression/>`__.
