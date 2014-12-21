A compound ``text`` index cannot include any other special index types,
such as :ref:`multi-key <index-type-multi-key>` or :ref:`geospatial
<index-feature-geospatial>` index fields.

If the compound ``text`` index includes keys **preceding** the ``text``
index key, to perform a :query:`$text` search, the query predicate must
include **equality match conditions** on the preceding keys.

The additional keys cannot be used to produce a sort.
