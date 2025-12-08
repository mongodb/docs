The preferred compression types, in order, for wire-protocol messages sent to
or received from the server. You can enable "snappy", "zlib", and "zstd" as optional
build time dependencies. The driver uses the first 
of these compression types that the server supports. The default value is empty.