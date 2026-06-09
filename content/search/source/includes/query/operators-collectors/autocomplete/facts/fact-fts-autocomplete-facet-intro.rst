The following query uses the :pipeline:`$searchMeta` stage to return
unique values of movies that contain the term ``Gravity`` in the
``title`` field of the ``movies`` collection. The index definition of
this query limits the results returned from a
:ref:`token <bson-data-types-token>` index, where both the
:ref:`autocomplete <autocomplete-ref>` and :ref:`token
<bson-data-types-token>` types are on the ``title`` field.
