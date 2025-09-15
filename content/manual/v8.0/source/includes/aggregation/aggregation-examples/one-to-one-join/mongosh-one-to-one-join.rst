.. start-prep-steps

This example uses two collections:

- ``orders``: documents that describe individual orders for products in a shop
- ``products``: documents that describe the products that a shop sells

An order can only contain one product. The aggregation uses a
one-to-one join to match an order document to the corresponding product
document. The aggregation joins the collections by the ``product_id`` field
that exists in documents in both collections.

To create the ``orders`` and ``products`` collections, use the
:method:`~db.collection.insertMany()` method:

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/join-one-to-one/load-data-orders.js
   :language: javascript
   :copyable: true
   :category: usage example

.. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/join-one-to-one/load-data-products.js
   :language: javascript
   :copyable: true
   :category: usage example

.. end-prep-steps

.. start-tutorial

.. procedure::
   :style: connected

   .. step:: Run the aggregation pipeline.

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/join-one-to-one/run-pipeline.js
         :language: javascript
         :copyable: true
         :category: usage example

      In this example, the ``$lookup`` stage always outputs a
      ``product_mapping`` array that contains one document. The ``$set``
      stage after the ``$lookup`` stage uses ``$first`` to extract the
      document from the ``product_mapping`` array. If you use this
      pipeline in a setting where the ``$lookup`` stage outputs an array
      of more than one document, consider using an explicit ``{ $limit:
      1 }`` stage in the ``$lookup`` stage.

      .. note::

         If a supporting index on the ``foreignField`` does not exist, a
         ``$lookup`` operation that performs an equality match with a single
         join will likely have poor performance. For more information,
         see  and :ref:`Lookup Performance Considerations
         <lookup-performance-considerations>` and
         :ref:`manual-create-an-index`.

   .. step:: Interpret the aggregation results.

      The aggregated results contain three documents. The documents
      represent customer orders that occurred in 2020, with the
      ``product_name`` and ``product_category`` of the ordered product:

      .. literalinclude:: /code-examples/tested/command-line/mongosh/aggregation/pipelines/join-one-to-one/output.sh
         :language: shell
         :copyable: false
         :category: example return object

      The result consists of documents that contain fields from
      documents in the ``orders`` collection and the ``products`` collection
      joined by matching the ``product_id`` field present in each original
      document.

.. end-tutorial
