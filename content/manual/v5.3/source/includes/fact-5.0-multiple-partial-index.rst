Starting in MongoDB 5.0, multiple 
:doc:`partial indexes </core/index-partial>`
can be created using the same :ref:`key pattern<key_patterns>` as long 
as the :ref:`partialFilterExpression <partialFilterExpression>`  
fields do not express equivalent filters.

In earlier versions of MongoDB, creating multiple
:doc:`partial indexes</core/index-partial>` is not allowed when 
using the same key pattern with different
:ref:`partialFilterExpressions <partialFilterExpression>`.
