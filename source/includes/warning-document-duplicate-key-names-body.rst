The MongoDB Query Language does not support documents with duplicate
field names. While some BSON builders may support creating a BSON document with
duplicate field names, inserting these documents into MongoDB is not supported 
*even if* the insert succeeds, or appears to succeed. For example, inserting a 
BSON document with duplicate field names through a MongoDB driver may result in 
the driver silently dropping the duplicate values prior to insertion, or may 
result in an invalid document being inserted that contains duplicate fields. Querying against any such documents would lead to arbitrary and inconsistent results. 
