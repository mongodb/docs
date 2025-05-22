Optional.

.. include:: /includes/change-stream-pre-and-post-images-introduction.rst

``changeStreamPreAndPostImages`` has the following syntax:

.. code-block:: javascript
   :copyable: false

   changeStreamPreAndPostImages: {
      enabled: <boolean>
   }

To enable change stream pre- and post-images for the collection, set ``enabled``
to ``true``.

For complete examples with the change stream output, see
:ref:`db.collection.watch-change-streams-pre-and-post-images-example`.
