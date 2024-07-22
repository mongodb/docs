The :expression:`$eq`, :expression:`$lt`, :expression:`$lte`,
:expression:`$gt`, and :expression:`$gte` comparison operators placed in
an :query:`$expr` operator can use an index on the ``from`` collection
referenced in a :pipeline:`$lookup` stage. Limitations:

- :ref:`Multikey indexes <index-type-multikey>` are not used.
  
- Indexes are not used for comparisons where the operand is an array or
  the operand type is undefined.
  
- Indexes can only be used for comparisons between fields and 
  constants. For example, a comparison between ``$a`` and a constant 
  value can use an index, but a comparison between ``$a`` and ``$b`` 
  cannot use an index.
