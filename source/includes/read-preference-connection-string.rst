You can also specify read preference on a per-connection basis in the
connection string. By default, ``mongosync`` sets the source cluster
read preference to :readmode:`nearest` to distribute reads evenly across
nodes. For more information on setting read preference in connection
strings, see :ref:`connections-read-preference`.