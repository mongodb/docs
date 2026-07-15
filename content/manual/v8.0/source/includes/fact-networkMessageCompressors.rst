.. important::

   Messages are compressed when both parties enable network
   compression. Otherwise, messages between the parties are
   uncompressed.

If you specify multiple compressors, then the order in which you list
the compressors matter as well as the communication initiator. For
example, if :binary:`~bin.mongosh` specifies the following network
compressors ``zlib,snappy`` and the :binary:`~bin.mongod` specifies
``snappy,zlib``, messages between ``mongosh`` and
``mongod`` uses ``zlib``.

If the parties do not share at least one common compressor, messages
between the parties are uncompressed. For example, if
``mongosh`` specifies the network compressor
``zlib`` and ``mongod`` specifies ``snappy``, messages
between ``mongosh`` and ``mongod`` are not
compressed.
