Starting in MongoDB 8.0, namespaces in subpipelines within ``$lookup``
and ``$unionWith`` are validated to ensure the correct use of ``from``
and ``coll`` fields:

- For ``$lookup``, omit the ``from`` field if you use a subpipeline with
  a stage which doesn't require a specified collection. For example, a
  :pipeline:`$documents` stage.
- Similarly, for ``$unionWith``, omit the ``coll`` field.

Unchanged behavior:

- For a ``$lookup`` that starts with a stage for a collection, for
  example a :pipeline:`$match` or :pipeline:`$collStats` subpipeline,
  you must include the ``from`` field and specify the collection.
- Similarly, for ``$unionWith``, include the ``coll`` field and specify
  the collection.

The following scenario shows an example.

.. include:: /includes/let-example-create-flavors.rst
