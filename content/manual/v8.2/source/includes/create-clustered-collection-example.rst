The following :dbcommand:`create` example adds a :ref:`clustered
collection <clustered-collections>` named ``products``:

.. literalinclude:: /code-examples/tested/command-line/mongosh/collections/clustered/create/run-command.snippet.run-command.js
   :language: javascript
   :copyable: true
   :category: usage example

In the example, :ref:`clusteredIndex <create.clusteredIndex>`
specifies:

.. |clustered-index-name| replace:: ``"name": "products clustered key"``

.. include:: /includes/clustered-index-example-fields.rst
