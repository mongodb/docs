Starting in MongoDB 4.2, incoming connections to a :binary:`mongod` or
:binary:`mongos` instance require **two** file descriptors. In previous
versions of MongoDB, incoming connections required **one** file
descriptor.

Prior to upgrading from MongoDB 4.0 to 4.2, you may need to increase the
value of your open files |ulimit| setting (``-n``).
