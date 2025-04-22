The MongoDB Query Language is undefined over documents with duplicate
field names. BSON builders may support creating a BSON document with
duplicate field names. While the BSON builder may not throw an error,
inserting these documents into MongoDB is not supported *even if* the
insert succeeds. For example, inserting a BSON document with duplicate
field names through a MongoDB driver may result in the driver silently
dropping the duplicate values prior to insertion.

