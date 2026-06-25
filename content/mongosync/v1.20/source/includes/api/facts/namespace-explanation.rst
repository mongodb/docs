
If you configure a filter on a source cluster that has multiple
databases, ``mongosync`` only syncs the databases specified in
the filter definition. ``mongosync`` will not sync the other
existing databases.
       
If you want to modify the filter to add a newly created database,
you have to :ref:`restart the filtered sync <c2c-change-filter>`
from the beginning.

For more details, see :ref:`c2c-filtered-sync`.

For current limitations, see :ref:`c2c-filtering-limitations`.

