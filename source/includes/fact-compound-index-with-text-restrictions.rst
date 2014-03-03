A compound ``text`` index cannot include any other special index types,
such as :ref:`multi-key <index-type-multi-key>` or :ref:`geospatial
<index-feature-geospatial>` index fields.

If the compound ``text`` index includes keys **preceding** the ``text``
index key, to perform a :query:`$text` search, the query predicate must
include **equality match conditions** on the preceding keys. To include
non-equality match conditions on the non-text index keys, create the
compound text index, listing the text keys first.
