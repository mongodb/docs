Starting in MongoDB 6.0, ensure that all :dbcommand:`setClusterParameter` 
operations have completed. :abbr:`FCV (feature compatibility version)` 
downgrade cannot occur successfully if there are any ongoing 
``setClusterParameter`` operations on sharded clusters. 
