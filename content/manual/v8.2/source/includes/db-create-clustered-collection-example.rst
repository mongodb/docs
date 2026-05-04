The following :method:`db.createCollection()` example adds a
:ref:`clustered collection <clustered-collections>` named ``stocks``:

.. code-block:: javascript

   db.createCollection(
      "stocks",
      { clusteredIndex: { "key": { _id: 1 }, "unique": true, "name": "stocks clustered key" } }
   )

In the example, :ref:`clusteredIndex
<db.createCollection.clusteredIndex>` specifies:

.. |clustered-index-name| replace:: ``"name": "stocks clustered key"``

.. include:: /includes/clustered-index-example-fields.rst
