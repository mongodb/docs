The maximum BSON document size is 16 megabytes.

The maximum document size helps ensure that a single document cannot
use excessive amount of RAM or, during transmission, excessive amount
of bandwidth. To store documents larger than the maximum size, MongoDB
provides the GridFS API. See :binary:`~bin.mongofiles` and the
documentation for your :doc:`driver </applications/drivers>` for more
information about GridFS.
