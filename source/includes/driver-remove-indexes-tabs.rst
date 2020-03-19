.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         MongoDB provides two methods for removing indexes from a collection:

         - :method:`db.collection.dropIndex()` and

         - :method:`db.collection.dropIndexes()`

 
         Remove Specific Index
         ~~~~~~~~~~~~~~~~~~~~~

         To remove an index, use the :method:`db.collection.dropIndex()` method.

         For example, the following operation removes an ascending index on the
         ``tax-id`` field in the ``accounts`` collection:

         .. cssclass:: copyable-code

         .. code-block:: javascript

            db.accounts.dropIndex( { "tax-id": 1 } )

         The operation returns a document with the status of the operation:

         .. code-block:: javascript

            { "nIndexesWas" : 3, "ok" : 1 }

         Where the value of ``nIndexesWas`` reflects the number of indexes
         *before* removing this index.

         For :doc:`text </core/index-text>` indexes, pass the index name to the
         :method:`db.collection.dropIndex()` method. See :ref:`drop-text-index`
         for details.

         .. note::

            Starting in MongoDB 4.2,
            :method:`db.collection.dropIndexes()` can accept an array
            of index names.

            Starting in MongoDB 4.4,
            :method:`db.collection.dropIndexes()` can stop
            in-progress index builds. See
            :ref:`dropIndexes-method-index-builds` for more information.

         Remove All Indexes
         ~~~~~~~~~~~~~~~~~~

         You can also use the :method:`db.collection.dropIndexes()` to remove
         *all* indexes except for the :ref:`_id index <index-type-id>` from a
         collection.

         For example, the following command removes all indexes from
         the ``accounts`` collection:

         .. cssclass:: copyable-code
         .. code-block:: javascript

            db.accounts.dropIndexes()

         These shell helpers provide wrappers around the
         :dbcommand:`dropIndexes` :term:`database command`. Your :ecosystem:`client
         library </drivers>` may have a different or additional
         interface for these operations.

     - id: compass
       content: |
         To remove an index from a collection in |compass|:

         1. Navigate to the collection on which the target
            index exists.

         2. Click the :guilabel:`Indexes` tab.

         3. Click the :guilabel:`trash can` icon in the
            :guilabel:`Drop` column for the index you wish to delete.

         .. figure:: /images/compass-delete-index.png
            :alt: Delete an index in Compass

