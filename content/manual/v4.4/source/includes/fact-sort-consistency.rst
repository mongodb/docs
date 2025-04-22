MongoDB does not store documents in a collection in a particular order.
When sorting on a field which contains duplicate values, documents
containing those values may be returned in any order.

If consistent sort order is desired, include at least one field in your
sort that contains unique values. The easiest way to guarantee this is
to include the ``_id`` field in your sort query.
