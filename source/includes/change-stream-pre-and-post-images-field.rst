Optional.

.. include:: /includes/change-stream-pre-and-post-images-introduction.rst

``changeStreamPreAndPostImages`` has the following syntax:

.. code-block:: javascript
   :copyable: false

   changeStreamPreAndPostImages: {
      enabled: <boolean>
   }

.. list-table::
   :header-rows: 1

   * - ``enabled``
     - Description

   * - ``true``
     - Enables change stream pre- and post-images for a collection.

   * - ``false``
     - Disables change stream pre- and post-images for a collection.

For complete examples with the change stream output, see
:ref:`db.collection.watch-change-streams-pre-and-post-images-example`.
