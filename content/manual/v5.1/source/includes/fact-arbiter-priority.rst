Starting in MongoDB 3.6, arbiters have priority ``0``. When you upgrade
a replica set to MongoDB 3.6, if the existing configuration has an
arbiter with priority ``1``, MongoDB 3.6 reconfigures the arbiter to
have priority ``0``.
