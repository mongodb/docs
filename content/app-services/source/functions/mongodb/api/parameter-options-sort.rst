Optional.

Specifies the query sort order. You can specify one or more fields to
sort on where the value of each field indicates whether MongoDB should
sort it in ascending (``1``) or descending (``-1``) order.

.. example::

   The following sort document specifies that documents should be
   sorted first by ``age`` from highest to lowest. Once sorted by
   age, the result set should further be sorted by ``name`` in
   alphabetical order for each distinct age value.

   .. code-block:: javascript

      { age: -1, name: 1 }
