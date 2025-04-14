Starting in MongoDB 5.0, multiple 
:ref:`partial indexes <index-type-partial>`
can be created using the same :ref:`key pattern<key_patterns>` as long 
as the :ref:`partialFilterExpression <partialFilterExpression>`  
fields do not express equivalent filters.

In earlier versions of MongoDB, creating multiple
:ref:`partial indexes <index-type-partial>` is not allowed when 
using the same key pattern with different
:ref:`partialFilterExpressions <partialFilterExpression>`.
