Unlike :method:`collection.updateOne()`, this action allows you to
atomically find, modify, and return a document with the same command.
This avoids the risk of other update operations changing the document
between separate :ref:`find <mongodb-collection-find>` and :ref:`update
<mongodb-collection-updateOne>` operations.
