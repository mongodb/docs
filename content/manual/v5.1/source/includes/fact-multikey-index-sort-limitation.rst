As a result of changes to sorting behavior on array fields in MongoDB
3.6, when sorting on an array indexed with a
:doc:`multikey index </core/index-multikey/>` the query plan includes
a blocking SORT stage. The new sorting behavior may negatively impact
performance.

In a blocking SORT, all input must be consumed by the sort step before
it can produce output. In a non-blocking, or *indexed* sort, the
sort step scans the index to produce results in the requested order.
