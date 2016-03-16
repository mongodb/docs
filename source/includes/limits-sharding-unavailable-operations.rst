The :dbcommand:`group` does not work with sharding. Use
:dbcommand:`mapReduce` or :dbcommand:`aggregate` instead.

.. deprecated:: 3.0
   :method:`db.eval()` is deprecated.

:method:`db.eval()` is incompatible with sharded collections. You may
use :method:`db.eval()` with un-sharded collections in a shard
cluster.

:query:`$where` does not permit references to the ``db`` object
from the :query:`$where` function. This is uncommon in
un-sharded collections.

The :update:`$isolated` update modifier does not work in sharded
environments.

:operator:`$snapshot` queries do not work in sharded environments.

The :dbcommand:`geoSearch` command is not supported in sharded
environments.