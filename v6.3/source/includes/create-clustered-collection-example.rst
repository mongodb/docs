The following :dbcommand:`create` example adds a :ref:`clustered
collection <clustered-collections>` named ``products``:

.. code-block:: javascript

   db.runCommand( {
      create: "products",
      clusteredIndex: { "key": { _id: 1 }, "unique": true, "name": "products clustered key" }
   } )

In the example, :ref:`clusteredIndex <create.clusteredIndex>`
specifies:

.. |clustered-index-name| replace:: ``"name": "products clustered key"``

.. include:: /includes/clustered-index-example-fields.rst
