The following query uses the :pipeline:`$searchMeta` stage to return
unique values of movies that contain the term ``Gravity`` in the
``title`` field of the ``movies`` collection. The index definition of
this query limits the results returned from a
:ref:`stringFacet <bson-data-types-string-facet>` index, where both the
:ref:`autocomplete <autocomplete-ref>` and :ref:`stringFacet
<bson-data-types-string-facet>` types are on the ``title`` field.
