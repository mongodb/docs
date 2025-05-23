:expression:`$eq` operators placed in an :query:`$expr` operator can use
an index on the ``from`` collection referenced in a :pipeline:`$lookup`
stage. Limitations:

- Range comparison operators (:expression:`$lt`, :expression:`$lte`,
  :expression:`$gt`, :expression:`$gte`) cannot use the index. 

- :ref:`Multikey indexes <index-type-multikey>` are not used.
  
- Indexes are not used for comparisons where the operand is an array or
  the operand type is undefined.
  
- Indexes are not used for comparisons with more than one :ref:`field
  path <agg-quick-ref-field-paths>` operand.
