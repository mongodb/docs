Queries that include a sort by :operator:`$natural` order do **not**
use indexes to fulfill the query predicate with the following
exception: If the query predicate is an equality condition on the
``_id`` field ``{ _id: <value> }``, then the query with the sort by
:operator:`$natural` order can use the ``_id`` index.
