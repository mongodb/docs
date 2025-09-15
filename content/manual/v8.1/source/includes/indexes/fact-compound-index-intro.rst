Compound indexes collect and sort data from multiple field values from each
document in a collection. You can use the compound index to query the first 
field or any prefix fields of the index. 
The order of fields in a compound index is very important. The B-tree created
by a compound index stores the sorted data in the order that the index specifies
the fields. 

For example, the following image shows a compound index where documents
are first sorted by ``userid`` in ascending order (alphabetically).
Then, the ``scores`` for each ``userid`` are sorted in descending order:

.. include:: /images/index-compound-key.rst
