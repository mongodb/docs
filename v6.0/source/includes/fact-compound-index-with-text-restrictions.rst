- A compound ``text`` index cannot include any other special index
  types, such as :ref:`multi-key <index-type-multi-key>` or
  :ref:`geospatial <index-feature-geospatial>` index fields.

- If the compound text index includes keys **preceding** the text index
  key, to use :query:`$text`, the query predicate must
  include **equality match conditions** on the preceding keys.

- When creating a compound ``text`` index, all ``text`` index keys must
  be listed adjacently in the index specification document.
