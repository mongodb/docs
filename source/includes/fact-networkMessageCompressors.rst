.. important::

   Messages are compressed when both parties enable network
   compression. Otherwise, messages between the parties are
   uncompressed.

You can specify the following compressors:

- :term:`snappy`

- :term:`zlib`

If you specify multiple compressors, then the order in which you list
the compressors matter as well as the communication initiator. For
example, if a :program:`mongo` shell specifies the following network
compressors ``zlib,snappy`` and the :program:`mongod` specifies
``snappy,zlib``, messages between :program:`mongo` shell and
:program:`mongod` uses ``zlib``.

If the parties do not share at least one common compressor, messages
between the parties are uncompressed. For example, if a
:program:`mongo` shell specifies the following network compressors
``zlib`` and :program:`mongod` species only ``snappy``, messages
between :program:`mongo` shell and :program:`mongod` are not compressed.

