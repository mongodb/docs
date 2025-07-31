To index all fields in an embedded document including fields that
|fts| doesn't dynamically index, define the fields in the index
definition. For string faceting, |fts| counts string facets once for
each document in the result set.

For example, the following index definition configures |fts| to
automatically index all dynamically indexable fields inside the
objects in the ``items`` array. It also configures the
``purchaseMethod`` field to be indexed as
:ref:`token <bson-data-types-token>`, which |fts| doesn't dynamically
index, to support |fts| :ref:`fts-facet-ref` queries against that
field. 