Compound indexes collect and sort data from two or more fields in each
document in a collection. Data is grouped by the first field in the
index and then by each subsequent field.

For example, the following image shows a compound index where documents
are first grouped by ``userid`` in ascending order (alphabetically).
Then, the ``scores`` for each ``userid`` are sorted in descending order:

.. include:: /images/index-compound-key.rst
