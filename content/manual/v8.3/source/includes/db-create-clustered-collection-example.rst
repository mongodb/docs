The following :method:`db.createCollection()` example adds a
:ref:`clustered collection <clustered-collections>` named ``stocks``:

.. literalinclude:: /code-examples/tested/command-line/mongosh/collections/clustered/create/create-by-method.snippet.create-by-method.js
   :language: javascript
   :copyable: true
   :category: usage example

In the example, :ref:`clusteredIndex
<db.createCollection.clusteredIndex>` specifies:

.. |clustered-index-name| replace:: ``"name": "stocks clustered key"``

.. include:: /includes/clustered-index-example-fields.rst
