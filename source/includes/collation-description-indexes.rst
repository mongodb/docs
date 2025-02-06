When you create an index, you can specify a default **collation** for all operations
you perform on fields that are included in the index.

.. include:: /includes/collation-description.rst

To use an index with a specified collation, your operation must meet the following criteria:

- The operation uses the same collation as the one specified in the index.
- The operation is covered by the index that contains the collation.

The following example creates the same index as the previous example,
but with a default collation of ``fr_CA``: 