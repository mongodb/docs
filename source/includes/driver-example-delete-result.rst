.. include:: /includes/templates/tabs.rst

.. tabs::

   tabs:
     - id: shell
       content: |
         The method returns a document with the status of the operation. For
         more information and examples, see :method:`~db.collection.deleteMany()`.

     - id: python
       content: |
         The :py:meth:`~pymongo.collection.Collection.delete_many`
         method returns an instance of
         :py:class:`pymongo.results.DeleteResult` with the status of the operation.