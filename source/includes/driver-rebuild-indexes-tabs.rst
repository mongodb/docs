.. tabs-drivers::

   tabs:
     - id: shell
       content: |
         To rebuild all indexes on a collection in a single operation
         use the :method:`db.collection.reIndex()` method. This
         operation drops all indexes for a collection, including the
         ``_id`` index, and then rebuilds all indexes.

         .. include:: /includes/note-reindex-impact-on-replica-sets.rst

         .. include:: /includes/important-reindex-locking.rst

         The following example rebuilds all indexes for the ``accounts``
         collection:

         .. cssclass:: copyable-code

         .. code-block:: javascript

            db.accounts.reIndex()

         This shell helper provides a wrapper around the :dbcommand:`reIndex`
         :term:`database command`. Your :doc:`client library </applications/drivers>`
         may have a different or additional interface for this operation.

         .. include:: /includes/note-build-indexes-on-replica-sets.rst

     - id: compass
       content: |
         To rebuild indexes for a collection in |compass|, you need to
         drop and recreate the target indexes.