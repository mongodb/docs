.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         
         When removing indexes in the MongoDB Shell, you can either:

         - Remove a specific index.

         - Remove all indexes from the collection.

         Remove Specific Index
         ~~~~~~~~~~~~~~~~~~~~~

         To remove an index, use the :method:`db.collection.dropIndex()` method.

         For example, the following operation removes an index with the name
         ``taxIndex`` in the ``accounts`` collection:

         .. code-block:: javascript

            db.accounts.dropIndex( { "taxIndex" } )

         The operation returns a document with the status of the operation:

         .. code-block:: javascript

            { "nIndexesWas" : 3, "ok" : 1 }

         Where the value of ``nIndexesWas`` reflects the number of indexes
         *before* removing this index.

         For :ref:`text <index-type-text>` indexes, pass the index name to the
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

         .. code-block:: javascript

            db.accounts.dropIndexes()

         These shell helpers provide wrappers around the
         :dbcommand:`dropIndexes` :term:`database command`. Your :driver:`client
         library </>` may have a different or additional
         interface for these operations.

     - id: compass
       content: |

         To remove an index from a collection in |compass|:

         1. Navigate to the collection containing the target index.

         2. Click the :guilabel:`Indexes` tab.

         3. In the :guilabel:`Drop` column for the target index, click
            the trash icon.

         .. figure:: /images/compass-delete-index.png
            :alt: Delete an index in Compass
