Create a ``stockSales`` collection that contains company stock financial
market sales:

.. include:: /includes/stockSales-example-collection-create.rst

In the :ref:`timestamp <document-bson-type-timestamp>` constructor, the:

- First value is the number of seconds after the :wikipedia:`Unix epoch
  <Unix_time>`.

- Second value is the incrementing ordinal. When multiple events happen
  within the same second, the incrementing ordinal uniquely identifies
  each event.