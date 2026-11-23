The hostname suffix that the driver validates SRV-discovered host names
against. Specify this option to override the suffix the driver infers
from the connection string's hostname. The default value is ``null``.

You can use this property only if the connection-string scheme is
set to ``ConnectionStringScheme.MongoDBPlusSrv``. You can't use it
when connecting to a replica set.

The driver rejects an empty value or a single-label value that
isn't a private or special-use namespace, such as ``local`` or
``internal``.
