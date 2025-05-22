Starting in MongoDB 7.2, aggregation pipeline queries that attempt to
use non-existent databases on :ref:`mongos <mongos>` deployments return 
validation errors. 

In previous versions, these aggregation queries return empty cursors.