Hosting
~~~~~~~

``mongosync`` is a separate utility. ``mongosync`` can be hosted on its
own hardware close to either the source or destination cluster. This
flexibility allows you to push, or pull, data to the destination
cluster with minimal impact on the :binary:`mongod` or :binary:`mongos`
instances running there.