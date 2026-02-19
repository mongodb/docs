Specifies whether to use the standard connection string format (``MongoDB``)
or the DNS seed list format (``MongoDBPlusSrv``). The available values for this
property are defined in the `ConnectionStringScheme <{+api-root+}/MongoDB.Driver/MongoDB.Driver.Core.Configuration.ConnectionStringScheme.html>`__
enum. The default value is ``ConnectionStringScheme.MongoDB``.
See :manual:`Connection Strings </reference/connection-string/>` in the {+mdb-server+}
manual for more information about connection string formats.

If the ``DirectConnection`` property is set to ``true`` and you
try to use the DNS seed list format, the {+driver-short+} will throw an
exception.