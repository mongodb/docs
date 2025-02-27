The maximum BSON document size is 16 mebibytes.

The maximum document size helps ensure that a single document cannot use an
excessive amount of RAM or, during transmission, an excessive amount of
bandwidth. To store documents larger than the maximum size, MongoDB provides the
GridFS API. For more information about GridFS, see :binary:`~bin.mongofiles` and
the documentation for your :driver:`driver </>` 
