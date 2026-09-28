The :method:`~cursor.min()` and :method:`~cursor.max()` methods
indicate that the system should avoid normal query planning. They
construct an index scan where the index bounds are explicitly specified
by the values given in :method:`~cursor.min()` and
:method:`~cursor.max()`.

.. warning::

   If one of the two boundaries is not specified, the query plan will be
   an index scan that is unbounded on one side. This may degrade performance
   compared to a query containing neither operator, or one that uses both
   operators to more tightly constrain the index scan.
