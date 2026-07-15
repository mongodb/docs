Hosting
~~~~~~~

The ``mongosync`` utility can be hosted on its own hardware close to
either the source or destination cluster. It does not have to be hosted
on the same server as one of the :binary:`mongod` or :binary:`mongos`
instances in the cluster. This flexibility allows you to push, or pull,
data to the destination cluster with minimal impact on the
:binary:`mongod` or :binary:`mongos` instances running there.