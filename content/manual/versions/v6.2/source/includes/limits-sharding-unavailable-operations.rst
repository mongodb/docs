:query:`$where` does not permit references to the ``db`` object
from the :query:`$where` function. This is uncommon in
un-sharded collections.

The :dbcommand:`geoSearch` command is not supported in sharded
environments.

In MongoDB 5.0 and earlier, you cannot specify :ref:`sharded collections
<sharding-background>` in the ``from`` parameter of :pipeline:`$lookup` stages.
