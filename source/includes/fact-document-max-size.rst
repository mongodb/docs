MongoDB v2.2 has a 16 megabytes limit on document size.

The logic behind the maximum document size is to ensure that the
document does not require excessive amount of RAM on the machine nor
excessive amount of bandwidth to return. MongoDB provides the GridFS
api to handle documents larger than the maximum size. See your specific
driver api documentation on GridFS.
