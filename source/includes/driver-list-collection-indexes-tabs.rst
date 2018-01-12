.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         List all Indexes on a Collection
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

         To return a list of all indexes on a collection, use the
         :method:`db.collection.getIndexes()` method or a similar
         :api:`method for your driver <>`.

         For example, to view all indexes on the ``people`` collection,
         run the following command:

         .. cssclass:: copyable-code
         .. code-block:: javascript

            db.people.getIndexes()