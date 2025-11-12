.. reference/configuration.txt
.. reference/mongosync.txt

Sets an identifer for hot documents, or documents that update very
frequently on source clusters.

Use this |opt-term| for migrations that have replication lag due to hot 
documents when running ``mongosync``.

Provide the identifers in the following format:

.. code-block::

    {
       “db”: <string>, // the name of the database
       "collection" : <string>, // name of the collection
       "ids"    : [ {“_id”:<Object>”}, ...],
    }

The objects in the ``ids`` field
must be valid :ref:`canonical mode extended JSON strings <mongodb-extended-json-v2>`.

You can use this |opt-term| multiple times to provide hot document identifiers 
from multiple collections. The following is an example that provides two hot 
document identifiers from collections ``coll1`` and ``coll2``:

.. code-block:: 

    mongosync \
    --hotDocIDs {"db":"db1","collection":"coll1","ids":[{"_id":{"$oid":"doc1"}},{"_id":{"$oid":"6aa23c249cef3cd958e43785"}}]} \
    --hotDocIDs {"db":"db2","collection":"coll2","ids":[{"_id":{"$oid":"70023c249cef3cd958e43269"}},{"_id":{"$oid":"7aa23c249cef3cd958e43785"}}]} \
    ... other CLI arguments ...

Once started, you cannot remove a hot document identifer. If you set one 
incorrectly, restart ``mongosync`` with the correct identifers.