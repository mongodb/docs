The maximum BSON document size is 16 megabytes.

The maximum document size helps ensure that a single document cannot
use excessive amount of RAM or, during transmission, excessive amount
of bandwidth. To store larger objects, MongoDB provides the GridFS API
to handle documents larger than the maximum size. See your specific
driver documentation for GridFS.
