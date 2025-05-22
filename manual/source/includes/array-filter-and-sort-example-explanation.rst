The sort is ascending, which means that the sort key is the lowest value
in the ``sizes`` array:

- In document ``_id: 'A'``, the lowest ``sizes`` element is ``7``. This
  value is used as the sort key even though it does not match the filter
  ``{ sizes: { $gt: 9 }``.
 
- In document ``_id: 'B'``, the lowest ``sizes`` element is ``8``.
  Similarly, this value is used as the sort key even though it does not
  match the filter.

The query returns the document with ``_id: 'A'`` first.
